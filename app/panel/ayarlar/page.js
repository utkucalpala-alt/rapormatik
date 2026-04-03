'use client';
import { useState, useEffect } from 'react';

export default function AyarlarPage() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ name: '', company_name: '', logo_url: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('rm_token') : '';

  useEffect(() => {
    fetch('/api/auth', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data) {
          setUser(data);
          setForm({ name: data.name || '', company_name: data.company_name || '', logo_url: data.logo_url || '' });
        }
      });
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    // API çağrısı yapılacak
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 3000); }, 800);
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: 'var(--bg-glass)',
    border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'var(--transition-fast)',
  };

  const planInfo = {
    starter: { name: 'Starter', max: 5, price: '₺499/ay' },
    pro: { name: 'Pro', max: 20, price: '₺999/ay' },
    agency: { name: 'Agency', max: 9999, price: '₺1.999/ay' },
  };

  const plan = planInfo[user?.plan] || planInfo.starter;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 28 }}>Ayarlar</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Profil */}
        <div style={{
          background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)', padding: 28,
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Profil Bilgileri</h2>
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Ad Soyad</label>
              <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Ajans Adı</label>
              <input value={form.company_name} onChange={e => setForm({...form, company_name: e.target.value})}
                style={inputStyle} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>E-posta</label>
              <input value={user?.email || ''} disabled
                style={{ ...inputStyle, opacity: 0.5 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Logo URL</label>
              <input value={form.logo_url} onChange={e => setForm({...form, logo_url: e.target.value})}
                placeholder="https://..." style={inputStyle} />
            </div>
            <button type="submit" disabled={saving} style={{
              padding: '10px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 600,
              background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
              boxShadow: '0 4px 16px rgba(108,92,231,0.3)',
            }}>{saving ? 'Kaydediliyor...' : 'Kaydet'}</button>
            {saved && (
              <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--success)', fontWeight: 500 }}>
                Kaydedildi!
              </span>
            )}
          </form>
        </div>

        {/* Plan Bilgisi */}
        <div style={{
          background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)', padding: 28,
          display: 'flex', flexDirection: 'column',
        }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 20 }}>Abonelik</h2>

          <div style={{
            background: 'linear-gradient(145deg, rgba(26,27,58,0.8), rgba(10,11,20,0.9))',
            border: '1px solid rgba(108,92,231,0.2)', borderRadius: 'var(--radius-lg)',
            padding: 24, marginBottom: 20, position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '10%', right: '10%', height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(108,92,231,0.8), transparent)',
            }} />
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 4 }}>Mevcut Plan</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--accent-secondary)', marginBottom: 4 }}>{plan.name}</div>
            <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>{plan.price}</div>
          </div>

          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>
            Müşteri Limiti: <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{plan.max === 9999 ? 'Sınırsız' : plan.max}</span>
          </div>

          <div style={{ flex: 1 }} />

          <button style={{
            padding: '10px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 500,
            background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
            color: 'var(--text-primary)', cursor: 'pointer', marginTop: 12,
          }}>Plan Yükselt</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
