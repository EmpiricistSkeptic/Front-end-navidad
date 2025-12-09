function LetterModal({ isOpen, text, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card letter-card">
        <h2 className="letter-title">Письмо звезды</h2>
        <div className="letter-body">
          {text.split('\n').map((line, index) =>
            line.trim() === '' ? (
              <br key={index} />
            ) : (
              <p key={index}>{line}</p>
            )
          )}
        </div>
        <button className="letter-close-button" onClick={onClose}>
          Вернуться к звёздам
        </button>
      </div>
    </div>
  );
}

export default LetterModal;
