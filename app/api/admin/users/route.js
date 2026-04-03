import { NextResponse } from 'next/server';
import pool from '../../../../lib/db.js';
import { getAdminFromRequest } from '../../../../lib/auth.js';

export async function GET(request) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });

  const result = await pool.query(
    `SELECT id, email, name, company_name, plan, role, max_customers, created_at
     FROM rm_users ORDER BY created_at DESC`
  );
  return NextResponse.json(result.rows);
}

export async function PATCH(request) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });

  const { id, plan, max_customers } = await request.json();

  const maxMap = { starter: 5, pro: 20, agency: 9999 };

  const result = await pool.query(
    `UPDATE rm_users SET plan = COALESCE($1, plan), max_customers = COALESCE($2, max_customers),
     updated_at = NOW() WHERE id = $3 RETURNING id, email, name, plan`,
    [plan, max_customers || maxMap[plan], id]
  );
  if (!result.rows[0]) return NextResponse.json({ error: 'Bulunamadı' }, { status: 404 });
  return NextResponse.json(result.rows[0]);
}
