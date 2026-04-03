import './globals.css';

export const metadata = {
  title: 'Rapormatik — Otomatik Dijital Pazarlama Raporlama',
  description: 'Meta Ads, Google Ads ve Analytics verilerini otomatik çekip profesyonel raporlar oluşturun. Ajanslar için tasarlandı.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
