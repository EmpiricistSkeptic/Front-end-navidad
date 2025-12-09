import { useEffect, useState } from 'react';

function CatSceneModal({ isOpen, dialogue, onSceneCompleted }) {
  const { startNodeId, nodes } = dialogue;
  const [currentNodeId, setCurrentNodeId] = useState(startNodeId);

  useEffect(() => {
    if (isOpen) {
      setCurrentNodeId(startNodeId);
    }
  }, [isOpen, startNodeId]);

  if (!isOpen) return null;

  const currentNode = nodes[currentNodeId];

  const handleOptionClick = (option) => {
    if (option.endsScene) {
      onSceneCompleted();
      return;
    }

    if (option.nextId && nodes[option.nextId]) {
      setCurrentNodeId(option.nextId);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card scene-card">
        <div className="scene-cat-area">
          {/* Пока просто эмодзи, потом можно заменить на <img src="..." /> */}
          <div className="scene-cat">🐈‍⬛</div>
          <div className="scene-background-hint">
            Комната у окна, за стеклом падает снег…
          </div>
        </div>

        <div className="scene-dialogue">
          <div className="scene-text">{currentNode.text}</div>
          <div className="scene-options">
            {currentNode.options.map((option) => (
              <button
                key={option.id}
                className="scene-option-button"
                onClick={() => handleOptionClick(option)}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatSceneModal;
