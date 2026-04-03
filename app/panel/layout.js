'use client';
import { useState, useEffect } from 'react';

const menuItems = [
  { href: '/panel', label: 'Dashboard', icon: '📊' },
  { href: '/panel/musteriler', label: 'Müşteriler', icon: '👥' },
  { href: '/panel/baglantilar', label: 'Bağlantılar', icon: '🔗' },
  { href: '/panel/raporlar', label: 'Raporlar', icon: '📄' },
  { href: '/panel/ayarlar', label: 'Ayarlar', icon: '⚙️' },
];

export default function PanelLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    fetch('/api/auth', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('rm_token')}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data) { window.location.href = '/giris'; return; }
        setUser(data);
      })
      .catch(() => window.location.href = '/giris');
  }, []);

  function handleLogout() {
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'logout' }),
    });
    localStorage.removeItem('rm_token');
    window.location.href = '/giris';
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? 64 : 240, minHeight: '100vh',
        background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)',
        transition: 'width var(--transition-normal)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
      }}>
        {/* Logo */}
        <div style={{
          height: 64, display: 'flex', alignItems: 'center', padding: collapsed ? '0 16px' : '0 20px',
          borderBottom: '1px solid var(--border-color)', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#fff',
          }}>R</div>
          {!collapsed && <span style={{ fontSize: 16, fontWeight: 700 }}>Rapormatik</span>}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {menuItems.map((item) => {
            const isActive = currentPath === item.href;
            return (
              <a key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: collapsed ? '10px 16px' : '10px 14px',
                borderRadius: 'var(--radius-sm)', marginBottom: 2,
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(108,92,231,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                transition: 'all var(--transition-fast)',
              }}>
                <span style={{ fontSize: 18, flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={() => setCollapsed(!collapsed)} style={{
            width: '100%', padding: '8px 14px', borderRadius: 'var(--radius-sm)',
            background: 'transparent', border: 'none', color: 'var(--text-muted)',
            fontSize: 13, display: 'flex', alignItems: 'center', gap: 8,
            transition: 'var(--transition-fast)',
          }}>
            <span style={{ fontSize: 16 }}>{collapsed ? '→' : '←'}</span>
            {!collapsed && <span>Daralt</span>}
          </button>
          {user && (
            <div style={{
              padding: '10px 14px', marginTop: 4,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>{user.name?.[0]?.toUpperCase() || 'U'}</div>
              {!collapsed && (
                <div style={{ overflow: 'hidden', flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{user.plan}</div>
                </div>
              )}
              {!collapsed && (
                <button onClick={handleLogout} title="Çıkış" style={{
                  background: 'none', border: 'none', color: 'var(--text-muted)',
                  fontSize: 14, padding: 4, cursor: 'pointer',
                }}>⏻</button>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main style={{
        flex: 1, marginLeft: collapsed ? 64 : 240,
        transition: 'margin-left var(--transition-normal)',
        padding: 28, minHeight: '100vh',
      }}>
        {children}
      </main>
    </div>
  );
}
