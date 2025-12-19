import React, { useEffect } from 'react';

const MagicLetterModal = ({
  isOpen,
  onClose,
  title = 'Carta para ti',
  subtitle = 'Estrella nocturna',
  text = '',
}) => {
  // Блокируем скролл страницы, пока письмо открыто
  useEffect(() => {
    if (isOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="letter-overlay" onClick={onClose}>
      <div className="letter-container">
        {/* Карточка письма */}
        <div className="letter-paper" onClick={(e) => e.stopPropagation()}>
          <div className="letter-content">
            <div className="letter-star-icon" aria-hidden="true">
              ⭐
            </div>

            <header className="letter-header">
              <h1 className="letter-title">{title}</h1>
              {subtitle && <div className="letter-subtitle">{subtitle}</div>}
            </header>

            <div className="letter-body-scroll">
              <div className="letter-text">{text}</div>
            </div>

            <footer className="letter-footer">
              <span className="letter-decoration">~ ✦ ~</span>
              <button type="button" className="close-btn" onClick={onClose}>
                Volver a las estrellas
              </button>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MagicLetterModal;



