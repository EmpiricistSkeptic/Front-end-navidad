import React, { useEffect, useState } from 'react';

const Celebration = ({ isActive }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (isActive) {
      // Создаем 50 сердечек
      const newHearts = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100 + '%', // Случайная позиция по горизонтали
        animationDuration: Math.random() * 2 + 3 + 's', // Случайная скорость (3-5 сек)
        delay: Math.random() * 2 + 's', // Случайная задержка
        emoji: ['❤️', '💖', '🥰', '✨'][Math.floor(Math.random() * 4)] // Разные эмодзи
      }));
      setHearts(newHearts);
    } else {
      setHearts([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="celebration-overlay">
      {hearts.map((heart) => (
        <div 
          key={heart.id}
          className="heart-particle"
          style={{
            left: heart.left,
            animationDuration: heart.animationDuration,
            animationDelay: heart.delay
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  );
};

export default Celebration;