'use client';
import { useState, useEffect } from 'react';

const platforms = [
  { id: 'meta_ads', name: 'Meta Ads', icon: '📘', color: '#1877f2', desc: 'Facebook & Instagram reklamları' },
  { id: 'google_ads', name: 'Google Ads', icon: '🔍', color: '#4285f4', desc: 'Google arama ve display reklamları' },
  { id: 'google_analytics', name: 'Google Analytics', icon: '📈', color: '#e37400', desc: 'Web sitesi trafik verileri' },
  { id: 'tiktok_ads', name: 'TikTok Ads', icon: '🎵', color: '#ff0050', desc: 'TikTok reklam kampanyaları' },
];

export default function BaglantilarPage() {
  const [connections, setConnections] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [form, setForm] = useState({ customer_id: '', account_id: '', account_name: '' });
  const [saving, setSaving] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('rm_token') : '';

  useEffect(() => {
    Promise.all([
      fetch('/api/connections', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
      fetch('/api/customers', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
    ]).then(([conns, custs]) => {
      setConnections(conns);
      setCustomers(custs);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  function openConnect(platform) {
    setSelectedPlatform(platform);
    setForm({ customer_id: '', account_id: '', account_name: '' });
    setShowModal(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/connections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, platform: selectedPlatform.id }),
      });
      if (res.ok) {
        const updated = await fetch('/api/connections', { headers: { Authorization: `Bearer ${token}` } });
        if (updated.ok) setConnections(await updated.json());
        setShowModal(false);
      }
    } catch {}
    setSaving(false);
  }

  async function handleDisconnect(id) {
    if (!confirm('Bağlantıyı kaldırmak istediğinize emin misiniz?')) return;
    await fetch('/api/connections', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    setConnections(connections.filter(c => c.id !== id));
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: 'var(--bg-glass)',
    border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'var(--transition-fast)',
  };

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Platform Bağlantıları</h1>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 28 }}>
        Reklam platformlarını müşterilerinize bağlayarak otomatik veri çekmeyi etkinleştirin.
      </p>

      {/* Platform Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
        {platforms.map(p => {
          const conns = connections.filter(c => c.platform === p.id);
          return (
            <div key={p.id} style={{
              background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)',
              padding: 24, transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,92,231,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: 28 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.desc}</div>
                  </div>
                </div>
                <span style={{
                  padding: '3px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600,
                  background: conns.length > 0 ? 'rgba(0,184,148,0.15)' : 'rgba(255,255,255,0.06)',
                  color: conns.length > 0 ? 'var(--success)' : 'var(--text-muted)',
                }}>{conns.length} bağlantı</span>
              </div>

              {conns.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  {conns.map(c => (
                    <div key={c.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255,255,255,0.02)', marginBottom: 4,
                    }}>
                      <div>
                        <span style={{ fontSize: 13, fontWeight: 500 }}>{c.account_name || c.account_id}</span>
                        <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 8 }}>
                          → {customers.find(cu => cu.id === c.customer_id)?.name || ''}
                        </span>
                      </div>
                      <button onClick={() => handleDisconnect(c.id)} style={{
                        background: 'none', border: 'none', color: 'var(--danger)',
                        fontSize: 12, cursor: 'pointer',
                      }}>Kaldır</button>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={() => openConnect(p)} style={{
                width: '100%', padding: '8px 16px', borderRadius: 9999, fontSize: 13, fontWeight: 500,
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
                color: 'var(--text-primary)', transition: 'var(--transition-fast)',
              }}>+ Bağlantı Ekle</button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showModal && selectedPlatform && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }} onClick={() => setShowModal(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: 440,
            background: 'var(--bg-secondary)', border: '1px solid rgba(108,92,231,0.2)',
            borderRadius: 'var(--radius-xl)', padding: 32,
            animation: 'fadeInUp 0.3s ease forwards',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontSize: 28 }}>{selectedPlatform.icon}</span>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>{selectedPlatform.name} Bağla</h2>
            </div>
            <form onSubmit={handleSave}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Müşteri *</label>
                <select required value={form.customer_id} onChange={e => setForm({...form, customer_id: e.target.value})}
                  style={inputStyle}>
                  <option value="">Müşteri seçin</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Hesap ID *</label>
                <input required value={form.account_id} onChange={e => setForm({...form, account_id: e.target.value})}
                  placeholder="act_123456789" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Hesap Adı</label>
                <input value={form.account_name} onChange={e => setForm({...form, account_name: e.target.value})}
                  placeholder="Firma - Ana Hesap" style={inputStyle} />
              </div>

              <div style={{
                padding: '12px 16px', borderRadius: 'var(--radius-md)', marginBottom: 20,
                background: 'rgba(116,185,255,0.1)', border: '1px solid rgba(116,185,255,0.15)',
              }}>
                <p style={{ fontSize: 13, color: 'var(--info)', lineHeight: 1.6 }}>
                  OAuth entegrasyonu yakında aktif olacak. Şimdilik hesap bilgilerini manuel girebilirsiniz.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{
                  flex: 1, padding: '12px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 500,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)', cursor: 'pointer',
                }}>İptal</button>
                <button type="submit" disabled={saving} style={{
                  flex: 1, padding: '12px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 600,
                  background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
                }}>{saving ? 'Kaydediliyor...' : 'Bağla'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
