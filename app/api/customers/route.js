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
    'SELECT * FROM rm_customers WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  );
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { name, domain, contact_email, contact_phone, notes } = await request.json();
  if (!name) return NextResponse.json({ error: 'Firma adı gerekli' }, { status: 400 });

  const result = await pool.query(
    `INSERT INTO rm_customers (user_id, name, domain, contact_email, contact_phone, notes)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [user.id, name, domain || null, contact_email || null, contact_phone || null, notes || null]
  );
  return NextResponse.json(result.rows[0], { status: 201 });
}

export async function PATCH(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { id, name, domain, contact_email, contact_phone, notes, is_active } = await request.json();

  const result = await pool.query(
    `UPDATE rm_customers SET name = COALESCE($1, name), domain = $2, contact_email = $3,
     contact_phone = $4, notes = $5, is_active = COALESCE($6, is_active), updated_at = NOW()
     WHERE id = $7 AND user_id = $8 RETURNING *`,
    [name, domain, contact_email, contact_phone, notes, is_active, id, user.id]
  );
  if (!result.rows[0]) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  return NextResponse.json(result.rows[0]);
}

export async function DELETE(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { id } = await request.json();
  await pool.query('DELETE FROM rm_customers WHERE id = $1 AND user_id = $2', [id, user.id]);
  return NextResponse.json({ ok: true });
}
