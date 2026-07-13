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

  useEffect(() => {
    const today = new Date();
    // Активируется каждое 13 число
    if (today.getDate() === 13) {
      setShowAnniversary(true);
      const timer = setTimeout(() => {
        setShowAnniversary(false);
      }, 15000);
      return () => clearTimeout(timer);
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

      {/* ▼▼▼ БРОНЕБОЙНОЕ ОКНО ЧЕРЕЗ ПОРТАЛ ▼▼▼ */}
      {showAnniversary && createPortal(
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(10, 5, 20, 0.85)', backdropFilter: 'blur(10px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 999999, margin: 0, padding: 0,
          animation: 'fadeOverlay 1s ease-out forwards'
        }}>
          <div style={{
            position: 'relative',
            background: 'linear-gradient(145deg, rgba(25, 25, 35, 0.98), rgba(15, 10, 20, 0.98))',
            border: '2px solid rgba(212, 175, 55, 0.6)', borderRadius: '20px',
            padding: '40px 30px', maxWidth: '400px', width: '90%', textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.9), 0 0 30px rgba(212,175,55,0.3)',
            boxSizing: 'border-box', overflow: 'hidden',
            animation: 'popCard 1s ease-out forwards'
          }}>
            <h1 style={{
              color: '#E8C37D', fontSize: '2rem', margin: '0 0 10px 0',
              fontFamily: 'serif', letterSpacing: '1px'
            }}>
              Feliz 2º Mes, mi amor
            </h1>
            <h2 style={{
              color: '#fff', fontSize: '1.1rem', margin: '0 0 25px 0',
              fontStyle: 'italic', fontWeight: 'normal'
            }}>
              Dos meses de magia a tu lado
            </h2>
            
            <p style={{
              color: '#ddd', lineHeight: '1.6', margin: '0 0 30px 0', fontSize: '1rem'
            }}>
              Cada instante contigo es el regalo más hermoso que me ha dado el universo.<br/><br/>
              Gracias por ser mi estrella más brillante. Te amo.
            </p>
            
            <button 
              onClick={() => setShowAnniversary(false)}
              style={{
                backgroundColor: 'transparent', border: '1px solid #E8C37D',
                color: '#E8C37D', padding: '12px 35px', borderRadius: '30px',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px',
                fontWeight: 'bold', position: 'relative', zIndex: 10
              }}
            >
              Te adoro
            </button>
            
            {/* Частицы */}
            {[...Array(15)].map((_, i) => {
              const size = Math.random() * 5 + 2; 
              return (
                <span 
                  key={i} 
                  style={{ 
                    position: 'absolute', backgroundColor: '#E8C37D', borderRadius: '50%',
                    width: `${size}px`, height: `${size}px`,
                    left: `${Math.random() * 95}%`, bottom: `-20px`,
                    animation: 'floatGold infinite linear',
                    animationDuration: `${Math.random() * 3 + 2}s`,
                    animationDelay: `${Math.random() * 2}s`,
                    zIndex: 1, pointerEvents: 'none'
                  }}
                />
              );
            })}
          </div>
        </div>,
        document.body // Рендерит окно прямо в тег <body>, игнорируя поломки внутри <home-wrapper>
      )}
      {/* ▲▲▲ КОНЕЦ ОКНА ▲▲▲ */}

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