'use client';
import { useState, useEffect } from 'react';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simüle edilmiş veriler — API bağlandıktan sonra gerçek verilerle değişecek
    setTimeout(() => {
      setStats({
        totalCustomers: 12,
        activeConnections: 8,
        reportsThisMonth: 5,
        totalSpend: 142500,
      });
      setLoading(false);
    }, 500);
  }, []);

  const statCards = [
    { label: 'Toplam Müşteri', value: stats?.totalCustomers || 0, icon: '👥', color: 'var(--accent-secondary)' },
    { label: 'Aktif Bağlantı', value: stats?.activeConnections || 0, icon: '🔗', color: 'var(--success)' },
    { label: 'Bu Ay Rapor', value: stats?.reportsThisMonth || 0, icon: '📄', color: 'var(--info)' },
    { label: 'Toplam Harcama', value: stats ? `₺${stats.totalSpend.toLocaleString('tr-TR')}` : '₺0', icon: '💰', color: 'var(--warning)' },
  ];

  const recentReports = [
    { customer: 'ABC Tekstil', period: 'Mart 2026', status: 'sent', date: '01.04.2026' },
    { customer: 'XYZ Mobilya', period: 'Mart 2026', status: 'ready', date: '01.04.2026' },
    { customer: 'Lezzet Cafe', period: 'Mart 2026', status: 'generating', date: '01.04.2026' },
    { customer: 'Spor Plus', period: 'Şubat 2026', status: 'sent', date: '01.03.2026' },
  ];

  const statusMap = {
    sent: { label: 'Gönderildi', bg: 'rgba(0,184,148,0.15)', color: 'var(--success)' },
    ready: { label: 'Hazır', bg: 'rgba(116,185,255,0.15)', color: 'var(--info)' },
    generating: { label: 'Oluşturuluyor', bg: 'rgba(253,203,110,0.15)', color: 'var(--warning)' },
    draft: { label: 'Taslak', bg: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' },
  };

  if (loading) {
    return (
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>Dashboard</h1>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: 120, borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
            }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Dashboard</h1>
        <a href="/panel/raporlar" style={{
          padding: '8px 20px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
          background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff',
          boxShadow: '0 4px 16px rgba(108,92,231,0.3)', transition: 'var(--transition-fast)',
          display: 'inline-block',
        }}>+ Yeni Rapor</a>
      </div>

      {/* Stat Cards */}
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
            <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Son Raporlar */}
      <div style={{
        background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)',
        padding: 24,
      }}>
        <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Son Raporlar</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recentReports.map((r, i) => {
            const st = statusMap[r.status];
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px', borderRadius: 'var(--radius-sm)',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.customer}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{r.period}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.date}</span>
                  <span style={{
                    padding: '4px 10px', borderRadius: 9999,
                    background: st.bg, color: st.color,
                    fontSize: 12, fontWeight: 600,
                  }}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="grid-template-columns: repeat(4"] { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
