import { NextResponse } from 'next/server';
import pool from '../../../../lib/db.js';
import { getAdminFromRequest } from '../../../../lib/auth.js';

export async function GET(request) {
  const admin = getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: 'Yetkisiz' }, { status: 403 });

  const [users, customers, connections, reports] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM rm_users'),
    pool.query('SELECT COUNT(*) FROM rm_customers'),
    pool.query('SELECT COUNT(*) FROM rm_connections'),
    pool.query('SELECT COUNT(*) FROM rm_reports'),
  ]);

  return NextResponse.json({
    total_users: parseInt(users.rows[0].count),
    total_customers: parseInt(customers.rows[0].count),
    total_connections: parseInt(connections.rows[0].count),
    total_reports: parseInt(reports.rows[0].count),
  });
}
