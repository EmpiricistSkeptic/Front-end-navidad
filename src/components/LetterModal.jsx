import React, { useEffect } from 'react';

const LetterModal = ({
  isOpen,
  onClose,
  title,
  subtitle = 'System Notification',
  text,
  backgroundImage = null,
}) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const safeTitle = title || "Информация";
  const safeText = text || "";

  return (
    <div className="glass-overlay" onClick={onClose}>
      <div className="glass-container">
        
        {/* Декоративные пятна (Glow effects) */}
        <div className="glow-blob blob-1"></div>
        <div className="glow-blob blob-2"></div>

        <div 
          className="glass-card" 
          onClick={(e) => e.stopPropagation()}
          style={backgroundImage ? { 
            backgroundImage: `linear-gradient(rgba(18, 18, 28, 0.85), rgba(18, 18, 28, 0.95)), url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : {}}
        >
          
          {/* Верхняя панель */}
          <div className="glass-header">
            <div className="header-info">
              <h2 className="glass-title">{safeTitle}</h2>
              <span className="glass-subtitle">{subtitle}</span>
            </div>
            <button className="icon-close-btn" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* Контент со скроллом */}
          <div className="glass-body-scroll">
            <div className="glass-text">
              {safeText}
            </div>
          </div>

          {/* Футер */}
          <div className="glass-footer">
            <button 
              type="button" 
              className="neon-action-btn" 
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LetterModal;