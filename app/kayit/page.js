'use client';

export default function KayitPage() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', padding: 24, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -200, right: '30%', width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(108,92,231,0.2), transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -100, left: '20%', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,184,148,0.1), transparent 70%)',
        filter: 'blur(100px)', pointerEvents: 'none',
      }} />

      <div style={{ width: '100%', maxWidth: 420, position: 'relative', animation: 'fadeInUp 0.5s ease forwards' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, color: '#fff',
            }}>R</div>
            <span style={{ fontSize: 20, fontWeight: 700, color: '#fff' }}>Rapormatik</span>
          </a>
        </div>

        <div style={{
          background: 'rgba(26,27,58,0.6)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-xl)', padding: 36,
        }}>
          <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, textAlign: 'center' }}>Kayıt</h1>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 28 }}>
            Yönetici onayı gerekmektedir
          </p>

          <div style={{
            background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.2)',
            borderRadius: 'var(--radius-md)', padding: 24, marginBottom: 24, textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 12 }}>🔒</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#a29bfe', marginBottom: 8 }}>Yönetici İzni Gerekli</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Rapormatik hizmeti, Morfil Medya tarafından yönetilen bir platformdur.
              Hesap oluşturmak için lütfen bizimle iletişime geçin.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            <a href="tel:08503092049" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px',
              background: 'rgba(108,92,231,0.06)', border: '1px solid rgba(108,92,231,0.15)',
              borderRadius: 'var(--radius-md)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 500,
            }}>
              <span>📞</span> 0850 309 20 49
            </a>
            <a href="tel:05407275757" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px',
              background: 'rgba(108,92,231,0.06)', border: '1px solid rgba(108,92,231,0.15)',
              borderRadius: 'var(--radius-md)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 500,
            }}>
              <span>📱</span> 0540 727 57 57
            </a>
            <a href="mailto:morfilmedia@gmail.com?subject=Rapormatik%20Hizmet%20Talebi" style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '11px 16px',
              background: 'rgba(108,92,231,0.06)', border: '1px solid rgba(108,92,231,0.15)',
              borderRadius: 'var(--radius-md)', color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 500,
            }}>
              <span>✉️</span> morfilmedia@gmail.com
            </a>
          </div>

          <a href="/#iletisim" style={{
            display: 'block', width: '100%', padding: '13px 24px', border: 'none', borderRadius: 9999,
            background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)', color: '#fff', fontSize: 14, fontWeight: 600,
            boxShadow: '0 4px 16px rgba(108,92,231,0.3)', textAlign: 'center', textDecoration: 'none',
          }}>
            Hizmet Talep Formu
          </a>

          <p style={{ textAlign: 'center', marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>
            Zaten hesabınız var mı? <a href="/giris" style={{ color: 'var(--accent-secondary)', fontWeight: 500 }}>Giriş Yap</a>
          </p>
        </div>
      </div>
    </div>
  );
}
