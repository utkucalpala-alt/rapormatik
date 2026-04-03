'use client';
import { useState, useEffect } from 'react';

export default function AdminUyelerPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== 'undefined' ? localStorage.getItem('rm_token') : '';

  useEffect(() => {
    fetch('/api/admin/users', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : [])
      .then(data => { setUsers(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handlePlanChange(userId, newPlan) {
    await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id: userId, plan: newPlan }),
    });
    setUsers(users.map(u => u.id === userId ? { ...u, plan: newPlan } : u));
  }

  const planBadge = {
    starter: { bg: 'rgba(116,185,255,0.15)', color: 'var(--info)' },
    pro: { bg: 'rgba(108,92,231,0.15)', color: 'var(--accent-secondary)' },
    agency: { bg: 'rgba(0,184,148,0.15)', color: 'var(--success)' },
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>Üyeler</h1>

      <div style={{
        background: 'rgba(26,27,58,0.6)', border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)', overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr',
          gap: 16, padding: '14px 20px',
          background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)',
          fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5,
        }}>
          <span>Kullanıcı</span><span>Ajans</span><span>E-posta</span><span>Plan</span><span>Kayıt</span>
        </div>

        {loading ? (
          [1,2,3].map(i => (
            <div key={i} style={{
              height: 60, margin: '8px 20px',
              background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite', borderRadius: 'var(--radius-sm)',
            }} />
          ))
        ) : users.map((u, i) => {
          const pb = planBadge[u.plan] || planBadge.starter;
          return (
            <div key={u.id} style={{
              display: 'grid', gridTemplateColumns: '2fr 2fr 1.5fr 1fr 1fr',
              gap: 16, padding: '14px 20px', alignItems: 'center',
              borderBottom: i < users.length - 1 ? '1px solid var(--border-color)' : 'none',
              background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, fontWeight: 700, color: '#fff',
                }}>{u.name?.[0]?.toUpperCase()}</div>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</span>
              </div>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{u.company_name || '—'}</span>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{u.email}</span>
              <div>
                <select value={u.plan} onChange={e => handlePlanChange(u.id, e.target.value)} style={{
                  padding: '4px 8px', borderRadius: 9999, fontSize: 12, fontWeight: 600,
                  background: pb.bg, color: pb.color, border: 'none', cursor: 'pointer', outline: 'none',
                }}>
                  <option value="starter">Starter</option>
                  <option value="pro">Pro</option>
                  <option value="agency">Agency</option>
                </select>
              </div>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {new Date(u.created_at).toLocaleDateString('tr-TR')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
