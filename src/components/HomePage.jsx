// src/components/HomePage.jsx
import { useEffect, useState } from 'react';
import StarMap from './StarMap.jsx';
import CatSceneModal from './CatSceneModal.jsx';
import LetterModal from './LetterModal.jsx';
import storyService from '../services/story.service';
import letterService from '../services/letter.service';
import winterScene from '../assets/winter-scene-2048.png';

const TOTAL_DAYS = 9; // количество дней истории

function HomePage({ user, onLogout }) {
  const [todayDayIndex, setTodayDayIndex] = useState(null);
  const [days, setDays] = useState([]);
  const [sceneCompleted, setSceneCompleted] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [todayLetter, setTodayLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Инициализация истории и прогресса пользователя
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const initData = await storyService.initStory();

        setTodayDayIndex(initData.today_day_index);

        // Формируем массив дней с координатами для звёзд
        const coords = [
          { x: 30, y: 70 }, { x: 42, y: 58 }, { x: 58, y: 48 },
          { x: 70, y: 35 }, { x: 55, y: 25 }, { x: 38, y: 32 },
          { x: 24, y: 45 }, { x: 68, y: 62 }, { x: 80, y: 50 },
        ];

        const daysArray = [];
        for (let i = 1; i <= TOTAL_DAYS; i++) {
          const progress = initData.progress.find(p => p.day_index === i);
          daysArray.push({
            dayIndex: i,
            unlocked: progress?.scene_completed || false,
            letterOpened: progress?.letter_opened || false,
            x: coords[i - 1].x,
            y: coords[i - 1].y,
          });
        }
        setDays(daysArray);

        // Если сцена сегодня ещё не пройдена — показываем CatSceneModal
        const todayProgress = initData.progress.find(p => p.day_index === initData.today_day_index);
        if (!todayProgress?.scene_completed) {
          setSceneCompleted(false);
        } else {
          setSceneCompleted(true);
        }

        // Если письмо сегодня ещё не открыто — подготавливаем письмо
        const todayLetterData = initData.letters.find(l => l.day_index === initData.today_day_index);
        if (todayLetterData && !todayProgress?.letter_opened) {
          setTodayLetter(todayLetterData);
        }

      } catch (err) {
        setError(err.message || 'Error cargando la historia');
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  const handleSceneCompleted = async () => {
    setSceneCompleted(true);

    // Обновляем прогресс на фронте
    setDays(prev =>
      prev.map(day =>
        day.dayIndex === todayDayIndex
          ? { ...day, unlocked: true }
          : day
      )
    );

    try {
      // Получаем письмо сегодняшнего дня через letterService
      const letter = await letterService.getLetter(todayDayIndex);
      setTodayLetter(letter);
      setShowLetterModal(true);
    } catch (err) {
      console.error('No se pudo cargar la carta:', err);
    }
  };

  const handleOpenDay = async (dayIndex) => {
    const day = days.find(d => d.dayIndex === dayIndex);
    if (!day || !day.unlocked) return;

    try {
      const letter = await letterService.getLetter(dayIndex);
      setTodayLetter(letter);
      setShowLetterModal(true);
    } catch (err) {
      console.error('No se pudo abrir la carta:', err);
    }
  };

  const handleLetterClose = () => {
    setShowLetterModal(false);
    // Отмечаем письмо сегодняшнего дня как открытое
    setDays(prev =>
      prev.map(day =>
        day.dayIndex === todayDayIndex
          ? { ...day, letterOpened: true }
          : day
      )
    );
  };

  if (loading || todayDayIndex === null) {
    return (
      <div className="home-wrapper" style={{ backgroundImage: `url(${winterScene})` }}>
        <p className="loading-text">Cargando historia...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-wrapper" style={{ backgroundImage: `url(${winterScene})` }}>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="home-wrapper" style={{ backgroundImage: `url(${winterScene})` }}>
      {/* Кнопка выхода */}
      <button className="home-logout" onClick={onLogout}>
        Cerrar sesión
      </button>

      {/* Слой с созвездием */}
      <div className="home-sky-layer">
        <StarMap
          days={days}
          todayDayIndex={todayDayIndex}
          onDayClick={handleOpenDay}
        />
      </div>

      {/* Приветствие */}
      <header className="home-header-card">
        <div className="home-greeting">
          ¡Hola, {user.username || 'viajera'}! ✨
        </div>
        <div className="home-subtitle">
          Día de la historia: <strong>{todayDayIndex}</strong>
        </div>
      </header>

      {/* Инструкция */}
      <section className="home-info-card">
        <h2 className="home-info-title">Cómo funciona tu cuento</h2>
        <p>
          Aquí siempre estará tu invierno personal: la casita, el gato y el cielo estrellado.
          Cada día, una nueva estrella se enciende arriba y dentro hay
          una carta o poema solo para ti.
        </p>
        <p>
          Solo entra, habla con el gato y observa cómo tu noche
          se llena poco a poco de luces brillantes.
        </p>
      </section>

      {/* Сцена с котом */}
      {!sceneCompleted && (
        <CatSceneModal
          isOpen={!sceneCompleted}
          onSceneCompleted={handleSceneCompleted}
        />
      )}

      {/* Модалка письма */}
      {showLetterModal && todayLetter && (
        <MagicLetterModal
          isOpen={showLetterModal}
          title={todayLetter.title || 'Письмо для тебя'}
          text={todayLetter.text}
          onClose={handleLetterClose}
        />
      )}
    </div>
  );
}

export default HomePage;
