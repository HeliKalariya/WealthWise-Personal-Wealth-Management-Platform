import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { createToken } from '../utils/token.js';

/** Create a new WealthWise account and return a login token. */
export const register = async (request, response, next) => {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password) return response.status(400).json({ success: false, message: 'Name, email and password are required.' });
    if (await User.findOne({ email })) return response.status(409).json({ success: false, message: 'An account with this email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    response.status(201).json({ success: true, token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
};

/** Check user credentials and return a login token when they are correct. */
export const login = async (request, response, next) => {
  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password || '', user.password))) return response.status(401).json({ success: false, message: 'Invalid email or password.' });
    response.json({ success: true, token: createToken(user._id), user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) { next(error); }
};
