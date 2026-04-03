import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'rapormatik_super_secret_key_2026';

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}

export function getUserFromRequest(request) {
  // Cookie'den
  const cookie = request.cookies?.get('rm_token')?.value;
  if (cookie) {
    const decoded = verifyToken(cookie);
    if (decoded) return decoded;
  }
  // Bearer token'dan
  const auth = request.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) {
    return verifyToken(auth.slice(7));
  }
  return null;
}

export function getAdminFromRequest(request) {
  const user = getUserFromRequest(request);
  if (user && user.role === 'admin') return user;
  return null;
}
