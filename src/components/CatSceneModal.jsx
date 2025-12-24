import React, { useEffect, useState } from 'react';
import storyService from '../services/story.service';

// 1. ИМПОРТИРУЕМ КАРТИНКУ
// Убедитесь, что путь правильный относительно этого файла
import myCatImage from '../assets/gato2.png'; 

function CatSceneModal({ isOpen, onSceneCompleted }) {
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchDialogue = async () => {
      setLoading(true);
      setError(null);
      try {
        const initialNode = await storyService.getTodayDialogue();
        setCurrentNode(initialNode);
      } catch (err) {
        setError(err.message || 'No se pudo cargar el diálogo');
      } finally {
        setLoading(false);
      }
    };

    fetchDialogue();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOptionClick = async (option) => {
    setLoading(true);
    try {
      const resp = await storyService.sendAnswer(currentNode.id, option.id);
      if (resp.end) {
        onSceneCompleted(currentNode.day_index); 
      } else if (resp.node) {
        setCurrentNode(resp.node);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error de conexión.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !currentNode) {
    return (
      <div className="mystic-overlay">
        <div className="mystic-spinner">
          <div className="spinner-circle"></div>
          <p>Conectando con el destino...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mystic-overlay">
        <div className="mystic-card error-mode">
          <h3>Algo salió mal</h3>
          <p>{error}</p>
          <button onClick={() => onSceneCompleted(null)} className="mystic-btn close-btn">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  if (!currentNode) return null;

  const isSystem = currentNode.speaker === 'system';

  return (
    <div className="mystic-overlay">
      <div className="mystic-card">
        
        {/* ЛЕВАЯ КОЛОНКА: Изображение */}
        <div 
          className="mystic-image-col" 
          /* 2. ИСПОЛЬЗУЕМ ПЕРЕМЕННУЮ ИМПОРТА */
          style={{ backgroundImage: `url(${myCatImage})` }}
        >
          <div className="image-overlay-gradient"></div>
          <div className="day-badge">
            <span>Día {currentNode.day_index}</span>
          </div>
        </div>

        {/* ПРАВАЯ КОЛОНКА */}
        <div className="mystic-content-col">
          <div className="content-header">
            <span className="speaker-label">
              {isSystem ? '✧ La Voz Estelar' : 'Gato Guardián'}
            </span>
          </div>

          <div className="dialogue-scroll-area">
            <div className={`dialogue-text ${isSystem ? 'system-text' : ''}`}>
              {currentNode.text.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>

          <div className="options-container">
            {currentNode.options && currentNode.options.length > 0 ? (
              currentNode.options.map((option) => (
                <button
                  key={option.id}
                  className="mystic-choice-btn"
                  onClick={() => handleOptionClick(option)}
                  disabled={loading}
                >
                  <span className="choice-marker">✦</span>
                  <span className="choice-text">{option.text}</span>
                </button>
              ))
            ) : (
              <div className="loading-dots">...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatSceneModal;