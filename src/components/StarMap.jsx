import React from 'react';
import starImg from '../assets/starglow1.png'; // <-- ПОДСТАВЬ СВОЙ ФАЙЛ

function StarMap({ days, todayDayIndex, onDayClick }) {
  return (
    <div className="star-map">
      {days.map((day) => {
        const isToday = day.dayIndex === todayDayIndex;
        const isUnlocked = day.unlocked;
        const isNew = isUnlocked && !day.letterOpened;
        const isRead = isUnlocked && day.letterOpened;

        const classNames = ['star'];

        if (!isUnlocked) {
          classNames.push('star--locked');
        } else {
          classNames.push('star--available');
          if (isNew) classNames.push('star--new');
          if (isRead) classNames.push('star--read');
          if (isToday) classNames.push('star--today');
        }

        return (
          <button
            key={day.dayIndex}
            className={classNames.join(' ')}
            style={{
              left: `${day.x}%`,
              top: `${day.y}%`,
            }}
            disabled={!isUnlocked}
            onClick={() => {
              if (!isUnlocked) return;
              onDayClick(day.dayIndex);
            }}
            aria-label={`Звезда дня ${day.dayIndex}`}
          >
            <img
              src={starImg}
              alt=""
              className="star-img"
              draggable="false"
            />
          </button>
        );
      })}
    </div>
  );
}

export default StarMap;
