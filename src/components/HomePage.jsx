import { useEffect, useState } from 'react';
import StarMap from './StarMap.jsx';
import CatSceneModal from './CatSceneModal.jsx';
import LetterModal from './LetterModal.jsx';

import storyService from '../services/story.service';
import letterService from '../services/letter.service';
import winterScene from '../assets/winter-scene-2048.png';

const TOTAL_DAYS = 9; 

// Добавили проп onOpenGallery
function HomePage({ user, onLogout, onOpenGallery }) {
  const [todayDayIndex, setTodayDayIndex] = useState(null);
  const [days, setDays] = useState([]);
  const [sceneCompleted, setSceneCompleted] = useState(false);
  
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [currentLetter, setCurrentLetter] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

        const todayProgress = initData.progress.find(p => p.day_index === initData.today_day_index);
        
        if (todayProgress && todayProgress.scene_completed) {
            setSceneCompleted(true);
        } else {
            setSceneCompleted(false);
        }

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
    const dayToFetch = (finishedDayIndex !== null && finishedDayIndex !== undefined) 
                        ? finishedDayIndex 
                        : todayDayIndex;

    setDays(prev => prev.map(day => 
      day.dayIndex === dayToFetch 
        ? { ...day, unlocked: true } 
        : day
    ));

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
    
    // Просто помечаем письмо как прочитанное, без вызова пропозала
    if (closedLetterDayIndex !== undefined) {
        setDays(prev => prev.map(day => 
            (day.dayIndex === closedLetterDayIndex)
            ? { ...day, letterOpened: true }
            : day
        ));
    }
  };

  if (loading) {
    return (
      <div className="home-wrapper" style={{ backgroundImage: `url(${winterScene})` }}>
        <div className="loading-container">✨ Cargando estrellas...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-wrapper" style={{ backgroundImage: `url(${winterScene})` }}>
        <div className="error-container">{error}</div>
      </div>
    );
  }

  return (
    <div className="home-wrapper" style={{ backgroundImage: `url(${winterScene})` }}>
      
      {/* Кнопка ВЫХОДА */}
      <button 
        className="home-logout" 
        onClick={onLogout}
        style={{ top: '20px', bottom: 'auto', left: 'auto', right: '20px' }}
      >
        Salir
      </button>

      {/* НОВАЯ КНОПКА: Альбом (слева сверху) */}
      <button 
        className="album-btn-home" 
        onClick={onOpenGallery}
      >
         Nuestro Álbum
      </button>

      {/* Основной контент страницы */}
      <>
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

        <div className="fairytale-hint">
          <div className="hint-icon">🕯️</div>
          <div className="hint-content">
            <h4>Tu Cuento de Invierno</h4>
            <p>
              Vuelve aquí cada noche y habla con el <strong>Gato Guardián</strong>. 
              Al terminar su historia, se encenderá una estrella... ✨
            </p>
          </div>
        </div>

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
      </>
    </div>
  );
}

export default HomePage;