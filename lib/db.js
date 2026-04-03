import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST || 'post.webtasarimi.net',
  port: parseInt(process.env.DB_PORT || '5435'),
  database: process.env.DB_NAME || 'rapormatik',
  user: process.env.DB_USER || 'webtasarimi_db_admin',
  password: process.env.DB_PASSWORD || '8858lpU5i7Yr6pEx2oprmdQ95G1G',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export default pool;
