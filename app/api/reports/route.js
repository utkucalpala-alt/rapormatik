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
    'SELECT * FROM rm_reports WHERE user_id = $1 ORDER BY created_at DESC',
    [user.id]
  );
  return NextResponse.json(result.rows);
}

export async function POST(request) {
  await ensureDB();
  const user = getUserFromRequest(request);
  if (!user) return NextResponse.json({ error: 'Yetkisiz' }, { status: 401 });

  const { customer_id, title, period_start, period_end } = await request.json();
  if (!customer_id || !title || !period_start || !period_end) {
    return NextResponse.json({ error: 'Tüm alanlar gerekli' }, { status: 400 });
  }

  // Müşterinin bu kullanıcıya ait olduğunu doğrula
  const check = await pool.query('SELECT id FROM rm_customers WHERE id = $1 AND user_id = $2', [customer_id, user.id]);
  if (!check.rows[0]) return NextResponse.json({ error: 'Müşteri bulunamadı' }, { status: 404 });

  // Bağlantı verilerini çek
  const connections = await pool.query(
    'SELECT * FROM rm_connections WHERE customer_id = $1 AND user_id = $2',
    [customer_id, user.id]
  );

  // Metrikleri topla
  const metrics = await pool.query(
    `SELECT connection_id, SUM(impressions) as impressions, SUM(clicks) as clicks,
     SUM(spend) as spend, SUM(conversions) as conversions, SUM(revenue) as revenue
     FROM rm_metrics WHERE customer_id = $1 AND date BETWEEN $2 AND $3
     GROUP BY connection_id`,
    [customer_id, period_start, period_end]
  );

  const reportData = {
    connections: connections.rows,
    metrics: metrics.rows,
    generated_at: new Date().toISOString(),
  };

  const result = await pool.query(
    `INSERT INTO rm_reports (customer_id, user_id, title, period_start, period_end, status, data)
     VALUES ($1, $2, $3, $4, $5, 'ready', $6) RETURNING *`,
    [customer_id, user.id, title, period_start, period_end, JSON.stringify(reportData)]
  );

  return NextResponse.json(result.rows[0], { status: 201 });
}
