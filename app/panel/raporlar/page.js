'use client';
import { useState, useEffect } from 'react';

export default function RaporlarPage() {
  const [reports, setReports] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ customer_id: '', title: '', period_start: '', period_end: '' });
  const [generating, setGenerating] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('rm_token') : '';

  useEffect(() => {
    Promise.all([
      fetch('/api/reports', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
      fetch('/api/customers', { headers: { Authorization: `Bearer ${token}` } }).then(r => r.ok ? r.json() : []),
    ]).then(([reps, custs]) => {
      setReports(reps);
      setCustomers(custs);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  async function handleGenerate(e) {
    e.preventDefault();
    setGenerating(true);
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const updated = await fetch('/api/reports', { headers: { Authorization: `Bearer ${token}` } });
        if (updated.ok) setReports(await updated.json());
        setShowModal(false);
        setForm({ customer_id: '', title: '', period_start: '', period_end: '' });
      }
    } catch {}
    setGenerating(false);
  }

  const statusMap = {
    draft: { label: 'Taslak', bg: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)' },
    generating: { label: 'Oluşturuluyor', bg: 'rgba(253,203,110,0.15)', color: 'var(--warning)' },
    ready: { label: 'Hazır', bg: 'rgba(116,185,255,0.15)', color: 'var(--info)' },
    sent: { label: 'Gönderildi', bg: 'rgba(0,184,148,0.15)', color: 'var(--success)' },
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: 'var(--bg-glass)',
    border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'var(--transition-fast)',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Raporlar</h1>
        <button onClick={() => setShowModal(true)} style={{
          padding: '8px 20px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
          background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
          boxShadow: '0 4px 16px rgba(108,92,231,0.3)',
        }}>+ Rapor Oluştur</button>
      </div>

      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              height: 72, borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
            }} />
          ))}
        </div>
      ) : reports.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          background: 'rgba(26,27,58,0.6)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Henüz rapor oluşturulmamış</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
            Müşterileriniz için ilk raporu oluşturun.
          </p>
          <button onClick={() => setShowModal(true)} style={{
            padding: '10px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 600,
            background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
          }}>+ Rapor Oluştur</button>
        </div>
      ) : (
        <div style={{
          background: 'rgba(26,27,58,0.6)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)', overflow: 'hidden',
        }}>
          {/* Tablo Header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 120px',
            gap: 16, padding: '14px 20px',
            background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border-color)',
            fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5,
          }}>
            <span>Rapor</span><span>Müşteri</span><span>Dönem</span><span>Durum</span><span></span>
          </div>
          {/* Satırlar */}
          {reports.map((r, i) => {
            const st = statusMap[r.status] || statusMap.draft;
            const customer = customers.find(c => c.id === r.customer_id);
            return (
              <div key={r.id} style={{
                display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 120px',
                gap: 16, padding: '16px 20px', alignItems: 'center',
                borderBottom: i < reports.length - 1 ? '1px solid var(--border-color)' : 'none',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent',
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                    {new Date(r.created_at).toLocaleDateString('tr-TR')}
                  </div>
                </div>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{customer?.name || '—'}</span>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                  {r.period_start && new Date(r.period_start).toLocaleDateString('tr-TR', { month: 'short', year: 'numeric' })}
                </span>
                <span style={{
                  display: 'inline-flex', padding: '4px 10px', borderRadius: 9999,
                  background: st.bg, color: st.color, fontSize: 12, fontWeight: 600, width: 'fit-content',
                }}>{st.label}</span>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  {r.pdf_url && (
                    <a href={r.pdf_url} target="_blank" style={{
                      padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500,
                      background: 'rgba(108,92,231,0.1)', color: 'var(--accent-secondary)',
                    }}>PDF</a>
                  )}
                  <button style={{
                    padding: '4px 10px', borderRadius: 9999, fontSize: 12, fontWeight: 500,
                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
                    color: 'var(--text-secondary)', cursor: 'pointer',
                  }}>Gönder</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
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
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Yeni Rapor Oluştur</h2>
            <form onSubmit={handleGenerate}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Müşteri *</label>
                <select required value={form.customer_id} onChange={e => setForm({...form, customer_id: e.target.value})}
                  style={inputStyle}>
                  <option value="">Müşteri seçin</option>
                  {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Rapor Başlığı *</label>
                <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})}
                  placeholder="Mart 2026 Performans Raporu" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Başlangıç *</label>
                  <input type="date" required value={form.period_start} onChange={e => setForm({...form, period_start: e.target.value})}
                    style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Bitiş *</label>
                  <input type="date" required value={form.period_end} onChange={e => setForm({...form, period_end: e.target.value})}
                    style={inputStyle} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={() => setShowModal(false)} style={{
                  flex: 1, padding: '12px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 500,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)', cursor: 'pointer',
                }}>İptal</button>
                <button type="submit" disabled={generating} style={{
                  flex: 1, padding: '12px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 600,
                  background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
                }}>{generating ? 'Oluşturuluyor...' : 'Rapor Oluştur'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
