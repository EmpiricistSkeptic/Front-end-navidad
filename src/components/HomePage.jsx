import { useState } from 'react';
import StarMap from './StarMap.jsx';
import CatSceneModal from './CatSceneModal.jsx';
import LetterModal from './LetterModal.jsx';
import { mockDialogue, mockLetterText } from '../mockData.js';

function HomePage({ user, onLogout }) {
  const todayDayIndex = 1;

  const [sceneCompleted, setSceneCompleted] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);

  // Здесь уже несколько дней с координатами на небе
  const [days, setDays] = useState([
    {
      dayIndex: 1,
      unlocked: true,
      letterOpened: false,
      x: 20,
      y: 30,
    },
    {
      dayIndex: 2,
      unlocked: false,
      letterOpened: false,
      x: 55,
      y: 40,
    },
    {
      dayIndex: 3,
      unlocked: false,
      letterOpened: false,
      x: 70,
      y: 65,
    },
    {
      dayIndex: 4,
      unlocked: false,
      letterOpened: false,
      x: 35,
      y: 70,
    },
  ]);

  const handleSceneCompleted = () => {
    setSceneCompleted(true);

    // Разблокируем сегодняшнюю звезду (на будущее – можно разблокировать следующую)
    setDays((prev) =>
      prev.map((day) =>
        day.dayIndex === todayDayIndex
          ? { ...day, unlocked: true }
          : day
      )
    );

    setShowLetterModal(true);
  };

  const handleOpenDay = (dayIndex) => {
    const day = days.find((d) => d.dayIndex === dayIndex);
    if (!day || !day.unlocked) return;

    // Пока — просто открываем письмо.
    // Позже можно: если сцена не пройдена — показывать сцену, иначе письмо.
    setShowLetterModal(true);
  };

  const handleLetterClose = () => {
    setShowLetterModal(false);
    setDays((prev) =>
      prev.map((day) =>
        day.dayIndex === todayDayIndex
          ? { ...day, letterOpened: true }
          : day
      )
    );
  };

  return (
    <div className="home-wrapper">
      {/* Шапка */}
      <header className="home-header">
        <div>
          <div className="home-greeting">
            Привет, {user.name || 'Путешественник'} ✨
          </div>
          <div className="home-subtitle">
            Сегодняшний день истории:&nbsp;
            <strong>{todayDayIndex}</strong>
          </div>
        </div>
        <button className="home-logout" onClick={onLogout}>
          Выйти
        </button>
      </header>

      {/* Основной контент */}
      <main className="home-main">
        <section className="home-sky">
          <div className="home-sky-header">
            <div className="home-sky-title">Твоё зимнее небо</div>
            <div className="home-sky-subtitle">
              Каждая звезда — письмо, которое откроется в свой день.
            </div>
          </div>

          <StarMap
            days={days}
            todayDayIndex={todayDayIndex}
            onDayClick={handleOpenDay}
          />
        </section>

        <section className="home-info">
          <h2 className="home-info-title">Как это работает</h2>
          <p>
            В этом окне всегда будет твоя личная ночь: кот, снежинки и звёзды.
            Каждый день здесь загорается одна звезда, и внутри неё — письмо
            или стих, который был написан только для тебя.
          </p>
          <p>
            Просто заходи в сказку, разговаривай с котом и смотри, какие
            новые огоньки появляются на твоём небе.
          </p>
        </section>
      </main>

      {/* Сцена с котом – пока автопоказ, если не завершена */}
      {!sceneCompleted && (
        <CatSceneModal
          isOpen={!sceneCompleted}
          dialogue={mockDialogue}
          onSceneCompleted={handleSceneCompleted}
        />
      )}

      {/* Письмо/стих */}
      {showLetterModal && (
        <LetterModal
          isOpen={showLetterModal}
          text={mockLetterText}
          onClose={handleLetterClose}
        />
      )}
    </div>
  );
}

export default HomePage;
