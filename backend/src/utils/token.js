import jwt from 'jsonwebtoken';

/** Create a seven-day JWT for the supplied user id. */
export const createToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
