import { NextResponse } from 'next/server';
import pool from '../../../lib/db.js';
import { getUserFromRequest } from '../../../lib/auth.js';
import { initDatabase } from '../../../lib/init-db.js';

let dbReady = false;
async function ensureDB() { if (!dbReady) { await initDatabase(); dbReady = true; } }

export async function GET(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const result = await pool.query(
    'SELECT * FROM rm_connections WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  );
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { customer_id, platform, account_id, account_name } = await request.json();
  if (!customer_id || !platform || !account_id) {
    return NextResponse.json({ error: 'Müşteri, platform ve hesap ID gerekli' }, { status: 400 });
  }

  // Müşterinin bu kullanıcıya ait olduğunu doğrula
  const check = await pool.query('SELECT id FROM rm_customers WHERE id = $1 AND user_id = $2', [customer_id, user.id]);
  if (!check.rows[0]) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 });

  const result = await pool.query(
    `INSERT INTO rm_connections (customer_id, user_id, platform, account_id, account_name)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [customer_id, user.id, platform, account_id, account_name || null]
  );
  return NextResponse.json(result.rows[0], { status: 201 });
}

export async function DELETE(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { id } = await request.json();
  await pool.query('DELETE FROM rm_connections WHERE id = $1 AND user_id = $2', [id, user.id]);
  return NextResponse.json({ ok: true });
}
