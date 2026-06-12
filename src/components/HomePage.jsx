import { useEffect, useState } from 'react';
import StarMap from './StarMap.jsx';
import CatSceneModal from './CatSceneModal.jsx';
import LetterModal from './LetterModal.jsx';

import storyService from '../services/story.service';
import letterService from '../services/letter.service';
import summerScene from '../assets/summer-scene.png';

// ▼▼▼ НАСТРОЙ ЭТИ ТРИ КОНСТАНТЫ ▼▼▼
import photo1 from '../assets/yo.jpg';
import photo2 from '../assets/tu1.jpg';
const LOVE_START_DATE = new Date('2025-10-30T00:00:00');
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

const TOTAL_DAYS = 9;
 
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
        <div className="love-counter-cell">
          <span className="love-counter-number">{days}</span>
          <span className="love-counter-label">días</span>
        </div>
        <div className="love-counter-sep">:</div>
        <div className="love-counter-cell">
          <span className="love-counter-number">{pad(hours)}</span>
          <span className="love-counter-label">horas</span>
        </div>
        <div className="love-counter-sep">:</div>
        <div className="love-counter-cell">
          <span className="love-counter-number">{pad(mins)}</span>
          <span className="love-counter-label">min</span>
        </div>
        <div className="love-counter-sep">:</div>
        <div className="love-counter-cell">
          <span className="love-counter-number love-counter-number--secs">{pad(secs)}</span>
          <span className="love-counter-label">seg</span>
        </div>
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
 
  // ← новый стейт для Línea del tiempo
  const [showTimeline, setShowTimeline] = useState(false);
 
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const initData = await storyService.initStory();
        setTodayDayIndex(initData.today_day_index);
 
        const coords = [
          { x: 30, y: 70 }, { x: 42, y: 58 }, { x: 58, y: 48 },
          { x: 70, y: 35 }, { x: 55, y: 25 }, { x: 38, y: 32 },
          { x: 24, y: 45 }, { x: 68, y: 62 }, { x: 80, y: 50 },
        ];
 
        const daysArray = [];
        for (let i = 0; i < TOTAL_DAYS; i++) {
          const progress = initData.progress.find(p => p.day_index === i);
          daysArray.push({
            dayIndex: i,
            unlocked: true,
            letterOpened: progress?.letter_opened || false,
            x: coords[i]?.x || 50,
            y: coords[i]?.y || 50,
          });
        }
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
      prev.map(day =>
        day.dayIndex === dayToFetch ? { ...day, unlocked: true } : day
      )
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
        prev.map(day =>
          day.dayIndex === closedLetterDayIndex
            ? { ...day, letterOpened: true }
            : day
        )
      );
    }
  };
 
  // ── Рендер Timeline ─────────────────────────────────────────
  if (showTimeline) {
    return <TimelinePage onBack={() => setShowTimeline(false)} />;
  }
 
  // ── Загрузка / ошибка ───────────────────────────────────────
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
 
  // ── Главный рендер ──────────────────────────────────────────
  return (
    <div className="home-wrapper" style={{ backgroundImage: `url(${summerScene})` }}>
 
      {/* Кнопка выхода */}
      <button
        className="home-logout"
        onClick={onLogout}
        style={{ top: '20px', bottom: 'auto', left: 'auto', right: '20px' }}
      >
        Salir
      </button>
 
      {/* Кнопка Альбом */}
      <button className="album-btn-home" onClick={onOpenGallery}>
        Nuestro Álbum
      </button>
 
      {/* ← НОВАЯ кнопка Línea del tiempo (рядом с альбомом) */}
      <button
        className="timeline-btn-home"
        onClick={() => setShowTimeline(true)}
      >
        ✦ Línea del tiempo
      </button>
 
      <div className="home-sky-layer">
        <StarMap
          days={days}
          todayDayIndex={todayDayIndex}
          onDayClick={handleOpenDay}
        />
      </div>
 
      <header className="home-header-card">
        <div className="home-greeting">
          ¡Hola, {user.username || 'princesa'}!
        </div>
        <div className="home-subtitle">
          Día de la historia: <strong>{todayDayIndex}</strong>
        </div>
      </header>
 
      {/* Счётчик любви — левый нижний угол */}
      <LoveCounterCard />
 
      {!sceneCompleted && (
        <CatSceneModal
          isOpen={!sceneCompleted}
          onSceneCompleted={handleSceneCompleted}
        />
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