import React, { useEffect, useState } from 'react';
import storyService from '../services/story.service';

function CatSceneModal({ isOpen, onSceneCompleted }) {
  // Храним ТЕКУЩИЙ узел целиком, а не карту узлов
  const [currentNode, setCurrentNode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    const fetchDialogue = async () => {
      setLoading(true);
      setError(null);
      try {
        // Бэкенд возвращает ОДИН объект DialogueNodeSerializer
        // { id, text, speaker, options: [], ... }
        const initialNode = await storyService.getTodayDialogue();
        setCurrentNode(initialNode);
      } catch (err) {
        // Если бэк вернет 404 (сцена не готова)
        setError(err.message || 'No se pudo cargar el diálogo');
      } finally {
        setLoading(false);
      }
    };

    fetchDialogue();
  }, [isOpen]);

  if (!isOpen) return null;

  // Обработка клика по ответу
  const handleOptionClick = async (option) => {
    setLoading(true);
    try {
      // Шлем ответ на сервер
      const resp = await storyService.sendAnswer(currentNode.id, option.id);

      // Бэкенд возвращает: { end: boolean, node: DialogueNodeSerializer }
      if (resp.end) {
        onSceneCompleted(); // Закрываем модалку, сцена пройдена
      } else if (resp.node) {
        // Сервер прислал следующий шаг диалога — просто обновляем стейт
        setCurrentNode(resp.node);
      }
    } catch (err) {
      console.error('Error enviando la respuesta:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- Рендер ---

  if (loading && !currentNode) {
    return (
      <div className="modal-overlay scene-overlay">
        <div className="modal-card scene-card">
          <p>Buscando al gato...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="modal-overlay scene-overlay">
        <div className="modal-card scene-card">
          <p className="error-text">{error}</p>
          <button onClick={onSceneCompleted} className="scene-option-button" style={{marginTop: 20}}>
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  if (!currentNode) return null;

  // Определяем стили в зависимости от спикера
  // (В модели: "cat", "user", "system")
  const isSystem = currentNode.speaker === 'system';
  const isCat = currentNode.speaker === 'cat';

  return (
    <div className="modal-overlay scene-overlay">
      <div className="modal-card scene-card">
        {/* ЛЕВАЯ ЧАСТЬ: Картинка */}
        <div className="scene-visual-area">
          <div className="scene-moon"></div>
          <div className="snow-container">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="snowflake">❄</div>
            ))}
          </div>
          <div className="scene-cat-wrapper">
            <div className="scene-cat" style={{ fontSize: '4rem' }}>
                {isCat ? '🐈‍⬛' : (isSystem ? '✨' : '👤')}
            </div>
          </div>
          <div className="scene-location-hint">
            <span>
                {isCat ? 'Gato Consejero' : (isSystem ? 'La Noche' : 'Tú')}
            </span>
          </div>
        </div>

        {/* ПРАВАЯ ЧАСТЬ: Текст и кнопки */}
        <div className="scene-content-area">
          <div className="scene-header">
            <span className="scene-title">Escena {currentNode.day_index}</span>
          </div>

          {/* Сам текст диалога */}
          <div className={`scene-text-box ${isSystem ? 'italic text-center' : ''}`}>
            <p>{currentNode.text}</p>
          </div>

          <div className="scene-options">
            {currentNode.options && currentNode.options.map((option) => (
              <button
                key={option.id}
                className="scene-option-button"
                onClick={() => handleOptionClick(option)}
                disabled={loading}
              >
                <span className="btn-icon">➤</span>
                {option.text}
              </button>
            ))}
            
            {/* Если вариантов нет и это не конец (на всякий случай) */}
            {(!currentNode.options || currentNode.options.length === 0) && (
                 <div style={{textAlign:'center', color: '#999', fontSize:'0.8rem'}}>
                    ...
                 </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatSceneModal;