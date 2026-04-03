'use client';
import { useState } from 'react';

export default function GirisPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Giriş başarısız'); setLoading(false); return; }
      localStorage.setItem('rm_token', data.token);
      window.location.href = data.role === 'admin' ? '/admin' : '/panel';
    } catch { setError('Bağlantı hatası'); setLoading(false); }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      {/* Orbs */}
      <div style={{
        position: 'absolute', top: -200, left: '30%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,92,231,0.2), transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, right: '20%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,67,147,0.1), transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%', maxWidth: 420, position: 'relative',
        animation: 'fadeInUp 0.5s ease forwards',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
            }}>R</div>
            <span style={{ fontSize: 20, fontWeight: 700 }}>Rapormatik</span>
          </a>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: 36,
        }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>Giriş Yap</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 28 }}>
            Hesabınıza giriş yapın
          </p>

          {error && (
            <div style={{
              padding: '10px 14px', borderRadius: 'var(--radius-sm)', marginBottom: 16,
              background: 'rgba(225,112,85,0.15)', color: 'var(--danger)',
              fontSize: 13, fontWeight: 500,
            }}>{error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: 0.3, marginBottom: 6 }}>E-posta</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="ajans@email.com"
                style={{
                  width: '100%', padding: '12px 16px', background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)', fontSize: 14, outline: 'none',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: 0.3, marginBottom: 6 }}>Şifre</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 16px', background: 'var(--bg-glass)',
                  border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)', fontSize: 14, outline: 'none',
                  transition: 'var(--transition-fast)',
                }}
                onFocus={e => { e.target.style.borderColor = 'var(--accent-primary)'; e.target.style.boxShadow = '0 0 0 3px var(--accent-glow)'; }}
                onBlur={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; }}
              />
            </div>
            <button type="submit" disabled={loading} style={{
              width: '100%', padding: '13px 24px', border: 'none', borderRadius: 9999,
              background: loading ? 'var(--bg-tertiary)' : 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
              color: '#fff', fontSize: 14, fontWeight: 600,
              boxShadow: loading ? 'none' : '0 4px 16px rgba(108,92,231,0.3)',
              transition: 'var(--transition-fast)',
            }}>{loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}</button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
            Hesabınız yok mu? <a href="/kayit" style={{ color: 'var(--accent-secondary)', fontWeight: 500 }}>Ücretsiz Kaydol</a>
          </p>
        </div>
      </div>
    </div>
  );
}
