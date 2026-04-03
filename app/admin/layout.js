'use client';
import { useState, useEffect } from 'react';

const menuItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/uyeler', label: 'Üyeler', icon: '👥' },
];

export default function AdminLayout({ children }) {
  const [user, setUser] = useState(null);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    fetch('/api/auth', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('rm_token')}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (!data || data.role !== 'admin') { window.location.href = '/giris'; return; }
        setUser(data);
      })
      .catch(() => window.location.href = '/giris');
  }, []);

  function handleLogout() {
    localStorage.removeItem('rm_token');
    window.location.href = '/giris';
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <aside style={{
        width: 240, minHeight: '100vh',
        background: 'var(--bg-secondary)', borderRight: '1px solid var(--border-color)',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50,
      }}>
        <div style={{
          height: 64, display: 'flex', alignItems: 'center', padding: '0 20px',
          borderBottom: '1px solid var(--border-color)', gap: 10,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #e17055, #fdcb6e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#fff',
          }}>R</div>
          <span style={{ fontSize: 16, fontWeight: 700 }}>Admin Panel</span>
        </div>

        <nav style={{ flex: 1, padding: '12px 8px' }}>
          {menuItems.map(item => {
            const isActive = currentPath === item.href;
            return (
              <a key={item.href} href={item.href} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                borderRadius: 'var(--radius-sm)', marginBottom: 2,
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'rgba(225,112,85,0.1)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--danger)' : '3px solid transparent',
                transition: 'all var(--transition-fast)',
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid var(--border-color)' }}>
          <a href="/panel" style={{
            display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
            fontSize: 13, color: 'var(--text-muted)', borderRadius: 'var(--radius-sm)',
          }}>← Panele Dön</a>
          {user && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', marginTop: 4,
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #e17055, #fdcb6e)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 700, color: '#fff',
              }}>{user.name?.[0]?.toUpperCase()}</div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{user.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Admin</div>
              </div>
              <button onClick={handleLogout} style={{
                background: 'none', border: 'none', color: 'var(--text-muted)',
                fontSize: 14, padding: 4, cursor: 'pointer',
              }}>⏻</button>
            </div>
          )}
        </div>
      </aside>

      <main style={{ flex: 1, marginLeft: 240, padding: 28, minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
