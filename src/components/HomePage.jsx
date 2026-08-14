import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom'; // НОВЫЙ ИМПОРТ ДЛЯ ИДЕАЛЬНОГО ОКНА
import StarMap from './StarMap.jsx';
import CatSceneModal from './CatSceneModal.jsx';
import LetterModal from './LetterModal.jsx';

import storyService from '../services/story.service';
import letterService from '../services/letter.service';
import summerScene from '../assets/summer-scene.png';
import TimelinePage from './TimelinePage.jsx';
import GaleriaPage from './GaleriaPage.jsx';

// ▼▼▼ НАСТРОЙ ЭТИ ТРИ КОНСТАНТЫ ▼▼▼
import photo1 from '../assets/yo.jpg';
import photo2 from '../assets/tu1.jpg';
const LOVE_START_DATE = new Date('2025-10-30T00:00:00');
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

// ▼▼▼ CONFIG DEL ANIVERSARIO — cambia aquí el mes/fecha cuando lo necesites ▼▼▼
// year/month/day definen el día exacto (mes es 1-12, no 0-11, para que sea fácil de leer).
const ANNIVERSARY_CONFIG = {
  year: 2026,
  month: 8, // Agosto
  day: 14,
  monthNumber: 3, // "3º mes"
};
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

function isAnniversaryToday(config, now = new Date()) {
  return (
    now.getFullYear() === config.year &&
    now.getMonth() + 1 === config.month &&
    now.getDate() === config.day
  );
}

// Posiciones deterministas para las partículas doradas (evita recalcular con Math.random en cada render)
const ANNIVERSARY_PARTICLES = [
  { left: 8, delay: 0.2, duration: 7, size: 3 },
  { left: 18, delay: 1.6, duration: 8.5, size: 2 },
  { left: 27, delay: 0.9, duration: 6.5, size: 4 },
  { left: 38, delay: 2.4, duration: 9, size: 2 },
  { left: 49, delay: 0.4, duration: 7.5, size: 3 },
  { left: 61, delay: 1.9, duration: 8, size: 2 },
  { left: 71, delay: 1.1, duration: 6.8, size: 3 },
  { left: 82, delay: 2.8, duration: 9.5, size: 2 },
  { left: 91, delay: 0.7, duration: 7.2, size: 3 },
  { left: 14, delay: 3.2, duration: 8.8, size: 2 },
  { left: 55, delay: 3.6, duration: 7.8, size: 2 },
  { left: 95, delay: 1.4, duration: 6.2, size: 3 },
];

// Словарь координат для звезд
const COORDS_MAP = {
  0: { x: 30, y: 70 },
  1: { x: 42, y: 58 },
  2: { x: 58, y: 48 },
  3: { x: 70, y: 35 },
  4: { x: 55, y: 25 },
  5: { x: 38, y: 32 },
  6: { x: 24, y: 45 },
  7: { x: 68, y: 62 },
  8: { x: 80, y: 50 },
  30: { x: 85, y: 20 },
  // ▼ Новое письмо:
  60: { x: 15, y: 25 }
};

// Минимальный CSS только для анимаций (не для дизайна)
const animationStyles = `
  @keyframes fadeOverlay { from { opacity: 0; } to { opacity: 1; } }
  @keyframes popCard { from { opacity: 0; transform: scale(0.9) translateY(20px); } to { opacity: 1; transform: scale(1) translateY(0); } }
  @keyframes floatGold { 
    0% { transform: translateY(0); opacity: 0; } 
    20% { opacity: 0.8; } 
    80% { opacity: 0.8; } 
    100% { transform: translateY(-150px); opacity: 0; } 
  }

  @keyframes annivOverlayFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes annivGlowPulse {
    0%, 100% { opacity: 0.55; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.85; transform: translate(-50%, -50%) scale(1.08); }
  }
  @keyframes annivCardRise {
    from { opacity: 0; transform: translateY(28px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes annivFadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes annivHeartPulse {
    0%, 100% { transform: scale(1); opacity: 0.9; }
    50% { transform: scale(1.12); opacity: 1; }
  }
  @keyframes annivParticleDrift {
    0% { transform: translateY(0); opacity: 0; }
    12% { opacity: 0.7; }
    88% { opacity: 0.55; }
    100% { transform: translateY(-120vh); opacity: 0; }
  }
  @keyframes annivDividerGrow {
    from { width: 0; opacity: 0; }
    to { width: 56px; opacity: 1; }
  }

  @media (prefers-reduced-motion: reduce) {
    .anniv-overlay, .anniv-card, .anniv-fade-item, .anniv-heart, .anniv-particle, .anniv-glow, .anniv-divider-line {
      animation: none !important;
    }
  }
`;

function pad(n) {
  return String(Math.floor(n)).padStart(2, '0');
}

function useLoveCounter(startDate) {
  const [counter, setCounter] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Date.now() - startDate.getTime();
      const totalSecs = Math.floor(diff / 1000);
      setCounter({
        days: Math.floor(totalSecs / 86400),
        hours: Math.floor(totalSecs / 3600) % 24,
        mins: Math.floor(totalSecs / 60) % 60,
        secs: totalSecs % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startDate]);

  return counter;
}

function LoveCounterCard() {
  const { days, hours, mins, secs } = useLoveCounter(LOVE_START_DATE);
  const startLabel = LOVE_START_DATE.toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <div className="love-counter-card">
      <span className="love-star love-star--1">✦</span>
      <span className="love-star love-star--2">✦</span>
      <span className="love-star love-star--3">✦</span>
      <div className="love-counter-photos">
        <div className="love-photo-wrapper">
          <img src={photo1} alt="Yo" className="love-counter-photo" />
          <div className="love-photo-glow" />
        </div>
        <div className="love-heart-pulse">
          <span className="love-heart-inner">♥</span>
          <span className="love-heart-ring" />
        </div>
        <div className="love-photo-wrapper">
          <img src={photo2} alt="Ella" className="love-counter-photo" />
          <div className="love-photo-glow" />
        </div>
      </div>
      <div className="love-counter-title">Nuestro cuento de amor</div>
      <div className="love-counter-since">✨ desde el {startLabel} ✨</div>
      <div className="love-divider">
        <span className="love-divider-line" />
        <span className="love-divider-dot">♦</span>
        <span className="love-divider-line" />
      </div>
      <div className="love-counter-grid">
        <div className="love-counter-cell"><span className="love-counter-number">{days}</span><span className="love-counter-label">días</span></div>
        <div className="love-counter-sep">:</div>
        <div className="love-counter-cell"><span className="love-counter-number">{pad(hours)}</span><span className="love-counter-label">horas</span></div>
        <div className="love-counter-sep">:</div>
        <div className="love-counter-cell"><span className="love-counter-number">{pad(mins)}</span><span className="love-counter-label">min</span></div>
        <div className="love-counter-sep">:</div>
        <div className="love-counter-cell"><span className="love-counter-number love-counter-number--secs">{pad(secs)}</span><span className="love-counter-label">seg</span></div>
      </div>
    </div>
  );
}

// Popup de aniversario — cinematográfico, elegante, aislado de LoveCounterCard.
function AnniversaryOverlay({ monthNumber, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className="anniv-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="anniv-heading"
      aria-describedby="anniv-message"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999999,
        margin: 0,
        padding: 'clamp(16px, 5vw, 32px)',
        boxSizing: 'border-box',
        overflow: 'hidden',
        background:
          'radial-gradient(ellipse at 50% 20%, rgba(120, 40, 70, 0.35), transparent 60%), ' +
          'radial-gradient(ellipse at 15% 85%, rgba(90, 40, 120, 0.25), transparent 55%), ' +
          'radial-gradient(ellipse at 85% 80%, rgba(60, 30, 90, 0.25), transparent 55%), ' +
          'linear-gradient(180deg, #06040c 0%, #0b0714 45%, #0a0510 100%)',
        animation: 'annivOverlayFade 0.9s ease-out forwards',
      }}
    >
      {/* Halo atmosférico detrás de la tarjeta */}
      <div
        className="anniv-glow"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 'min(90vw, 520px)',
          height: 'min(90vw, 520px)',
          background:
            'radial-gradient(circle, rgba(232, 195, 125, 0.18) 0%, rgba(150, 60, 100, 0.12) 45%, transparent 72%)',
          filter: 'blur(20px)',
          transform: 'translate(-50%, -50%)',
          animation: 'annivGlowPulse 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Partículas doradas, deterministas y discretas */}
      {ANNIVERSARY_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="anniv-particle"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-10%',
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,195,125,0.9), rgba(232,195,125,0))',
            boxShadow: '0 0 6px rgba(232,195,125,0.6)',
            animation: `annivParticleDrift ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Tarjeta principal */}
      <div
        className="anniv-card"
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(92vw, 400px)',
          maxHeight: '88dvh',
          overflowY: 'auto',
          background:
            'linear-gradient(160deg, rgba(28, 20, 34, 0.82) 0%, rgba(16, 11, 22, 0.9) 100%)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(212, 175, 110, 0.35)',
          borderRadius: '22px',
          padding: 'clamp(28px, 7vw, 44px) clamp(20px, 6vw, 34px)',
          textAlign: 'center',
          boxShadow:
            '0 30px 70px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.02) inset, 0 1px 0 rgba(255,255,255,0.06) inset',
          animation: 'annivCardRise 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="anniv-fade-item"
          style={{
            fontSize: 'clamp(0.68rem, 2vw, 0.75rem)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(232, 195, 125, 0.75)',
            marginBottom: '14px',
            animation: 'annivFadeUp 0.8s ease-out 0.5s both',
          }}
        >
          ✦ Aniversario ✦
        </div>

        <h1
          id="anniv-heading"
          className="anniv-fade-item"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: '#F0DCA8',
            fontSize: 'clamp(1.5rem, 6vw, 2.1rem)',
            lineHeight: 1.25,
            margin: '0 0 8px 0',
            letterSpacing: '0.01em',
            fontWeight: 400,
            animation: 'annivFadeUp 0.8s ease-out 0.65s both',
          }}
        >
          Feliz {monthNumber}º mes, mi amor
        </h1>

        <h2
          className="anniv-fade-item"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(235, 225, 235, 0.85)',
            fontSize: 'clamp(0.95rem, 3.4vw, 1.1rem)',
            margin: '0 0 20px 0',
            animation: 'annivFadeUp 0.8s ease-out 0.8s both',
          }}
        >
          Tres meses de nosotros
        </h2>

        <div
          className="anniv-fade-item anniv-divider"
          aria-hidden="true"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '0 auto 20px auto',
            animation: 'annivFadeUp 0.8s ease-out 0.95s both',
          }}
        >
          <span
            className="anniv-divider-line"
            style={{
              display: 'inline-block',
              height: '1px',
              width: '56px',
              background:
                'linear-gradient(90deg, transparent, rgba(212,175,110,0.7))',
              animation: 'annivDividerGrow 1s ease-out 1.1s both',
            }}
          />
          <span
            className="anniv-heart"
            style={{
              color: 'rgba(212, 175, 110, 0.9)',
              fontSize: '0.85rem',
              display: 'inline-block',
              animation: 'annivHeartPulse 2.6s ease-in-out infinite',
            }}
          >
            ♥
          </span>
          <span
            style={{
              display: 'inline-block',
              height: '1px',
              width: '56px',
              background:
                'linear-gradient(90deg, rgba(212,175,110,0.7), transparent)',
              animation: 'annivDividerGrow 1s ease-out 1.1s both',
            }}
          />
        </div>

        <p
          id="anniv-message"
          className="anniv-fade-item"
          style={{
            color: 'rgba(228, 220, 228, 0.88)',
            fontSize: 'clamp(0.9rem, 3.2vw, 1rem)',
            lineHeight: 1.7,
            margin: '0 0 26px 0',
            fontFamily: 'Georgia, "Times New Roman", serif',
            animation: 'annivFadeUp 0.8s ease-out 1.1s both',
          }}
        >
          Cada día contigo se siente como una pequeña historia que quiero seguir
          escribiendo. Gracias por estos tres meses, por cada sonrisa, cada
          palabra y cada momento que compartimos. Te amo, mi amor.
        </p>

        <button
          onClick={onClose}
          className="anniv-fade-item"
          style={{
            background: 'linear-gradient(180deg, rgba(212,175,110,0.12), rgba(212,175,110,0.04))',
            border: '1px solid rgba(212, 175, 110, 0.55)',
            color: '#F0DCA8',
            padding: '13px 30px',
            borderRadius: '999px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            fontSize: 'clamp(0.8rem, 2.6vw, 0.88rem)',
            fontFamily: 'Georgia, "Times New Roman", serif',
            minHeight: '44px',
            minWidth: '44px',
            transition: 'background 0.35s ease, box-shadow 0.35s ease, transform 0.25s ease',
            animation: 'annivFadeUp 0.8s ease-out 1.25s both',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(180deg, rgba(212,175,110,0.22), rgba(212,175,110,0.08))';
            e.currentTarget.style.boxShadow = '0 0 22px rgba(212,175,110,0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              'linear-gradient(180deg, rgba(212,175,110,0.12), rgba(212,175,110,0.04))';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Te adoro ❤️
        </button>
      </div>
    </div>,
    document.body
  );
}

function HomePage({ user, onLogout, onOpenGallery }) {
  const [todayDayIndex, setTodayDayIndex] = useState(null);
  const [days, setDays] = useState([]);
  const [sceneCompleted, setSceneCompleted] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showGaleria, setShowGaleria] = useState(false);

  // Стейт для анимации годовщины
  const [showAnniversary, setShowAnniversary] = useState(false);

  // La fecha decide si hoy es el aniversario. No hay timeout: el cierre solo
  // depende de la interacción del usuario y se resetea en cada recarga/apertura.
  useEffect(() => {
    if (isAnniversaryToday(ANNIVERSARY_CONFIG)) {
      setShowAnniversary(true);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const initData = await storyService.initStory();
        setTodayDayIndex(initData.today_day_index);

        const daysArray = Object.keys(COORDS_MAP).map(key => {
          const idx = Number(key);
          const progress = initData.progress.find(p => p.day_index === idx);
          return {
            dayIndex: idx,
            unlocked: true,
            letterOpened: progress?.letter_opened || false,
            x: COORDS_MAP[idx].x,
            y: COORDS_MAP[idx].y,
          };
        });

        setDays(daysArray);
        const todayProgress = initData.progress.find(
          p => p.day_index === initData.today_day_index
        );
        setSceneCompleted(todayProgress?.scene_completed ?? false);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar la historia estelar.');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleSceneCompleted = async (finishedDayIndex) => {
    setSceneCompleted(true);
    const dayToFetch = finishedDayIndex ?? todayDayIndex;
    setDays(prev =>
      prev.map(day => day.dayIndex === dayToFetch ? { ...day, unlocked: true } : day)
    );
    try {
      const letter = await letterService.getLetter(dayToFetch);
      setCurrentLetter(letter);
      setShowLetterModal(true);
    } catch (err) {
      console.error('Error cargando la carta tras la escena:', err);
    }
  };

  const handleOpenDay = async (dayIndex) => {
    const day = days.find(d => d.dayIndex === dayIndex);
    if (!day || !day.unlocked) return;
    try {
      const letter = await letterService.getLetter(dayIndex);
      setCurrentLetter(letter);
      setShowLetterModal(true);
    } catch (err) {
      console.error('Error abriendo carta antigua:', err);
    }
  };

  const handleLetterClose = () => {
    const closedLetterDayIndex = currentLetter?.day_index;
    setShowLetterModal(false);
    setCurrentLetter(null);
    if (closedLetterDayIndex !== undefined) {
      setDays(prev =>
        prev.map(day => day.dayIndex === closedLetterDayIndex ? { ...day, letterOpened: true } : day)
      );
    }
  };

  if (showTimeline) return <TimelinePage onBack={() => setShowTimeline(false)} />;
  if (showGaleria) return <GaleriaPage onBack={() => setShowGaleria(false)} />;

  if (loading) {
    return (
      <div className="home-wrapper" style={{ backgroundImage: `url(${summerScene})` }}>
        <div className="loading-container">✨ Cargando estrellas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-wrapper" style={{ backgroundImage: `url(${summerScene})` }}>
        <div className="error-container">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-wrapper" style={{ backgroundImage: `url(${summerScene})` }}>
      
      <style>{animationStyles}</style>

      {showAnniversary && (
        <AnniversaryOverlay
          monthNumber={ANNIVERSARY_CONFIG.monthNumber}
          onClose={() => setShowAnniversary(false)}
        />
      )}

      <button className="home-logout" onClick={onLogout} style={{ top: '20px', bottom: 'auto', left: 'auto', right: '20px' }}>
        Salir
      </button>

      <button className="album-btn-home" onClick={onOpenGallery}>
        Nuestro Álbum
      </button>

      <button className="timeline-btn-home" onClick={() => setShowTimeline(true)}>
        ✦ Línea del tiempo
      </button>

      <button className="galeria-btn-home" onClick={() => setShowGaleria(true)}>
        ◆ Galería de mi musa
      </button>

      <div className="home-sky-layer">
        <StarMap days={days} todayDayIndex={todayDayIndex} onDayClick={handleOpenDay} />
      </div>

      <header className="home-header-card">
        <div className="home-greeting">
          ¡Hola, {user.username || 'princesa'}!
        </div>
        <div className="home-subtitle">
          Día de la historia: <strong>{todayDayIndex}</strong>
        </div>
      </header>

      <LoveCounterCard />

      {!sceneCompleted && (
        <CatSceneModal isOpen={!sceneCompleted} onSceneCompleted={handleSceneCompleted} />
      )}

      {showLetterModal && currentLetter && (
        <LetterModal
          isOpen={showLetterModal}
          onClose={handleLetterClose}
          title={currentLetter.title || `Estrella ${currentLetter.day_index}`}
          text={currentLetter.text}
        />
      )}
    </div>
  );
}

export default HomePage;