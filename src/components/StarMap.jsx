function StarMap({ days, todayDayIndex, onDayClick }) {
  return (
    <div className="star-map">
      {/* Можно потом соединять звезды линиями (SVG), сейчас просто оставим фон */}

      {days.map((day) => {
        const isToday = day.dayIndex === todayDayIndex;
        const isUnlocked = day.unlocked;
        const isNew = isUnlocked && !day.letterOpened;

        const classNames = [
          'star',
          isUnlocked ? 'star--unlocked' : 'star--locked',
          isToday ? 'star--today' : '',
          isNew ? 'star--new' : '',
        ]
          .filter(Boolean)
          .join(' ');

        return (
          <button
            key={day.dayIndex}
            className={classNames}
            style={{
              left: `${day.x}%`,
              top: `${day.y}%`,
            }}
            disabled={!isUnlocked}
            onClick={() => onDayClick(day.dayIndex)}
          >
            {day.dayIndex}
          </button>
        );
      })}
    </div>
  );
}

export default StarMap;
