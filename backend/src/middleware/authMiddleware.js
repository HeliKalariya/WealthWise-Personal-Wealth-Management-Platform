import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/** Verify the JWT and attach the logged-in user to the request. */
export const protect = async (request, response, next) => {
  try {
    const authorization = request.headers.authorization || '';
    const token = authorization.startsWith('Bearer ') ? authorization.split(' ')[1] : null;

    if (!token) return response.status(401).json({ success: false, message: 'Login token is required.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = await User.findById(decoded.userId).select('-password');

    if (!request.user) return response.status(401).json({ success: false, message: 'User no longer exists.' });
    next();
  } catch (error) {
    response.status(401).json({ success: false, message: 'Invalid or expired login token.' });
  }
};
