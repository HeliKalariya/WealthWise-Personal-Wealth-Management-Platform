import bcrypt from 'bcryptjs';
import User from '../models/User.js';

/** Return the logged-in user's profile without the private password field. */
export const getProfile = async (request, response) => {
  response.json({ success: true, user: request.user });
};

/** Update allowed profile fields for the logged-in user. */
export const updateProfile = async (request, response, next) => {
  try {
    const { name, email, phone, location } = request.body;
    const user = await User.findByIdAndUpdate(request.user._id, { name, email, phone, location }, { new: true, runValidators: true }).select('-password');
    response.json({ success: true, user });
  } catch (error) { next(error); }
};

/** Change a user's password after checking their current password. */
export const changePassword = async (request, response, next) => {
  try {
    const { currentPassword, newPassword } = request.body;
    const user = await User.findById(request.user._id);
    if (!(await bcrypt.compare(currentPassword || '', user.password))) return response.status(401).json({ success: false, message: 'Current password is incorrect.' });
    if (!newPassword || newPassword.length < 6) return response.status(400).json({ success: false, message: 'New password must have at least 6 characters.' });
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    response.json({ success: true, message: 'Password changed successfully.' });
  } catch (error) { next(error); }
};
