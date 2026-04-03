'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('rm_token') : '';

  useEffect(() => {
    fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => { setStats(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    { label: 'Toplam Üye', value: stats?.total_users || 0, icon: '👥', color: 'var(--accent-secondary)' },
    { label: 'Toplam Müşteri', value: stats?.total_customers || 0, icon: '🏢', color: 'var(--info)' },
    { label: 'Aktif Bağlantı', value: stats?.total_connections || 0, icon: '🔗', color: 'var(--success)' },
    { label: 'Toplam Rapor', value: stats?.total_reports || 0, icon: '📄', color: 'var(--warning)' },
  ];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        {statCards.map((s, i) => (
          <div key={i} style={{
            background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)',
            padding: 24, transition: 'all var(--transition-normal)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,92,231,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: 0.3, textTransform: 'uppercase' }}>{s.label}</span>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>
              {loading ? '—' : s.value}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 1024px) { div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
