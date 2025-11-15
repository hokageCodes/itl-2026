import jwt from 'jsonwebtoken';

const TOKEN_SECRET = process.env.JWT_SECRET || 'please-change-this-secret-in-prod';
const EXPIRES_IN = '7d';

export function signToken(payload) {
  return jwt.sign(payload, TOKEN_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, TOKEN_SECRET);
  } catch (err) {
    return null;
  }
}
