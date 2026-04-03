import pool from './db.js';

export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      -- Ajanslar (kullanıcılar)
      CREATE TABLE IF NOT EXISTS rm_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        company_name VARCHAR(255),
        logo_url TEXT,
        plan VARCHAR(20) DEFAULT 'starter',
        role VARCHAR(20) DEFAULT 'user',
        max_customers INT DEFAULT 5,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Müşteri firmalar
      CREATE TABLE IF NOT EXISTS rm_customers (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES rm_users(id) ON DELETE CASCADE,
        name VARCHAR(255) NOT NULL,
        domain VARCHAR(255),
        logo_url TEXT,
        contact_email VARCHAR(255),
        contact_phone VARCHAR(50),
        notes TEXT,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      -- Platform bağlantıları (Meta, Google Ads, Analytics)
      CREATE TABLE IF NOT EXISTS rm_connections (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES rm_customers(id) ON DELETE CASCADE,
        user_id INT REFERENCES rm_users(id) ON DELETE CASCADE,
        platform VARCHAR(50) NOT NULL,
        account_id VARCHAR(255),
        account_name VARCHAR(255),
        access_token TEXT,
        refresh_token TEXT,
        token_expires_at TIMESTAMP,
        status VARCHAR(20) DEFAULT 'active',
        last_synced_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Metrik verileri (çekilen veriler)
      CREATE TABLE IF NOT EXISTS rm_metrics (
        id SERIAL PRIMARY KEY,
        connection_id INT REFERENCES rm_connections(id) ON DELETE CASCADE,
        customer_id INT REFERENCES rm_customers(id) ON DELETE CASCADE,
        date DATE NOT NULL,
        impressions BIGINT DEFAULT 0,
        clicks BIGINT DEFAULT 0,
        spend DECIMAL(12,2) DEFAULT 0,
        conversions INT DEFAULT 0,
        revenue DECIMAL(12,2) DEFAULT 0,
        ctr DECIMAL(6,4) DEFAULT 0,
        cpc DECIMAL(8,2) DEFAULT 0,
        roas DECIMAL(8,2) DEFAULT 0,
        extra_data JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );

      -- Raporlar
      CREATE TABLE IF NOT EXISTS rm_reports (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES rm_customers(id) ON DELETE CASCADE,
        user_id INT REFERENCES rm_users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        period_start DATE NOT NULL,
        period_end DATE NOT NULL,
        status VARCHAR(20) DEFAULT 'draft',
        pdf_url TEXT,
        summary TEXT,
        data JSONB,
        created_at TIMESTAMP DEFAULT NOW(),
        sent_at TIMESTAMP
      );

      -- Index'ler
      CREATE INDEX IF NOT EXISTS idx_rm_customers_user ON rm_customers(user_id);
      CREATE INDEX IF NOT EXISTS idx_rm_connections_customer ON rm_connections(customer_id);
      CREATE INDEX IF NOT EXISTS idx_rm_metrics_connection ON rm_metrics(connection_id);
      CREATE INDEX IF NOT EXISTS idx_rm_metrics_customer_date ON rm_metrics(customer_id, date);
      CREATE INDEX IF NOT EXISTS idx_rm_reports_customer ON rm_reports(customer_id);
      CREATE INDEX IF NOT EXISTS idx_rm_reports_user ON rm_reports(user_id);
    `);
    console.log('Rapormatik database initialized');
  } finally {
    client.release();
  }
}
