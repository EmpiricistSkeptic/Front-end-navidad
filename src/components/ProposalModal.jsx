import React, { useEffect } from 'react';

// ! ВАЖНО: Замени путь на реальный путь к вашей совместной фотографии
// Если фото лежит в папке public, можно просто указать строку '/photo.jpg' в пропсах
// Если в src, то импортируй: import usPhoto from './assets/us.jpg';

const ProposalModal = ({ isOpen, onAccept, photoSrc }) => {
  
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

  return (
    <div className="glass-overlay">
      <div className="glass-container">
        
        {/* Декоративные пятна */}
        <div className="glow-blob blob-1" style={{background: '#ff69b4'}}></div>
        <div className="glow-blob blob-2" style={{background: '#ff1493'}}></div>

        <div className="glass-card" onClick={(e) => e.stopPropagation()}>
          
          {/* Заголовок */}
          <div className="glass-header" style={{ justifyContent: 'center', borderBottom: 'none' }}>
            <h2 className="glass-title" style={{ fontSize: '1.3rem', color: '#ffb7c5', textShadow: '0 0 10px rgba(255,183,197,0.5)' }}>
              Una pregunta para ti...
            </h2>
          </div>

          <div className="glass-body-scroll" style={{ textAlign: 'center' }}>
            
            {/* ФОТОГРАФИЯ */}
            <div className="proposal-photo-container">
              <img 
                src={photoSrc} 
                alt="Tú y yo" 
                className="proposal-photo" 
              />
            </div>

            {/* ТЕКСТ (Обновленный, более романтичный) */}
            <div className="proposal-text" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
              <p>
                Entre millones de estrellas y galaxias, tuve la inmensa suerte de coincidir contigo.
              </p>
              <p>
                Ya no quiero solo mirar el cielo o soñarte a la distancia. Quiero construir mi propio universo, <b>pero a tu lado</b>.
              </p>
              
              {/* ГЛАВНЫЙ ВОПРОС */}
              <div className="proposal-question" style={{ marginTop: '25px', fontSize: '1.4rem', color: '#fff', fontWeight: 'bold' }}>
                Pilar,<br/>
                ¿quieres ser mi novia?
              </div>
            </div>
          </div>

          {/* КНОПКИ (Только ДА) */}
          <div className="glass-footer" style={{ justifyContent: 'center', gap: '15px', paddingTop: '20px' }}>
            <button 
              type="button" 
              className="yes-btn" 
              onClick={onAccept}
            >
              ¡Sí, quiero! 💖
            </button>
            <button 
              type="button" 
              className="yes-btn yes-btn-secondary" 
              onClick={onAccept}
            >
              Claro que sí 🥰
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProposalModal;