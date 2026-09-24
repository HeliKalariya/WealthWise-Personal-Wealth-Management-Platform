import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import { createToken } from '../utils/token.js';
import { sendPasswordResetEmail } from '../config/mailer.js';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Return a clear validation error for basic account form fields. */
const validateAccount = (name, email, password, needsName) => {
  if (needsName && (!name || name.trim().length < 2)) return 'Name must contain at least 2 characters.';
  if (!email || !emailPattern.test(email.trim())) return 'Enter a valid email address.';
  if (!password || password.length < 6) return 'Password must contain at least 6 characters.';
  return null;
};

/** Create a new WealthWise account and return a login token. */
export const register = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;
    const validationError = validateAccount(name, email, password, true);
    if (validationError) return response.status(400).json({ success: false, message: validationError });
    const cleanEmail = email.trim().toLowerCase();
    if (await User.findOne({ email: cleanEmail })) return response.status(409).json({ success: false, message: 'An account with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name: name.trim(), email: cleanEmail, password: hashedPassword });
    response.status(201).json({ success: true, token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
};

/** Check user credentials and return a login token when they are correct. */
export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const validationError = validateAccount('', email, password, false);
    if (validationError) return response.status(400).json({ success: false, message: validationError });
    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return response.status(401).json({ success: false, message: 'Invalid email or password.' });
    response.json({ success: true, token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
};

/** Create a short-lived password-reset token for a registered email address. */
export const forgotPassword = async (request, response, next) => {
  try {
    const email = request.body.email?.trim().toLowerCase();
    if (!email || !emailPattern.test(email)) return response.status(400).json({ success: false, message: 'Enter a valid email address.' });
    const user = await User.findOne({ email });
    // Keep the response generic so an attacker cannot discover registered emails.
    if (!user) return response.json({ success: true, message: 'If this email is registered, a reset link has been created.' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000);
    await user.save();

    // Send a genuine email link that opens the frontend reset-password route.
    const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').trim().replace(/\/$/, '');
    await sendPasswordResetEmail({ to: user.email, name: user.name, resetUrl: `${clientUrl}/reset-password?token=${resetToken}` });
    response.json({ success: true, message: 'If this email is registered, a password-reset link has been sent. It expires in 15 minutes.' });
  } catch (error) { next(error); }
};

/** Validate a reset token and replace the user's password with a new hashed password. */
export const resetPassword = async (request, response, next) => {
  try {
    const { token, password } = request.body;
    if (!token || !password || password.length < 6) return response.status(400).json({ success: false, message: 'A valid token and a password of at least 6 characters are required.' });
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({ resetPasswordToken: tokenHash, resetPasswordExpires: { $gt: new Date() } });
    if (!user) return response.status(400).json({ success: false, message: 'This reset link is invalid or has expired.' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    response.json({ success: true, message: 'Password reset successfully. You can now log in.' });
  } catch (error) { next(error); }
};
