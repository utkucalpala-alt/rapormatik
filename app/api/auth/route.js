import { NextResponse } from 'next/server';
import pool from '../../../lib/db.js';
import { signToken, getUserFromRequest } from '../../../lib/auth.js';
import { initDatabase } from '../../../lib/init-db.js';
import bcrypt from 'bcrypt';

let dbInitialized = false;

async function ensureDB() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

// GET — mevcut kullanıcı bilgisi
export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const result = await pool.query(
    'SELECT id, email, name, company_name, logo_url, plan, role, max_customers, created_at FROM rm_users WHERE id = $1',
    [user.id]
  );
  if (!result.rows[0]) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 404 });

  return NextResponse.json(result.rows[0]);
}

// POST — giriş veya kayıt
export async function POST(request) {
  await ensureDB();

  const body = await request.json();
  const { action } = body;

  if (action === 'register') {
    const { name, company_name, email, password } = body;
    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Ad, e-posta ve şifre gerekli' }, { status: 400 });
    }

    const existing = await pool.query('SELECT id FROM rm_users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: 'Bu e-posta zaten kayıtlı' }, { status: 409 });
    }

    const hash = await bcrypt.hash(password, 10);
    const isAdmin = email === 'morfilmedia@gmail.com';

    const result = await pool.query(
      `INSERT INTO rm_users (email, password_hash, name, company_name, plan, role, max_customers)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, email, name, role`,
      [email, hash, name, company_name || null, isAdmin ? 'agency' : 'starter', isAdmin ? 'admin' : 'user', isAdmin ? 9999 : 5]
    );

    const user = result.rows[0];
    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({ ...user, token });
    response.cookies.set('rm_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
    });
    return response;
  }

  if (action === 'login') {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json({ error: 'E-posta ve şifre gerekli' }, { status: 400 });
    }

    const result = await pool.query('SELECT * FROM rm_users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return NextResponse.json({ error: 'Kullanıcı bulunamadı' }, { status: 401 });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return NextResponse.json({ error: 'Şifre hatalı' }, { status: 401 });

    const token = signToken({ id: user.id, email: user.email, role: user.role });

    const response = NextResponse.json({
      id: user.id, email: user.email, name: user.name, role: user.role, token,
    });
    response.cookies.set('rm_token', token, {
      httpOnly: true, secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', maxAge: 60 * 60 * 24 * 7, path: '/',
    });
    return response;
  }

  // Logout
  if (action === 'logout') {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete('rm_token');
    return response;
  }

  return NextResponse.json({ error: 'Geçersiz işlem' }, { status: 400 });
}
