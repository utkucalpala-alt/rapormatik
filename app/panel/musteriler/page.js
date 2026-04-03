'use client';
import { useState, useEffect } from 'react';

export default function MusterilerPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', domain: '', contact_email: '', contact_phone: '', notes: '' });
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('rm_token') : '';

  useEffect(() => { loadCustomers(); }, []);

  async function loadCustomers() {
    try {
      const res = await fetch('/api/customers', { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) setCustomers(await res.json());
    } catch {}
    setLoading(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const method = editId ? 'PATCH' : 'POST';
    const body = editId ? { ...form, id: editId } : form;
    try {
      const res = await fetch('/api/customers', {
        method, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
      });
      if (res.ok) { await loadCustomers(); closeModal(); }
    } catch {}
    setSaving(false);
  }

  async function handleDelete(id) {
    if (!confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) return;
    await fetch('/api/customers', {
      method: 'DELETE', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id }),
    });
    await loadCustomers();
  }

  function openEdit(c) {
    setEditId(c.id);
    setForm({ name: c.name, domain: c.domain || '', contact_email: c.contact_email || '', contact_phone: c.contact_phone || '', notes: c.notes || '' });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditId(null);
    setForm({ name: '', domain: '', contact_email: '', contact_phone: '', notes: '' });
  }

  const inputStyle = {
    width: '100%', padding: '12px 16px', background: 'var(--bg-glass)',
    border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
    color: 'var(--text-primary)', fontSize: 14, outline: 'none', transition: 'var(--transition-fast)',
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Müşteriler</h1>
        <button onClick={() => setShowModal(true)} style={{
          padding: '8px 20px', borderRadius: 9999, fontSize: 13, fontWeight: 600,
          background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
          boxShadow: '0 4px 16px rgba(108,92,231,0.3)', transition: 'var(--transition-fast)',
        }}>+ Müşteri Ekle</button>
      </div>

      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[1,2,3].map(i => (
            <div key={i} style={{
              height: 160, borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(90deg, var(--bg-tertiary) 25%, var(--bg-secondary) 50%, var(--bg-tertiary) 75%)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
            }} />
          ))}
        </div>
      ) : customers.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '80px 24px',
          background: 'rgba(26,27,58,0.6)', border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>Henüz müşteri eklenmemiş</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 24 }}>
            İlk müşterinizi ekleyerek raporlamaya başlayın.
          </p>
          <button onClick={() => setShowModal(true)} style={{
            padding: '10px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 600,
            background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
          }}>+ Müşteri Ekle</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {customers.map(c => (
            <div key={c.id} style={{
              background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-lg)',
              padding: 24, transition: 'all var(--transition-normal)',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(108,92,231,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 800, color: '#fff',
                }}>{c.name[0]?.toUpperCase()}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{c.name}</div>
                  {c.domain && <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.domain}</div>}
                </div>
              </div>

              {c.contact_email && (
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  📧 {c.contact_email}
                </div>
              )}
              {c.contact_phone && (
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  📞 {c.contact_phone}
                </div>
              )}

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8, marginTop: 16,
                paddingTop: 16, borderTop: '1px solid var(--border-color)',
              }}>
                <span style={{
                  padding: '3px 8px', borderRadius: 9999, fontSize: 11, fontWeight: 600,
                  background: c.is_active ? 'rgba(0,184,148,0.15)' : 'rgba(225,112,85,0.15)',
                  color: c.is_active ? 'var(--success)' : 'var(--danger)',
                }}>{c.is_active ? 'Aktif' : 'Pasif'}</span>
                <div style={{ flex: 1 }} />
                <button onClick={() => openEdit(c)} style={{
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  fontSize: 13, cursor: 'pointer', padding: '4px 8px',
                }}>Düzenle</button>
                <button onClick={() => handleDelete(c.id)} style={{
                  background: 'none', border: 'none', color: 'var(--danger)',
                  fontSize: 13, cursor: 'pointer', padding: '4px 8px',
                }}>Sil</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
        }} onClick={closeModal}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: 480,
            background: 'var(--bg-secondary)', border: '1px solid rgba(108,92,231,0.2)',
            borderRadius: 'var(--radius-xl)', padding: 32,
            animation: 'fadeInUp 0.3s ease forwards',
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>
              {editId ? 'Müşteri Düzenle' : 'Yeni Müşteri'}
            </h2>
            <form onSubmit={handleSave}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Firma Adı *</label>
                <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  placeholder="Firma adı" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Web Sitesi</label>
                <input value={form.domain} onChange={e => setForm({...form, domain: e.target.value})}
                  placeholder="firma.com" style={inputStyle} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>E-posta</label>
                  <input type="email" value={form.contact_email} onChange={e => setForm({...form, contact_email: e.target.value})}
                    placeholder="iletisim@firma.com" style={inputStyle} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Telefon</label>
                  <input value={form.contact_phone} onChange={e => setForm({...form, contact_phone: e.target.value})}
                    placeholder="0532 xxx xx xx" style={inputStyle} />
                </div>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>Notlar</label>
                <textarea value={form.notes} onChange={e => setForm({...form, notes: e.target.value})}
                  placeholder="Ek bilgiler..." rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="button" onClick={closeModal} style={{
                  flex: 1, padding: '12px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 500,
                  background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)', cursor: 'pointer',
                }}>İptal</button>
                <button type="submit" disabled={saving} style={{
                  flex: 1, padding: '12px 24px', borderRadius: 9999, fontSize: 14, fontWeight: 600,
                  background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', border: 'none',
                  boxShadow: '0 4px 16px rgba(108,92,231,0.3)',
                }}>{saving ? 'Kaydediliyor...' : (editId ? 'Güncelle' : 'Kaydet')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) { div[style*="grid-template-columns: repeat(3"] { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 640px) { div[style*="grid-template-columns: repeat(2"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
