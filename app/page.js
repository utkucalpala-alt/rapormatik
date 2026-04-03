'use client';
import { useState, useEffect, useRef } from 'react';

export default function RapormatikLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [demoProgress, setDemoProgress] = useState(0);
  const [counters, setCounters] = useState({ campaigns: 0, spend: 0, roas: 0, cpa: 0, ctr: 0 });
  const [barHeights, setBarHeights] = useState([0, 0, 0, 0, 0, 0]);
  const [pieAngle, setPieAngle] = useState(0);
  const [demoVisible, setDemoVisible] = useState(false);
  const demoRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    // Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,500;1,600&family=Jost:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Scroll
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);

    // Resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    // Intersection Observer for demo section
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDemoVisible(true); },
      { threshold: 0.1 }
    );
    if (demoRef.current) observer.observe(demoRef.current);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (demoRef.current) observer.unobserve(demoRef.current);
    };
  }, []);

  // Animate counters when demo visible
  useEffect(() => {
    if (!demoVisible) return;
    const targets = { campaigns: 24, spend: 187450, roas: 4.2, cpa: 18.7, ctr: 3.8 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        campaigns: Math.round(targets.campaigns * ease),
        spend: Math.round(targets.spend * ease),
        roas: parseFloat((targets.roas * ease).toFixed(1)),
        cpa: parseFloat((targets.cpa * ease).toFixed(1)),
        ctr: parseFloat((targets.ctr * ease).toFixed(1)),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    // Bar chart animation
    const barTargets = [75, 45, 90, 60, 85, 55];
    setTimeout(() => setBarHeights(barTargets), 300);

    // Pie chart
    let pieStep = 0;
    const pieInterval = setInterval(() => {
      pieStep += 5;
      setPieAngle(Math.min(pieStep, 270));
      if (pieStep >= 270) clearInterval(pieInterval);
    }, 30);

    // Demo steps auto-play
    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep <= 4) {
        setDemoStep(currentStep);
        setDemoProgress(0);
        if (currentStep === 2) {
          let prog = 0;
          const progInterval = setInterval(() => {
            prog += 2;
            setDemoProgress(Math.min(prog, 100));
            if (prog >= 100) clearInterval(progInterval);
          }, 30);
        }
      } else {
        clearInterval(stepInterval);
      }
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(pieInterval);
      clearInterval(stepInterval);
    };
  }, [demoVisible]);

  const serif = "'Cormorant Garamond', Georgia, serif";
  const sans = "'Jost', sans-serif";

  // Emerald + Gold palette - canlı ve kontrastlı
  const E = '#34D399';       // emerald primary
  const ED = '#059669';      // emerald dark
  const EL = '#6EE7B7';      // emerald light
  const EP = '#A7F3D0';      // emerald pale
  const GOLD = '#D4A853';    // gold accent
  const GOLDL = '#E8C874';   // gold light
  const GOLDD = '#B8943F';   // gold dark
  const BG = '#0a0a0f';
  const CREAM = '#F5EDE0';   // warm cream for headings
  const BODY = '#C8BFB6';    // warm body text
  const EB = (a) => `rgba(52,211,153,${a})`;
  const GB = (a) => `rgba(212,168,83,${a})`;

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth < 1024;

  const inputStyle = {
    width: '100%', padding: '14px 16px', background: 'rgba(17,17,28,0.8)',
    border: `1px solid ${EB(0.15)}`, color: CREAM, fontFamily: sans, fontSize: 15, fontWeight: 400,
    outline: 'none', transition: 'border-color 0.3s, box-shadow 0.3s', boxSizing: 'border-box',
    borderRadius: 6,
  };
  const focusHandler = (e) => { e.target.style.borderColor = EB(0.5); e.target.style.boxShadow = `0 0 0 3px ${EB(0.1)}`; };
  const blurHandler = (e) => { e.target.style.borderColor = EB(0.15); e.target.style.boxShadow = 'none'; };

  // Oriental dekoratif bölücü
  const OrnamentalDivider = ({ size = 'normal' }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, margin: size === 'large' ? '48px 0' : '32px 0' }}>
      <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, transparent, ${GB(0.5)})` }} />
      <div style={{ width: 8, height: 8, border: `1px solid ${GOLD}`, transform: 'rotate(45deg)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 2, background: GOLD, transform: 'rotate(0deg)' }} />
      </div>
      <div style={{ width: 4, height: 4, background: E, borderRadius: '50%' }} />
      <div style={{ width: 8, height: 8, border: `1px solid ${GOLD}`, transform: 'rotate(45deg)', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 2, background: GOLD, transform: 'rotate(0deg)' }} />
      </div>
      <div style={{ width: 60, height: 1, background: `linear-gradient(90deg, ${GB(0.5)}, transparent)` }} />
    </div>
  );

  // Köşe süsleri
  const CornerFlourish = ({ position }) => {
    const styles = {
      position: 'absolute', width: 24, height: 24, pointerEvents: 'none',
    };
    const lineColor = GB(0.4);
    if (position === 'tl') return <div style={{ ...styles, top: -1, left: -1, borderTop: `2px solid ${lineColor}`, borderLeft: `2px solid ${lineColor}` }} />;
    if (position === 'tr') return <div style={{ ...styles, top: -1, right: -1, borderTop: `2px solid ${lineColor}`, borderRight: `2px solid ${lineColor}` }} />;
    if (position === 'bl') return <div style={{ ...styles, bottom: -1, left: -1, borderBottom: `2px solid ${lineColor}`, borderLeft: `2px solid ${lineColor}` }} />;
    if (position === 'br') return <div style={{ ...styles, bottom: -1, right: -1, borderBottom: `2px solid ${lineColor}`, borderRight: `2px solid ${lineColor}` }} />;
  };

  const sectionHeading = (tag, title, titleAccent, subtitle) => (
    <div style={{ textAlign: 'center', marginBottom: 56 }}>
      <div style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 14 }}>{tag}</div>
      <h2 style={{ fontFamily: serif, fontSize: isMobile ? 32 : 46, fontWeight: 600, color: CREAM, marginBottom: 16, letterSpacing: 0.5, lineHeight: 1.2 }}>
        {title}{' '}{titleAccent && <em style={{ fontStyle: 'italic', color: EL }}>{titleAccent}</em>}
      </h2>
      {subtitle && <p style={{ fontFamily: sans, fontSize: 16, color: BODY, maxWidth: 520, margin: '0 auto', fontWeight: 400, lineHeight: 1.7 }}>{subtitle}</p>}
      <OrnamentalDivider />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: BG, overflow: 'hidden', color: CREAM }}>

      {/* ==================== NAVBAR ==================== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? 'rgba(10,10,15,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${GB(0.15)}` : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 76,
        }}>
          <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: serif, fontSize: 26, fontWeight: 700, color: CREAM, letterSpacing: 2 }}>
              RAPOR<span style={{ color: E }}>MATiK</span>
            </span>
            <span style={{ fontFamily: sans, fontSize: 10, color: GOLD, letterSpacing: 1.5, fontWeight: 500 }}>by Morfil Medya</span>
          </a>

          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {[
                { label: 'Demo', href: '#demo' },
                { label: 'Ozellikler', href: '#ozellikler' },
                { label: 'SSS', href: '#sss' },
                { label: 'Iletisim', href: '#iletisim' },
              ].map((link, i) => (
                <a key={i} href={link.href} style={{
                  padding: '8px 18px', fontSize: 14, fontWeight: 500, color: BODY,
                  fontFamily: sans, textDecoration: 'none', transition: 'color 0.3s',
                }}
                onMouseEnter={e => e.target.style.color = CREAM}
                onMouseLeave={e => e.target.style.color = BODY}
                >{link.label}</a>
              ))}
              <a href="#iletisim" style={{
                padding: '10px 28px', fontSize: 14, fontWeight: 600, color: BG,
                background: `linear-gradient(135deg, ${E}, ${ED})`, borderRadius: 6,
                fontFamily: sans, letterSpacing: 0.5, transition: 'all 0.3s ease',
                marginLeft: 12, textDecoration: 'none',
                boxShadow: `0 4px 16px ${EB(0.25)}`,
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = `0 6px 24px ${EB(0.35)}`; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = `0 4px 16px ${EB(0.25)}`; }}
              >Bilgi Al</a>
            </div>
          )}

          {isMobile && (
            <button onClick={() => setMobileMenu(!mobileMenu)} style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 8,
              display: 'flex', flexDirection: 'column', gap: 5,
            }}>
              <span style={{ width: 24, height: 2, background: GOLD, transition: 'all 0.3s', transform: mobileMenu ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ width: 24, height: 2, background: GOLD, transition: 'all 0.3s', opacity: mobileMenu ? 0 : 1 }} />
              <span style={{ width: 24, height: 2, background: GOLD, transition: 'all 0.3s', transform: mobileMenu ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          )}
        </div>

        {isMobile && mobileMenu && (
          <div style={{
            background: 'rgba(10,10,15,0.98)', borderTop: `1px solid ${GB(0.15)}`,
            padding: '16px 32px', display: 'flex', flexDirection: 'column', gap: 12,
          }}>
            {['Demo|#demo', 'Ozellikler|#ozellikler', 'SSS|#sss', 'Iletisim|#iletisim'].map((item, i) => {
              const [label, href] = item.split('|');
              return <a key={i} href={href} onClick={() => setMobileMenu(false)} style={{ fontFamily: sans, fontSize: 16, fontWeight: 500, color: BODY, padding: '8px 0', textDecoration: 'none' }}>{label}</a>;
            })}
            <a href="#iletisim" onClick={() => setMobileMenu(false)} style={{
              padding: '12px 24px', fontSize: 14, fontWeight: 600, color: BG,
              background: E, borderRadius: 6, fontFamily: sans, textAlign: 'center', textDecoration: 'none', marginTop: 4,
            }}>Bilgi Al</a>
          </div>
        )}
      </nav>

      {/* ==================== HERO + FORM ==================== */}
      <section style={{ position: 'relative', paddingTop: isMobile ? 120 : 140, paddingBottom: isMobile ? 60 : 100 }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', top: -100, left: '25%', width: 700, height: 700, borderRadius: '50%', background: `radial-gradient(circle, ${EB(0.08)}, transparent 65%)`, filter: 'blur(100px)', pointerEvents: 'none', animation: 'floatSlow 15s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', top: 150, right: '5%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${GB(0.06)}, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none', animation: 'floatSlow 15s ease-in-out infinite 5s' }} />
        <div style={{ position: 'absolute', bottom: -100, left: '60%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${EB(0.05)}, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none', animation: 'floatSlow 15s ease-in-out infinite 10s' }} />

        {/* Oriental mandala pattern - background decoration */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 800, height: 800, borderRadius: '50%',
          border: `1px solid ${GB(0.04)}`, pointerEvents: 'none',
          animation: 'rotateSlow 60s linear infinite',
        }}>
          <div style={{ position: 'absolute', inset: 60, borderRadius: '50%', border: `1px solid ${GB(0.03)}` }} />
          <div style={{ position: 'absolute', inset: 120, borderRadius: '50%', border: `1px solid ${GB(0.02)}` }} />
          <div style={{ position: 'absolute', inset: 180, borderRadius: '50%', border: `1px solid ${GB(0.015)}` }} />
        </div>

        <div style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 32px',
          display: 'flex', flexDirection: isTablet ? 'column' : 'row',
          gap: isTablet ? 48 : 64, alignItems: isTablet ? 'center' : 'center', position: 'relative',
        }}>
          {/* LEFT - Hero Content */}
          <div style={{ flex: 1, maxWidth: isTablet ? '100%' : 600, animation: 'fadeInUp 0.8s ease forwards' }}>
            {/* Decorative line + tag */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
              <div style={{ width: 50, height: 2, background: `linear-gradient(90deg, ${GOLD}, ${GB(0.3)})` }} />
              <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: GOLD, letterSpacing: 3, textTransform: 'uppercase' }}>Dijital Ajanslar Icin</span>
              <div style={{ width: 6, height: 6, background: GOLD, transform: 'rotate(45deg)' }} />
            </div>

            <h1 style={{
              fontFamily: serif, fontSize: isMobile ? 34 : isTablet ? 44 : 56, fontWeight: 700,
              lineHeight: 1.1, letterSpacing: 0.5, marginBottom: 28, color: CREAM,
            }}>
              Musteri Raporlarinizi{' '}
              <br />
              <span style={{
                background: `linear-gradient(120deg, ${EL} 0%, ${E} 40%, ${GOLDL} 100%)`,
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                fontStyle: 'italic', animation: 'gradientFlow 4s linear infinite',
              }}>Otomatik Olusturun</span>
            </h1>

            <p style={{
              fontFamily: sans, fontSize: 18, color: BODY, lineHeight: 1.8,
              fontWeight: 400, marginBottom: 44, maxWidth: 500,
            }}>
              Meta Ads, Google Ads ve Analytics verilerini otomatik cekin.
              Profesyonel white-label PDF raporlari saniyeler icinde hazirlayip
              musterilerinize gonderin.
            </p>

            {/* Stats */}
            <div style={{ display: 'flex', gap: isMobile ? 28 : 56, flexWrap: 'wrap' }}>
              {[
                { val: '%94', label: 'Zaman Tasarrufu' },
                { val: '500+', label: 'Rapor Olusturuldu' },
                { val: '50+', label: 'Ajans Kullaniyor' },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'left', position: 'relative' }}>
                  <div style={{ fontFamily: serif, fontSize: isMobile ? 32 : 40, fontWeight: 700, color: E, textShadow: `0 0 30px ${EB(0.3)}` }}>{s.val}</div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginTop: 4, letterSpacing: 1.5, textTransform: 'uppercase', fontWeight: 500 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - Form */}
          <div style={{
            width: isTablet ? '100%' : 440, maxWidth: 440, flexShrink: 0,
            background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(20px)',
            border: `1px solid ${GB(0.15)}`, borderRadius: 12, padding: isMobile ? 24 : 36,
            boxShadow: `0 0 80px ${EB(0.06)}, 0 0 0 1px ${GB(0.05)} inset`,
            position: 'relative', animation: 'fadeInUp 0.8s ease forwards 0.2s', opacity: 0,
          }}>
            {/* Corner flourishes */}
            <CornerFlourish position="tl" />
            <CornerFlourish position="tr" />
            <CornerFlourish position="bl" />
            <CornerFlourish position="br" />

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, background: GOLD, transform: 'rotate(45deg)', margin: '0 auto 12px' }} />
              <h3 style={{ fontFamily: serif, fontSize: 26, fontWeight: 600, color: CREAM }}>
                Hizmet Talep Edin
              </h3>
              <p style={{ fontFamily: sans, fontSize: 14, color: BODY, marginTop: 6, fontWeight: 400 }}>
                Size 24 saat icinde donus yapalim
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const body = Array.from(fd.entries()).map(([k, v]) => `${k}: ${v}`).join('\n');
                window.location.href = `mailto:morfilmedia@gmail.com?subject=${encodeURIComponent('Rapormatik Hizmet Talebi')}&body=${encodeURIComponent(body)}`;
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            >
              <div>
                <label style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginBottom: 6, display: 'block', letterSpacing: 1, fontWeight: 500 }}>Ad Soyad *</label>
                <input name="Ad Soyad" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} placeholder="Adiniz Soyadiniz" />
              </div>
              <div>
                <label style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginBottom: 6, display: 'block', letterSpacing: 1, fontWeight: 500 }}>Ajans Adi *</label>
                <input name="Ajans Adi" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} placeholder="Ajans adiniz" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginBottom: 6, display: 'block', letterSpacing: 1, fontWeight: 500 }}>E-posta *</label>
                  <input name="E-posta" type="email" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} placeholder="e-posta@adres.com" />
                </div>
                <div>
                  <label style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginBottom: 6, display: 'block', letterSpacing: 1, fontWeight: 500 }}>Telefon *</label>
                  <input name="Telefon" type="tel" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} placeholder="05XX XXX XX XX" />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginBottom: 6, display: 'block', letterSpacing: 1, fontWeight: 500 }}>Musteri Sayisi</label>
                <select name="Musteri Sayisi" style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} onFocus={focusHandler} onBlur={blurHandler}>
                  <option value="" style={{ background: BG }}>Seciniz</option>
                  <option value="1-5" style={{ background: BG }}>1 - 5 musteri</option>
                  <option value="5-15" style={{ background: BG }}>5 - 15 musteri</option>
                  <option value="15-50" style={{ background: BG }}>15 - 50 musteri</option>
                  <option value="50+" style={{ background: BG }}>50+ musteri</option>
                </select>
              </div>
              <div>
                <label style={{ fontFamily: sans, fontSize: 12, color: GOLD, marginBottom: 6, display: 'block', letterSpacing: 1, fontWeight: 500 }}>Mesaj</label>
                <textarea name="Mesaj" rows={3} style={{ ...inputStyle, resize: 'vertical' }} onFocus={focusHandler} onBlur={blurHandler} placeholder="Ihtiyaclarinizi kisaca belirtin..." />
              </div>
              <button type="submit" style={{
                padding: '16px 28px', fontSize: 16, fontWeight: 700, color: BG,
                background: `linear-gradient(135deg, ${E}, ${ED})`, fontFamily: sans,
                border: 'none', cursor: 'pointer', borderRadius: 6,
                transition: 'all 0.3s ease', marginTop: 4, letterSpacing: 0.5,
                boxShadow: `0 4px 20px ${EB(0.3)}`,
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = `0 8px 32px ${EB(0.4)}`; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = `0 4px 20px ${EB(0.3)}`; }}
              >Hizmet Talep Et</button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 18, flexWrap: 'wrap' }}>
              <a href="tel:08503092049" style={{ fontFamily: sans, fontSize: 13, color: BODY, textDecoration: 'none', fontWeight: 500 }}>0850 309 20 49</a>
              <span style={{ color: GB(0.3) }}>|</span>
              <a href="tel:05407275757" style={{ fontFamily: sans, fontSize: 13, color: BODY, textDecoration: 'none', fontWeight: 500 }}>0540 727 57 57</a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CANLI DEMO ==================== */}
      <section id="demo" ref={demoRef} style={{
        padding: isMobile ? '60px 20px' : '100px 32px',
        background: `linear-gradient(180deg, ${EB(0.03)} 0%, transparent 50%, ${GB(0.02)} 100%)`,
        borderTop: `1px solid ${GB(0.08)}`,
        position: 'relative',
      }}>
        {/* Subtle mandala bg */}
        <div style={{
          position: 'absolute', top: '50%', right: '-10%', transform: 'translateY(-50%)',
          width: 400, height: 400, borderRadius: '50%', border: `1px solid ${GB(0.03)}`,
          pointerEvents: 'none', animation: 'rotateSlow 80s linear infinite',
        }}>
          <div style={{ position: 'absolute', inset: 40, borderRadius: '50%', border: `1px solid ${GB(0.02)}` }} />
          <div style={{ position: 'absolute', inset: 80, borderRadius: '50%', border: `1px solid ${GB(0.015)}` }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {sectionHeading('Canli Demo', 'Raporlari Canli', 'Gorun', 'Rapormatik\'in nasil calistigini canli olarak deneyimleyin.')}

          {/* A) Dashboard Simulasyonu */}
          <div style={{
            background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(16px)',
            border: `1px solid ${GB(0.12)}`, borderRadius: 14, padding: isMobile ? 20 : 36,
            marginBottom: 32, position: 'relative', overflow: 'hidden',
            boxShadow: `0 0 60px ${EB(0.04)}, inset 0 1px 0 ${GB(0.08)}`,
          }}>
            <CornerFlourish position="tl" />
            <CornerFlourish position="tr" />
            <CornerFlourish position="bl" />
            <CornerFlourish position="br" />

            {/* Live indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', boxShadow: '0 0 12px #EF4444', animation: 'pulse 2s infinite' }} />
              <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: CREAM, letterSpacing: 1.5, textTransform: 'uppercase' }}>Canli Dashboard</span>
              <div style={{ marginLeft: 'auto', padding: '4px 14px', background: EB(0.08), border: `1px solid ${EB(0.15)}`, borderRadius: 4 }}>
                <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 600, color: EL, letterSpacing: 0.5, textTransform: 'uppercase' }}>Otomatik</span>
              </div>
            </div>

            {/* Top metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
              {[
                { label: 'Aktif Kampanyalar', value: counters.campaigns, suffix: '', color: '#60A5FA' },
                { label: 'Toplam Harcama', value: `${counters.spend.toLocaleString('tr-TR')} TL`, suffix: '', color: E },
                { label: 'Son 30 Gun ROAS', value: `${counters.roas}x`, suffix: '', color: GOLDL },
                { label: 'Ortalama CPA', value: `${counters.cpa} TL`, suffix: '', color: '#F472B6' },
              ].map((m, i) => (
                <div key={i} style={{
                  background: 'rgba(255,255,255,0.03)', border: `1px solid ${EB(0.08)}`,
                  borderRadius: 10, padding: isMobile ? 14 : 20,
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = EB(0.2); e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = EB(0.08); e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  <div style={{ fontFamily: sans, fontSize: 11, color: BODY, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase', fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontFamily: serif, fontSize: isMobile ? 24 : 30, fontWeight: 700, color: m.color }}>
                    {m.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div style={{
              background: 'rgba(255,255,255,0.02)', border: `1px solid ${EB(0.06)}`,
              borderRadius: 10, padding: isMobile ? 16 : 28,
            }}>
              <div style={{ fontFamily: sans, fontSize: 14, color: CREAM, marginBottom: 20, fontWeight: 600 }}>Aylik Performans</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 8 : 16, height: 160, paddingBottom: 28, position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, bottom: 28, top: 0, width: 1, background: GB(0.1) }} />
                {['Eki', 'Kas', 'Ara', 'Oca', 'Sub', 'Mar'].map((month, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{
                      width: '100%', maxWidth: 44,
                      height: `${barHeights[i]}%`,
                      background: `linear-gradient(180deg, ${EL}, ${ED})`,
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                      transitionDelay: `${i * 0.15}s`,
                      minHeight: barHeights[i] > 0 ? 4 : 0,
                      boxShadow: `0 0 20px ${EB(0.25)}`,
                    }} />
                    <span style={{ fontFamily: sans, fontSize: 11, color: BODY, fontWeight: 500 }}>{month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom metrics row */}
            <div style={{ display: 'flex', gap: isMobile ? 20 : 40, marginTop: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { label: 'CTR', value: `%${counters.ctr}`, change: '+0.4%' },
                { label: 'ROAS', value: `${counters.roas}x`, change: '+0.8x' },
                { label: 'CPA', value: `${counters.cpa} TL`, change: '-2.3 TL' },
              ].map((m, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 90, padding: '12px 16px', background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                  <div style={{ fontFamily: sans, fontSize: 11, color: GOLD, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6, fontWeight: 600 }}>{m.label}</div>
                  <div style={{ fontFamily: serif, fontSize: 24, fontWeight: 700, color: EL }}>{m.value}</div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: E, marginTop: 4, fontWeight: 500 }}>{m.change}</div>
                </div>
              ))}
            </div>
          </div>

          {/* B) Rapor Olusturma Animasyonu */}
          <div style={{
            background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(16px)',
            border: `1px solid ${GB(0.12)}`, borderRadius: 14, padding: isMobile ? 20 : 36,
            marginBottom: 32, position: 'relative',
            boxShadow: `0 0 60px ${EB(0.04)}, inset 0 1px 0 ${GB(0.08)}`,
          }}>
            <CornerFlourish position="tl" />
            <CornerFlourish position="tr" />

            <div style={{ fontFamily: sans, fontSize: 14, color: CREAM, marginBottom: 28, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Rapor Olusturma Sureci</div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: isMobile ? 16 : 20 }}>
              {[
                { step: 1, title: 'Platform Bagla', icon: '🔗', desc: 'Meta & Google hesaplarini bagla', active: demoStep >= 1 },
                { step: 2, title: 'Veri Cek', icon: '📊', desc: 'Verileri otomatik senkronize et', active: demoStep >= 2, hasProgress: true },
                { step: 3, title: 'PDF Olustur', icon: '📄', desc: 'Profesyonel rapor olustur', active: demoStep >= 3 },
                { step: 4, title: 'Gonder', icon: '✉️', desc: 'Musteriye otomatik gonder', active: demoStep >= 4, isLast: true },
              ].map((s, i) => (
                <div key={i} style={{
                  background: s.active ? EB(0.08) : 'rgba(255,255,255,0.02)',
                  border: `2px solid ${s.active ? EB(0.4) : EB(0.06)}`,
                  borderRadius: 12, padding: 24, textAlign: 'center',
                  transition: 'all 0.6s ease', position: 'relative',
                  transform: s.active ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: s.active ? `0 0 30px ${EB(0.15)}` : 'none',
                }}>
                  {/* Step badge */}
                  <div style={{
                    position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                    padding: '3px 14px', background: s.active ? ED : 'rgba(17,17,28,0.9)',
                    border: `1px solid ${s.active ? E : EB(0.15)}`, borderRadius: 12,
                    fontFamily: sans, fontSize: 10, fontWeight: 700, color: s.active ? CREAM : '#6B7280',
                    letterSpacing: 1.5, textTransform: 'uppercase',
                  }}>Adim {s.step}</div>

                  <div style={{
                    fontSize: 32, marginBottom: 12, marginTop: 8,
                    opacity: s.active ? 1 : 0.3, transition: 'all 0.6s ease',
                    filter: s.active ? 'none' : 'grayscale(1)',
                    transform: s.active ? 'scale(1.1)' : 'scale(1)',
                  }}>{s.icon}</div>

                  {/* Platforms connecting */}
                  {s.step === 1 && s.active && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
                      {['Meta', 'Google'].map((p, pi) => (
                        <span key={pi} style={{
                          fontFamily: sans, fontSize: 11, color: E, padding: '4px 10px', fontWeight: 600,
                          border: `1px solid ${EB(0.4)}`, borderRadius: 6, background: EB(0.08),
                          animation: 'fadeInScale 0.5s ease forwards', animationDelay: `${pi * 0.3}s`,
                        }}>{p} ✓</span>
                      ))}
                    </div>
                  )}

                  {/* Progress bar */}
                  {s.step === 2 && s.active && (
                    <div style={{ marginBottom: 10 }}>
                      <div style={{ width: '100%', height: 6, background: EB(0.1), borderRadius: 3, overflow: 'hidden' }}>
                        <div style={{
                          width: `${demoProgress}%`, height: '100%',
                          background: `linear-gradient(90deg, ${ED}, ${E}, ${EL})`, backgroundSize: '200% 100%',
                          borderRadius: 3, transition: 'width 0.3s ease',
                          boxShadow: `0 0 12px ${EB(0.5)}`, animation: 'gradientFlow 2s linear infinite',
                        }} />
                      </div>
                      <div style={{ fontFamily: sans, fontSize: 11, color: BODY, marginTop: 6, fontWeight: 500 }}>{demoProgress}% tamamlandi</div>
                    </div>
                  )}

                  {/* PDF pages */}
                  {s.step === 3 && s.active && (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 10 }}>
                      {[1, 2, 3].map((page) => (
                        <div key={page} style={{
                          width: 20, height: 28, background: EB(0.15), border: `1px solid ${EB(0.4)}`,
                          borderRadius: 3, animation: 'slideUp 0.4s ease forwards',
                          animationDelay: `${page * 0.2}s`, opacity: 0,
                          boxShadow: `0 2px 8px ${EB(0.2)}`,
                        }} />
                      ))}
                    </div>
                  )}

                  {/* Checkmark */}
                  {s.isLast && s.active && (
                    <div style={{
                      fontSize: 24, color: E, marginBottom: 10,
                      animation: 'fadeInScale 0.5s ease forwards',
                      textShadow: `0 0 20px ${EB(0.5)}`,
                    }}>✓</div>
                  )}

                  <div style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: s.active ? CREAM : '#4B5563', marginBottom: 4, transition: 'color 0.6s' }}>{s.title}</div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: s.active ? BODY : '#374151', transition: 'color 0.6s', fontWeight: 400 }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* C) Ornek Rapor Onizleme */}
          <div style={{
            background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(16px)',
            border: `1px solid ${GB(0.12)}`, borderRadius: 14, padding: isMobile ? 20 : 36,
            position: 'relative',
            boxShadow: `0 0 60px ${EB(0.04)}, inset 0 1px 0 ${GB(0.08)}`,
          }}>
            <CornerFlourish position="tl" />
            <CornerFlourish position="tr" />
            <CornerFlourish position="bl" />
            <CornerFlourish position="br" />

            <div style={{ fontFamily: sans, fontSize: 14, color: CREAM, marginBottom: 28, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase' }}>Ornek Rapor Onizleme</div>

            <div style={{
              background: '#FFFFFF', borderRadius: 10, padding: isMobile ? 20 : 36,
              maxWidth: 620, margin: '0 auto', position: 'relative', color: '#1F2937',
              boxShadow: `0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.05)`,
              transform: 'perspective(800px) rotateY(-2deg)',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(-2deg)'}
            >
              {/* Watermark */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-30deg)',
                fontFamily: sans, fontSize: 44, color: 'rgba(52,211,153,0.06)', fontWeight: 700,
                whiteSpace: 'nowrap', pointerEvents: 'none', letterSpacing: 4,
              }}>Powered by Rapormatik</div>

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, borderBottom: `2px solid ${ED}`, paddingBottom: 16 }}>
                <div>
                  <div style={{
                    width: 130, height: 36, background: '#F3F4F6', borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: sans, fontSize: 10, color: '#9CA3AF', border: '1.5px dashed #D1D5DB', fontWeight: 500,
                  }}>Sizin ajans logonuz</div>
                  <div style={{ fontFamily: sans, fontSize: 11, color: ED, marginTop: 6, fontWeight: 600 }}>White-Label Rapor</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 700, color: '#1F2937' }}>Mart 2026 Raporu</div>
                  <div style={{ fontFamily: sans, fontSize: 12, color: '#6B7280', fontWeight: 500 }}>ABC Tekstil Ltd.</div>
                </div>
              </div>

              {/* Metrics */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                  { label: 'Harcama', value: '24.850 TL', change: '+12%' },
                  { label: 'Donusum', value: '342', change: '+28%' },
                  { label: 'ROAS', value: '4.2x', change: '+0.8x' },
                ].map((m, i) => (
                  <div key={i} style={{ background: '#F0FDF4', borderRadius: 8, padding: 14, textAlign: 'center', border: '1px solid #BBF7D0' }}>
                    <div style={{ fontFamily: sans, fontSize: 10, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{m.label}</div>
                    <div style={{ fontFamily: sans, fontSize: 20, fontWeight: 700, color: '#1F2937' }}>{m.value}</div>
                    <div style={{ fontFamily: sans, fontSize: 12, color: '#059669', marginTop: 2, fontWeight: 600 }}>{m.change}</div>
                  </div>
                ))}
              </div>

              {/* Pie chart */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 28, marginBottom: 24, flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={{ position: 'relative', width: 110, height: 110, flexShrink: 0 }}>
                  <svg width="110" height="110" viewBox="0 0 110 110" style={{ transform: 'rotate(-90deg)' }}>
                    <circle cx="55" cy="55" r="44" fill="none" stroke="#E5E7EB" strokeWidth="14" />
                    <circle cx="55" cy="55" r="44" fill="none" stroke="#059669" strokeWidth="14"
                      strokeDasharray={`${(pieAngle / 360) * 276.5} 276.5`}
                      strokeLinecap="round" style={{ transition: 'stroke-dasharray 0.3s ease' }}
                    />
                    <circle cx="55" cy="55" r="44" fill="none" stroke="#34D399" strokeWidth="14"
                      strokeDasharray={`${Math.max(0, ((pieAngle - 180) / 360) * 276.5)} 276.5`}
                      strokeDashoffset={`${-(180 / 360) * 276.5}`}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dasharray 0.3s ease', opacity: pieAngle > 180 ? 1 : 0 }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: sans, fontSize: 14, fontWeight: 700, color: '#1F2937' }}>75%</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    { color: '#059669', label: 'Meta Ads - %50' },
                    { color: '#34D399', label: 'Google Ads - %25' },
                    { color: '#E5E7EB', label: 'Organik - %25' },
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 12, height: 12, borderRadius: 3, background: item.color }} />
                      <span style={{ fontFamily: sans, fontSize: 13, color: '#4B5563', fontWeight: 500 }}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: sans, fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>Powered by Rapormatik</span>
                <span style={{ fontFamily: sans, fontSize: 10, color: '#9CA3AF', fontWeight: 500 }}>Sayfa 1 / 4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== OZELLIKLER ==================== */}
      <section id="ozellikler" style={{ padding: isMobile ? '60px 20px' : '100px 32px', position: 'relative' }}>
        {/* BG mandala */}
        <div style={{
          position: 'absolute', top: '30%', left: '-5%', width: 300, height: 300, borderRadius: '50%',
          border: `1px solid ${GB(0.03)}`, pointerEvents: 'none', animation: 'rotateSlow 90s linear infinite reverse',
        }}>
          <div style={{ position: 'absolute', inset: 30, borderRadius: '50%', border: `1px solid ${GB(0.02)}` }} />
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {sectionHeading('Ozellikler', 'Her Sey', 'Tek Panelde', 'Tum reklam platformlarinizi baglayin, raporlariniz otomatik hazirlansin.')}

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {[
              { icon: '🔗', title: 'Platform Entegrasyonu', desc: 'Meta Ads, Google Ads, Google Analytics ve daha fazlasini tek tikla baglayin. OAuth ile guvenli baglanti.' },
              { icon: '📊', title: 'Otomatik Veri Cekme', desc: 'Harcama, tiklama, donusum, ROAS gibi metrikleri otomatik senkronize edin. Manuel veri girisi yok.' },
              { icon: '📄', title: 'PDF Rapor Olusturma', desc: 'Profesyonel tasarimli PDF raporlari saniyeler icinde olusturun. Grafikler, tablolar, analizler dahil.' },
              { icon: '🏷️', title: 'White-Label Markalama', desc: 'Kendi logonuz, renk paletiniz ve marka kimliginizle ozellestirilmis raporlar gonderin.' },
              { icon: '⏰', title: 'Otomatik Zamanlama', desc: 'Aylik veya haftalik raporlari otomatik olusturup musterilerinize e-posta ile gonderin.' },
              { icon: '👥', title: 'Coklu Musteri Yonetimi', desc: 'Tum musterilerinizi tek panelden yonetin. Her biri icin ayri rapor sablonu ve ayarlar.' },
            ].map((f, i) => (
              <div key={i} style={{
                background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(12px)',
                border: `1px solid ${GB(0.1)}`, borderRadius: 12, padding: 32,
                transition: 'all 0.4s ease', cursor: 'default', position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = EB(0.35);
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = `0 16px 48px ${EB(0.1)}, inset 0 1px 0 ${GB(0.1)}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = GB(0.1);
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              >
                {/* Subtle glow on hover */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${GB(0.15)}, transparent)` }} />

                <div style={{ fontSize: 32, marginBottom: 18 }}>{f.icon}</div>
                <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, color: CREAM, marginBottom: 10 }}>{f.title}</h3>
                <p style={{ fontFamily: sans, fontSize: 15, color: BODY, lineHeight: 1.7, fontWeight: 400 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== PLATFORM TANITIM - ANIMASYONLU ==================== */}
      <section style={{
        padding: isMobile ? '60px 20px' : '100px 32px',
        background: `linear-gradient(180deg, ${EB(0.03)} 0%, transparent 50%, ${GB(0.02)} 100%)`,
        borderTop: `1px solid ${GB(0.08)}`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', top: '20%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: `radial-gradient(circle, ${EB(0.06)}, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: `radial-gradient(circle, ${GB(0.05)}, transparent 65%)`, filter: 'blur(80px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {sectionHeading('Nasil Calisir', 'Rapormatik\'i', 'Kesfet', 'Dijital raporlarma surecini bastan sona otomatiklestirin.')}

          {/* === FEATURE BLOCK 1: Otomatik Raporlama === */}
          <div style={{
            display: 'flex', flexDirection: isTablet ? 'column' : 'row', gap: isTablet ? 40 : 64,
            alignItems: 'center', marginBottom: isTablet ? 60 : 100,
          }}>
            {/* Left - Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', padding: '6px 16px', background: EB(0.08),
                border: `1px solid ${EB(0.2)}`, borderRadius: 20, marginBottom: 20,
              }}>
                <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: E, letterSpacing: 1.5, textTransform: 'uppercase' }}>&#9679; Otomatik Raporlama</span>
              </div>
              <h3 style={{ fontFamily: serif, fontSize: isMobile ? 28 : 36, fontWeight: 700, color: CREAM, marginBottom: 12, lineHeight: 1.2 }}>Rapormatik</h3>
              <p style={{ fontFamily: serif, fontSize: 18, color: EL, fontStyle: 'italic', marginBottom: 20, fontWeight: 400 }}>Dijital raporlariniz otomatik hazirlansin</p>
              <p style={{ fontFamily: sans, fontSize: 16, color: BODY, lineHeight: 1.8, marginBottom: 28, fontWeight: 400 }}>
                Meta Ads ve Google Ads verilerinizi otomatik cekerek profesyonel PDF raporlar olusturun. White-label destegiyle musterilerinize kendi markanizla sunun.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Meta ve Google Ads otomatik veri cekme',
                  'Profesyonel PDF rapor olusturma',
                  'White-label: kendi logonuz, kendi markaniz',
                  'Zamanlayici ile otomatik gonderim',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${E}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: E }} />
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 15, color: BODY, fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#iletisim" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 32,
                padding: '14px 32px', fontSize: 14, fontWeight: 600, color: BG,
                background: `linear-gradient(135deg, ${E}, ${ED})`, borderRadius: 6,
                fontFamily: sans, letterSpacing: 0.5, textDecoration: 'none',
                transition: 'all 0.3s ease', boxShadow: `0 4px 16px ${EB(0.25)}`,
              }}
              onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = `0 8px 28px ${EB(0.35)}`; }}
              onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = `0 4px 16px ${EB(0.25)}`; }}
              >Rapormatik'i Incele &rarr;</a>
            </div>

            {/* Right - Animated Demo Card */}
            <div style={{ flex: 1, maxWidth: isTablet ? '100%' : 520 }}>
              <div style={{
                background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(16px)',
                border: `1px solid ${EB(0.12)}`, borderRadius: 14, padding: isMobile ? 20 : 28,
                boxShadow: `0 0 60px ${EB(0.06)}, inset 0 1px 0 ${EB(0.1)}`,
                position: 'relative',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: CREAM }}>Aylik Performans Raporu</span>
                  <div style={{ padding: '4px 14px', background: EB(0.08), border: `1px solid ${EB(0.2)}`, borderRadius: 4 }}>
                    <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: E, letterSpacing: 1, textTransform: 'uppercase' }}>Otomatik</span>
                  </div>
                </div>

                {/* Animated bar chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: isMobile ? 6 : 12, height: 140, paddingBottom: 24, marginBottom: 20, borderBottom: `1px solid ${EB(0.06)}` }}>
                  {[
                    { h: 45, m: 'Oca' }, { h: 55, m: 'Sub' }, { h: 70, m: 'Mar' },
                    { h: 60, m: 'Nis' }, { h: 85, m: 'May' }, { h: 75, m: 'Haz' },
                    { h: 95, m: 'Tem' },
                  ].map((bar, i) => (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <div style={{
                        width: '100%', maxWidth: 36,
                        height: demoVisible ? `${bar.h}%` : '0%',
                        background: `linear-gradient(180deg, ${EL}, ${ED})`,
                        borderRadius: '4px 4px 0 0',
                        transition: `height 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)`,
                        transitionDelay: `${0.2 + i * 0.12}s`,
                        boxShadow: `0 0 16px ${EB(0.2)}`,
                      }} />
                      <span style={{ fontFamily: sans, fontSize: 10, color: BODY, fontWeight: 500 }}>{bar.m}</span>
                    </div>
                  ))}
                </div>

                {/* Animated metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
                  {[
                    { label: 'ROAS', value: `${counters.roas}x`, color: EL },
                    { label: 'Ort. CPC', value: `${String.fromCharCode(8378)}${(counters.cpa * 0.096).toFixed(2)}`, color: EL },
                    { label: 'Donusum', value: `${Math.round(counters.spend / 221)}`, color: EL },
                  ].map((m, i) => (
                    <div key={i} style={{
                      background: 'rgba(255,255,255,0.03)', border: `1px solid ${EB(0.1)}`,
                      borderRadius: 8, padding: isMobile ? 10 : 14, textAlign: 'center',
                      opacity: demoVisible ? 1 : 0,
                      transform: demoVisible ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
                      transition: `all 0.6s ease ${1.2 + i * 0.25}s`,
                    }}>
                      <div style={{ fontFamily: serif, fontSize: isMobile ? 20 : 26, fontWeight: 700, color: m.color }}>{m.value}</div>
                      <div style={{ fontFamily: sans, fontSize: 10, color: GOLD, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 4, fontWeight: 600 }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* PDF notification */}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                  background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: `1px solid ${EB(0.06)}`,
                  opacity: demoVisible ? 1 : 0, transform: demoVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'all 0.6s ease 2.2s',
                }}>
                  <div style={{ width: 32, height: 32, background: EB(0.1), borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>&#128196;</div>
                  <span style={{ fontFamily: sans, fontSize: 13, color: BODY, fontWeight: 400 }}>PDF rapor olusturuldu — otomatik gonderildi</span>
                </div>
              </div>
            </div>
          </div>

          <OrnamentalDivider size="large" />

          {/* === FEATURE BLOCK 2: White-Label === */}
          <div style={{
            display: 'flex', flexDirection: isTablet ? 'column' : 'row-reverse', gap: isTablet ? 40 : 64,
            alignItems: 'center', marginBottom: isTablet ? 60 : 100,
          }}>
            {/* Right - Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', padding: '6px 16px', background: GB(0.08),
                border: `1px solid ${GB(0.2)}`, borderRadius: 20, marginBottom: 20,
              }}>
                <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: GOLD, letterSpacing: 1.5, textTransform: 'uppercase' }}>&#9679; White-Label</span>
              </div>
              <h3 style={{ fontFamily: serif, fontSize: isMobile ? 28 : 36, fontWeight: 700, color: CREAM, marginBottom: 12, lineHeight: 1.2 }}>Kendi Markanizla Sunun</h3>
              <p style={{ fontFamily: serif, fontSize: 18, color: GOLDL, fontStyle: 'italic', marginBottom: 20, fontWeight: 400 }}>Musterileriniz raporlari sizin logonuzla alsin</p>
              <p style={{ fontFamily: sans, fontSize: 16, color: BODY, lineHeight: 1.8, marginBottom: 28, fontWeight: 400 }}>
                Raporlardaki tum markalama sizin ajans kimliginize gore ozellestirilebilir. Logonuz, renk paletiniz ve iletisim bilgileriniz ile tam profesyonel bir deneyim sunun.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Ajans logonuz raporun her sayfasinda',
                  'Ozel renk paleti ve tasarim sablonlari',
                  'Musteri bazinda farkli markalama',
                  'Profesyonel ajans algisi olusturun',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: GOLD }} />
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 15, color: BODY, fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Left - White-label Report Preview */}
            <div style={{ flex: 1, maxWidth: isTablet ? '100%' : 520 }}>
              <div style={{
                background: '#FFFFFF', borderRadius: 12, padding: isMobile ? 20 : 32,
                color: '#1F2937', position: 'relative',
                boxShadow: `0 24px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.05)`,
                transform: 'perspective(800px) rotateY(3deg)',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(0deg)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'perspective(800px) rotateY(3deg)'}
              >
                {/* Report Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: `2px solid ${ED}`, paddingBottom: 14 }}>
                  <div style={{
                    width: 120, height: 32, background: '#F3F4F6', borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: sans, fontSize: 10, color: '#9CA3AF', border: '1.5px dashed #D1D5DB', fontWeight: 500,
                  }}>Sizin Logonuz</div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: '#1F2937' }}>Mart 2026</div>
                    <div style={{ fontFamily: sans, fontSize: 11, color: '#6B7280' }}>Musteri Raporu</div>
                  </div>
                </div>

                {/* Mini metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                  {[
                    { label: 'Harcama', value: '24.8K', color: '#059669' },
                    { label: 'Tiklama', value: '12.4K', color: '#059669' },
                    { label: 'ROAS', value: '4.2x', color: '#059669' },
                  ].map((m, i) => (
                    <div key={i} style={{ background: '#F0FDF4', borderRadius: 8, padding: 12, textAlign: 'center', border: '1px solid #BBF7D0' }}>
                      <div style={{ fontFamily: sans, fontSize: 9, color: '#6B7280', textTransform: 'uppercase', letterSpacing: 1, fontWeight: 600 }}>{m.label}</div>
                      <div style={{ fontFamily: sans, fontSize: 18, fontWeight: 700, color: '#1F2937', marginTop: 2 }}>{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 60, marginBottom: 16, padding: '0 8px' }}>
                  {[40, 55, 35, 70, 50, 80, 65, 90, 75, 60, 85, 95].map((h, i) => (
                    <div key={i} style={{ flex: 1, height: `${h}%`, background: `linear-gradient(180deg, #34D399, #059669)`, borderRadius: '2px 2px 0 0', opacity: 0.8 }} />
                  ))}
                </div>

                {/* Footer */}
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 10, display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: sans, fontSize: 9, color: '#9CA3AF' }}>Sizin Ajans Adiniz</span>
                  <span style={{ fontFamily: sans, fontSize: 9, color: '#9CA3AF' }}>Sayfa 1 / 4</span>
                </div>
              </div>
            </div>
          </div>

          <OrnamentalDivider size="large" />

          {/* === FEATURE BLOCK 3: Zamanlama & Coklu Musteri === */}
          <div style={{
            display: 'flex', flexDirection: isTablet ? 'column' : 'row', gap: isTablet ? 40 : 64,
            alignItems: 'center',
          }}>
            {/* Left - Text */}
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-block', padding: '6px 16px', background: 'rgba(96,165,250,0.08)',
                border: '1px solid rgba(96,165,250,0.2)', borderRadius: 20, marginBottom: 20,
              }}>
                <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: '#60A5FA', letterSpacing: 1.5, textTransform: 'uppercase' }}>&#9679; Zamanlama & Yonetim</span>
              </div>
              <h3 style={{ fontFamily: serif, fontSize: isMobile ? 28 : 36, fontWeight: 700, color: CREAM, marginBottom: 12, lineHeight: 1.2 }}>Tum Musterileriniz Tek Panelde</h3>
              <p style={{ fontFamily: serif, fontSize: 18, color: '#93C5FD', fontStyle: 'italic', marginBottom: 20, fontWeight: 400 }}>Haftalik veya aylik otomatik gonderim</p>
              <p style={{ fontFamily: sans, fontSize: 16, color: BODY, lineHeight: 1.8, marginBottom: 28, fontWeight: 400 }}>
                Tum musterilerinizi tek bir panelden yonetin. Her musteri icin farkli rapor sablonlari, zamanlama ayarlari ve gonderim tercihleri belirleyin. Rapormatik gerisini halleder.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  'Sinir olmaksizin musteri ekleyin',
                  'Her musteri icin ayri rapor sablonu',
                  'Haftalik veya aylik otomatik gonderim',
                  'E-posta ile otomatik rapor teslimi',
                  'Tek tikla tum raporlari olusturun',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', border: '1.5px solid #60A5FA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#60A5FA' }} />
                    </div>
                    <span style={{ fontFamily: sans, fontSize: 15, color: BODY, fontWeight: 400 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Multi-client Dashboard Mock */}
            <div style={{ flex: 1, maxWidth: isTablet ? '100%' : 520 }}>
              <div style={{
                background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(16px)',
                border: '1px solid rgba(96,165,250,0.12)', borderRadius: 14, padding: isMobile ? 20 : 28,
                boxShadow: '0 0 60px rgba(96,165,250,0.06), inset 0 1px 0 rgba(96,165,250,0.1)',
              }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: CREAM }}>Musteri Paneli</span>
                  <div style={{ padding: '4px 14px', background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 4 }}>
                    <span style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, color: '#60A5FA', letterSpacing: 1 }}>5 AKTIF</span>
                  </div>
                </div>

                {/* Client list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { name: 'ABC Tekstil', platform: 'Meta + Google', status: 'Rapor Gonderildi', statusColor: E, time: '2 saat once' },
                    { name: 'XYZ Mobilya', platform: 'Google Ads', status: 'Rapor Hazirlaniyor', statusColor: '#FBBF24', time: 'Simdi' },
                    { name: 'Moda Store', platform: 'Meta Ads', status: 'Zamanlanmis', statusColor: '#60A5FA', time: 'Yarin 09:00' },
                    { name: 'Tech Solutions', platform: 'Meta + Google', status: 'Rapor Gonderildi', statusColor: E, time: '1 gun once' },
                    { name: 'Lezzet Cafe', platform: 'Meta Ads', status: 'Zamanlanmis', statusColor: '#60A5FA', time: '3 Nis 10:00' },
                  ].map((client, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 16px', background: 'rgba(255,255,255,0.02)',
                      border: `1px solid ${EB(0.06)}`, borderRadius: 8,
                      transition: 'all 0.3s ease',
                      opacity: demoVisible ? 1 : 0,
                      transform: demoVisible ? 'translateX(0)' : 'translateX(20px)',
                      transitionDelay: `${0.3 + i * 0.15}s`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = EB(0.15); e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = EB(0.06); e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
                    >
                      <div>
                        <div style={{ fontFamily: sans, fontSize: 14, fontWeight: 600, color: CREAM }}>{client.name}</div>
                        <div style={{ fontFamily: sans, fontSize: 11, color: BODY, marginTop: 2 }}>{client.platform}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, color: client.statusColor }}>{client.status}</div>
                        <div style={{ fontFamily: sans, fontSize: 10, color: '#6B7280', marginTop: 2 }}>{client.time}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary bar */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 18, padding: '14px 0', borderTop: `1px solid ${EB(0.06)}` }}>
                  {[
                    { label: 'Gonderilen', val: '3', color: E },
                    { label: 'Bekleyen', val: '1', color: '#FBBF24' },
                    { label: 'Zamanli', val: '2', color: '#60A5FA' },
                  ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: s.color }}>{s.val}</div>
                      <div style={{ fontFamily: sans, fontSize: 10, color: BODY, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section style={{
        padding: isMobile ? '60px 20px' : '100px 32px',
        background: EB(0.02), borderTop: `1px solid ${GB(0.08)}`, borderBottom: `1px solid ${GB(0.08)}`,
        position: 'relative',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {sectionHeading('Referanslar', 'Ajanslar Ne', 'Diyor?', null)}

          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? '1fr' : 'repeat(3, 1fr)',
            gap: 20,
          }}>
            {[
              {
                name: 'Serkan Yilmaz', role: 'Kurucu, Piksel Dijital',
                quote: 'Rapormatik sayesinde her ay 3 gun kazaniyoruz. Musterilerimize white-label raporlar gonderiyoruz, profesyonellik algimiz katlandi.',
                stars: 5,
              },
              {
                name: 'Elif Karagoz', role: 'Performans Muduru, AdVista Agency',
                quote: 'Google Ads ve Meta Ads verilerini tek panelde gormek buyuk kolaylik. Artik Excel ile ugrasmak yerine strateji gelistirmeye odaklaniyoruz.',
                stars: 5,
              },
              {
                name: 'Burak Demir', role: 'Genel Mudur, Crescendo Medya',
                quote: '50\'den fazla musterimizin raporlarini otomatik olusturuyoruz. Rapormatik olmadan bu olcegi yonetmek imkansiz olurdu.',
                stars: 5,
              },
            ].map((t, i) => (
              <div key={i} style={{
                background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(12px)',
                border: `1px solid ${GB(0.1)}`, borderRadius: 12, padding: 32,
                transition: 'all 0.4s ease', position: 'relative',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = GB(0.3); e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 16px 48px ${GB(0.06)}`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = GB(0.1); e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {/* Gold quote mark */}
                <div style={{ fontFamily: serif, fontSize: 48, color: GB(0.3), lineHeight: 1, marginBottom: 8, fontWeight: 700 }}>"</div>

                {/* Stars */}
                <div style={{ marginBottom: 14 }}>
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <span key={si} style={{ color: GOLD, fontSize: 15 }}>★ </span>
                  ))}
                </div>
                <p style={{ fontFamily: sans, fontSize: 16, color: BODY, lineHeight: 1.8, fontWeight: 400, marginBottom: 24, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div style={{ borderTop: `1px solid ${GB(0.1)}`, paddingTop: 16 }}>
                  <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, color: CREAM }}>{t.name}</div>
                  <div style={{ fontFamily: sans, fontSize: 13, color: GOLD, marginTop: 4, fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section id="sss" style={{ padding: isMobile ? '60px 20px' : '100px 32px', position: 'relative' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          {sectionHeading('SSS', 'Sik Sorulan', 'Sorular', null)}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { q: 'Rapormatik nedir?', a: 'Rapormatik, dijital ajanslarin musterilerine sunduklari reklam performans raporlarini otomatik olarak olusturmasini saglayan bir platformdur. Meta Ads, Google Ads gibi platformlardan verileri ceker ve profesyonel PDF raporlar haline getirir.' },
              { q: 'Hangi reklam platformlarini destekler?', a: 'Su anda Meta Ads (Facebook & Instagram), Google Ads ve Google Analytics entegrasyonlarini destekliyoruz. TikTok Ads ve diger platformlar da yakinda eklenecek.' },
              { q: 'Raporlar nasil olusturuluyor?', a: 'Reklam hesaplarinizi bagladiktan sonra Rapormatik verileri otomatik olarak ceker. Tek tikla veya belirlediginiz zamanlarda otomatik olarak profesyonel PDF raporlar olusturulur ve musterilerinize gonderilebilir.' },
              { q: 'White-label rapor nedir?', a: 'White-label raporlar, kendi ajans logonuz, renk paletiniz ve markanizla ozellesmis raporlardir. Musterileriniz raporu sizin markanizla alir, boylece profesyonel bir ajans imaji olusturursunuz.' },
              { q: 'Musterilerime otomatik gonderebilir miyim?', a: 'Evet! Raporlari aylik veya haftalik olarak otomatik olusturup, belirlediginiz e-posta adreslerine otomatik gonderim ayarlayabilirsiniz.' },
              { q: 'Kac musteri ekleyebilirim?', a: 'Musteri sayisinda herhangi bir sinir yoktur. Ister 5, ister 500 musteri olsun, tum musterilerinizi tek panelden yonetebilir ve her biri icin ayri rapor ayarlari belirleyebilirsiniz.' },
              { q: 'Verilerim guvenli mi?', a: 'Evet. Tum platform baglantilari OAuth ile gerceklestirilir, yani sifre bilgileriniz bizimle paylasılmaz. Verileriniz sifreli olarak saklanir ve sadece sizin erisebileceginiz sekilde korunur.' },
              { q: 'Ucretli mi? Deneme suresi var mi?', a: 'Rapormatik\'i denemek tamamen ucretsizdir. Formu doldurduktan sonra ekibimiz sizinle iletisime gecer ve deneme uyeliginizi acar. Memnun kalmazsaniz herhangi bir yukumluluk yoktur.' },
              { q: 'Hizmet nasil baslar?', a: 'Sayfadaki iletisim formunu doldurmaniz yeterli. Ekibimiz 24 saat icinde sizinle iletisime gecerek ihtiyaclarinizi degerlendirir ve deneme hesabinizi acar.' },
            ].map((faq, i) => (
              <div key={i} style={{
                background: 'rgba(17,17,28,0.7)', backdropFilter: 'blur(12px)',
                border: `1px solid ${openFaq === i ? GB(0.3) : GB(0.1)}`,
                borderRadius: 10, transition: 'all 0.35s ease', overflow: 'hidden',
                boxShadow: openFaq === i ? `0 4px 20px ${GB(0.06)}` : 'none',
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: '100%', padding: '22px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 600, color: CREAM }}>{faq.q}</span>
                  <span style={{
                    color: GOLD, fontSize: 22, fontFamily: sans, fontWeight: 400,
                    transition: 'transform 0.3s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    flexShrink: 0, marginLeft: 16,
                  }}>+</span>
                </button>
                <div style={{
                  maxHeight: openFaq === i ? 220 : 0,
                  opacity: openFaq === i ? 1 : 0,
                  transition: 'max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease',
                  padding: openFaq === i ? '0 28px 22px' : '0 28px 0',
                  overflow: 'hidden',
                }}>
                  <p style={{ fontFamily: sans, fontSize: 15, color: BODY, lineHeight: 1.8, fontWeight: 400 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ILETISIM FORMU ==================== */}
      <section id="iletisim" style={{
        padding: isMobile ? '60px 20px' : '100px 32px',
        background: `linear-gradient(180deg, ${EB(0.03)} 0%, ${GB(0.02)} 100%)`,
        borderTop: `1px solid ${GB(0.08)}`, position: 'relative',
      }}>
        {/* BG mandala */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, height: 500, borderRadius: '50%', border: `1px solid ${GB(0.04)}`,
          pointerEvents: 'none', animation: 'rotateSlow 70s linear infinite',
        }}>
          <div style={{ position: 'absolute', inset: 50, borderRadius: '50%', border: `1px solid ${GB(0.03)}` }} />
          <div style={{ position: 'absolute', inset: 100, borderRadius: '50%', border: `1px solid ${GB(0.02)}` }} />
        </div>

        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          {sectionHeading('Iletisim', 'Ucretsiz Deneme', 'Talebi', 'Formu doldurun, ekibimiz sizinle iletisime gecip deneme uyeliginizi acsin.')}

          {/* Form Card - morfilmedya style */}
          <div style={{
            background: 'rgba(17,17,28,0.5)', backdropFilter: 'blur(20px)',
            border: `1px solid ${GB(0.15)}`, padding: isMobile ? 28 : 52,
            position: 'relative',
          }}>
            {/* Corner brackets */}
            <div style={{ position: 'absolute', top: -1, left: -1, width: 28, height: 28, borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: -1, right: -1, width: 28, height: 28, borderTop: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -1, left: -1, width: 28, height: 28, borderBottom: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}`, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 28, height: 28, borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}`, pointerEvents: 'none' }} />

            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <h3 style={{ fontFamily: serif, fontSize: isMobile ? 22 : 28, fontWeight: 600, color: CREAM, letterSpacing: 1 }}>
                <span style={{ color: GOLD }}>&#10022;</span> Ucretsiz Deneme Basvurusu <span style={{ color: GOLD }}>&#10022;</span>
              </h3>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                const body = Array.from(fd.entries()).map(([k, v]) => `${k}: ${v}`).join('\n');
                window.location.href = `mailto:morfilmedia@gmail.com?subject=${encodeURIComponent('Rapormatik Deneme Talebi')}&body=${encodeURIComponent(body)}`;
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              {/* Row 1: Ad Soyad + Firma Adi */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: sans, fontSize: 11, color: GOLD, marginBottom: 8, display: 'block', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>Ad Soyad</label>
                  <input name="Ad Soyad" required style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)', border: `1px solid ${GB(0.2)}`, borderRadius: 0 }} onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = `rgba(212,168,83,0.04)`; }} onBlur={(e) => { e.target.style.borderColor = GB(0.2); e.target.style.background = 'rgba(255,255,255,0.03)'; }} placeholder="Adiniz Soyadiniz" />
                </div>
                <div>
                  <label style={{ fontFamily: sans, fontSize: 11, color: GOLD, marginBottom: 8, display: 'block', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>Firma Adi</label>
                  <input name="Firma Adi" required style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)', border: `1px solid ${GB(0.2)}`, borderRadius: 0 }} onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = `rgba(212,168,83,0.04)`; }} onBlur={(e) => { e.target.style.borderColor = GB(0.2); e.target.style.background = 'rgba(255,255,255,0.03)'; }} placeholder="Firma / Ajans Adiniz" />
                </div>
              </div>

              {/* Row 2: E-posta + Telefon */}
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ fontFamily: sans, fontSize: 11, color: GOLD, marginBottom: 8, display: 'block', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>E-Posta</label>
                  <input name="E-posta" type="email" required style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)', border: `1px solid ${GB(0.2)}`, borderRadius: 0 }} onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = `rgba(212,168,83,0.04)`; }} onBlur={(e) => { e.target.style.borderColor = GB(0.2); e.target.style.background = 'rgba(255,255,255,0.03)'; }} placeholder="email@firma.com" />
                </div>
                <div>
                  <label style={{ fontFamily: sans, fontSize: 11, color: GOLD, marginBottom: 8, display: 'block', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>Telefon</label>
                  <input name="Telefon" type="tel" required style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)', border: `1px solid ${GB(0.2)}`, borderRadius: 0 }} onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = `rgba(212,168,83,0.04)`; }} onBlur={(e) => { e.target.style.borderColor = GB(0.2); e.target.style.background = 'rgba(255,255,255,0.03)'; }} placeholder="+90 5XX XXX XX XX" />
                </div>
              </div>

              {/* Musteri Sayisi */}
              <div>
                <label style={{ fontFamily: sans, fontSize: 11, color: GOLD, marginBottom: 8, display: 'block', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>Musteri Sayiniz</label>
                <select name="Musteri Sayisi" style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)', border: `1px solid ${GB(0.2)}`, borderRadius: 0, appearance: 'none', cursor: 'pointer' }} onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = `rgba(212,168,83,0.04)`; }} onBlur={(e) => { e.target.style.borderColor = GB(0.2); e.target.style.background = 'rgba(255,255,255,0.03)'; }}>
                  <option value="" style={{ background: BG }}>Seciniz</option>
                  <option value="1-5" style={{ background: BG }}>1 - 5 musteri</option>
                  <option value="5-15" style={{ background: BG }}>5 - 15 musteri</option>
                  <option value="15-50" style={{ background: BG }}>15 - 50 musteri</option>
                  <option value="50+" style={{ background: BG }}>50+ musteri</option>
                </select>
              </div>

              {/* Mesaj */}
              <div>
                <label style={{ fontFamily: sans, fontSize: 11, color: GOLD, marginBottom: 8, display: 'block', letterSpacing: 2, fontWeight: 600, textTransform: 'uppercase' }}>Mesajiniz</label>
                <textarea name="Mesaj" rows={4} style={{ ...inputStyle, background: 'rgba(255,255,255,0.03)', border: `1px solid ${GB(0.2)}`, borderRadius: 0, resize: 'vertical' }} onFocus={(e) => { e.target.style.borderColor = GOLD; e.target.style.background = `rgba(212,168,83,0.04)`; }} onBlur={(e) => { e.target.style.borderColor = GB(0.2); e.target.style.background = 'rgba(255,255,255,0.03)'; }} placeholder="Markaniz ve dijital hedefleriniz hakkinda kisaca bilgi verin..." />
              </div>

              {/* Submit */}
              <button type="submit" style={{
                width: '100%', padding: '17px', fontSize: 13, fontWeight: 700,
                color: GOLDL, background: 'transparent', fontFamily: sans,
                border: `1px solid ${GOLD}`, cursor: 'pointer',
                transition: 'all 0.4s ease', letterSpacing: 3, textTransform: 'uppercase',
              }}
              onMouseEnter={e => { e.target.style.background = GOLD; e.target.style.color = BG; e.target.style.boxShadow = `0 0 50px ${GB(0.2)}`; }}
              onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = GOLDL; e.target.style.boxShadow = 'none'; }}
              >&#10022;&nbsp;&nbsp;Deneme Talebi Gonder&nbsp;&nbsp;&#10022;</button>
            </form>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 24, flexWrap: 'wrap' }}>
              <a href="tel:08503092049" style={{ fontFamily: sans, fontSize: 14, color: EL, textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16 }}>&#9742;</span> 0850 309 20 49
              </a>
              <span style={{ color: GB(0.3) }}>|</span>
              <a href="tel:05407275757" style={{ fontFamily: sans, fontSize: 14, color: EL, textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 16 }}>&#9742;</span> 0540 727 57 57
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer style={{
        background: '#060610', borderTop: `1px solid ${GB(0.1)}`, padding: isMobile ? '36px 20px' : '52px 32px',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 28, flexDirection: isMobile ? 'column' : 'row',
          textAlign: isMobile ? 'center' : 'left',
        }}>
          <div>
            <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 700, color: CREAM, letterSpacing: 2 }}>
              RAPOR<span style={{ color: E }}>MATiK</span>
            </span>
            <p style={{ fontFamily: sans, fontSize: 14, color: BODY, marginTop: 8, fontWeight: 400 }}>
              Morfil Medya tarafindan gelistirilmistir.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="https://morfilmedya.com" target="_blank" rel="noopener noreferrer" style={{ fontFamily: sans, fontSize: 14, color: BODY, textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = BODY}
              >morfilmedya.com</a>
              <a href="https://webtasarimi.net" target="_blank" rel="noopener noreferrer" style={{ fontFamily: sans, fontSize: 14, color: BODY, textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}
              onMouseEnter={e => e.target.style.color = GOLD} onMouseLeave={e => e.target.style.color = BODY}
              >webtasarimi.net</a>
            </div>
            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="tel:08503092049" style={{ fontFamily: sans, fontSize: 14, color: BODY, textDecoration: 'none', fontWeight: 500 }}>0850 309 20 49</a>
              <span style={{ color: GB(0.3), fontSize: 14 }}>|</span>
              <a href="tel:05407275757" style={{ fontFamily: sans, fontSize: 14, color: BODY, textDecoration: 'none', fontWeight: 500 }}>0540 727 57 57</a>
            </div>
          </div>
          <div style={{ fontFamily: sans, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
            &copy; 2026 Morfil Medya. Tum haklari saklidir.
          </div>
        </div>
      </footer>

      {/* ==================== CSS ANIMATIONS + RESPONSIVE ==================== */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        a { text-decoration: none; }
        html { scroll-behavior: smooth; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.9); }
        }
        @keyframes gradientFlow {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(20px, -30px); }
          66% { transform: translate(-15px, 15px); }
        }
        @keyframes rotateSlow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        @media (max-width: 1024px) {
          h1 { font-size: 44px !important; }
        }
        @media (max-width: 768px) {
          h1 { font-size: 34px !important; }
          h2 { font-size: 32px !important; }
        }
        @media (max-width: 480px) {
          h1 { font-size: 30px !important; }
          h2 { font-size: 28px !important; }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0f; }
        ::-webkit-scrollbar-thumb { background: rgba(212,168,83,0.3); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(212,168,83,0.5); }

        /* Selection */
        ::selection { background: rgba(52,211,153,0.3); color: #F5EDE0; }
      `}</style>
    </div>
  );
}
