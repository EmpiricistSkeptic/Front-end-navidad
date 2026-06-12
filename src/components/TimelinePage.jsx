import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
//  НАСТРОЙ СВОИ МОМЕНТЫ ЗДЕСЬ
//  hasPhoto: true  →  укажи реальный импорт в поле photo
//  Для фото: import photo1 from '../assets/timeline/photo1.jpg'
//  и передай его в поле photo: photo1
// ─────────────────────────────────────────────────────────────
const MOMENTS = [
  {
    id: 0,
    icon: '✦',
    color: 'pink',
    date: '14 de febrero de 2024',
    shortDate: '14 Feb 2024',
    title: 'Nuestro primer encuentro',
    body: 'El universo conspiró durante años para que dos personas llegaran al mismo punto al mismo tiempo. Ese día, sin saberlo, comenzó la historia más bonita de mi vida.',
    tags: ['primer encuentro', 'destino', 'amor'],
    photo: null,
  },
  {
    id: 1,
    icon: '♥',
    color: 'violet',
    date: '20 de febrero de 2024',
    shortDate: '20 Feb 2024',
    title: 'Primera cita',
    body: 'Nervios, sonrisas y silencios cómodos. El tiempo voló de una manera que nunca había sentido. Cuando nos despedimos esa noche, ya sabía que quería verte siempre.',
    tags: ['primera cita', 'mariposas', 'felicidad'],
    photo: null,
  },
  {
    id: 2,
    icon: '★',
    color: 'rose',
    date: '1 de marzo de 2024',
    shortDate: '1 Mar 2024',
    title: 'El primer «te quiero»',
    body: 'Tres palabras simples que lo cambiaron todo. El corazón latiendo a mil, la voz temblando un poco, y tus ojos brillando cuando respondiste. Ese momento vive en mí para siempre.',
    tags: ['amor', 'confesión', 'emoción'],
    photo: null, // ← замени на: import photo from '../assets/timeline/photo1.jpg'
  },
  {
    id: 3,
    icon: '✈',
    color: 'teal',
    date: '15 de marzo de 2024',
    shortDate: '15 Mar 2024',
    title: 'Primer viaje juntos',
    body: 'Descubrimos que viajar juntos es una de las formas más honestas de conocerse. Te vi reír, asombrarte, cansarte y volver a reír. Me enamoré de nuevo en cada parada.',
    tags: ['viaje', 'aventura', 'recuerdos'],
    photo: null,
  },
  {
    id: 4,
    icon: '❋',
    color: 'gold',
    date: '1 de junio de 2024',
    shortDate: '1 Jun 2024',
    title: '100 días juntos',
    body: 'Cien días que sumaron mil momentos. Cien días de buenos días y buenas noches. Cien días aprendiendo lo que es estar con alguien que te hace mejor persona.',
    tags: ['100 días', 'celebración', 'amor'],
    photo: null, // ← замени на: import photo from '../assets/timeline/photo2.jpg'
  },
  {
    id: 5,
    icon: '∞',
    color: 'gold-big',
    date: 'Hoy y siempre',
    shortDate: 'Hoy ∞',
    title: 'Nuestra historia continúa...',
    body: 'Esto no es el final de la línea del tiempo — es apenas el comienzo. Hay tantos capítulos por escribir, tantos lugares por descubrir, tantos momentos por vivir. Contigo, el tiempo es infinito.',
    tags: ['siempre', 'futuro', 'nosotros'],
    photo: null,
  },
];

// ── Звёздное небо (статичный фон) ──────────────────────────────
function StarField() {
  const stars = Array.from({ length: 130 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    left: Math.random() * 100,
    top: Math.random() * 100,
    duration: 2 + Math.random() * 4,
    delay: -(Math.random() * 4),
    minOp: 0.1 + Math.random() * 0.2,
    maxOp: 0.5 + Math.random() * 0.5,
  }));

  return (
    <div className="tl-stars">
      {stars.map(s => (
        <div
          key={s.id}
          className="tl-star"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            '--dur': `${s.duration}s`,
            '--delay': `${s.delay}s`,
            '--min': s.minOp,
            '--max': s.maxOp,
          }}
        />
      ))}
    </div>
  );
}

// ── Модальное окно ─────────────────────────────────────────────
function MomentModal({ moment, onClose }) {
  if (!moment) return null;

  return (
    <div className="tl-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="tl-modal">
        <button className="tl-modal-close" onClick={onClose}>✕</button>

        <div className="tl-modal-icon">{moment.icon}</div>
        <div className="tl-modal-date">{moment.date}</div>
        <div className="tl-modal-title">{moment.title}</div>

        {moment.photo && (
          <img src={moment.photo} alt={moment.title} className="tl-modal-photo" />
        )}

        <p className="tl-modal-body">{moment.body}</p>

        <div className="tl-modal-tags">
          {moment.tags.map(tag => (
            <span key={tag} className="tl-modal-tag">#{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Точка на оси ───────────────────────────────────────────────
function TimelineNode({ moment, onClick }) {
  const isBig = moment.color === 'gold-big';
  return (
    <div className="tl-node-wrap" onClick={onClick}>
      <div className={`tl-node-ring ${isBig ? 'tl-node-ring--big' : ''}`}>
        <div className={`tl-node-core tl-node-core--${moment.color}`}>
          {moment.icon}
        </div>
      </div>
    </div>
  );
}

// ── Карточка события ───────────────────────────────────────────
function TimelineCard({ moment, side, onClick }) {
  return (
    <div
      className={`tl-card tl-card--${side}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
    >
      <div className="tl-card-date">{moment.shortDate}</div>
      <div className="tl-card-title">{moment.title}</div>
      <div className="tl-card-desc">{moment.body.slice(0, 80)}…</div>
      {moment.photo && (
        <img src={moment.photo} alt={moment.title} className="tl-card-photo" />
      )}
    </div>
  );
}

// ── Главный компонент ──────────────────────────────────────────
function TimelinePage({ onBack }) {
  const [active, setActive] = useState(null);

  return (
    <div className="tl-root">
      <StarField />

      {/* Кнопка назад */}
      <button className="tl-back-btn" onClick={onBack}>
        ← Volver
      </button>

      {/* Заголовок */}
      <header className="tl-header">
        <div className="tl-eyebrow">Nuestra historia</div>
        <h1 className="tl-title">
          La línea del <span>tiempo</span>
        </h1>
        <p className="tl-subtitle">cada momento que nos unió</p>
      </header>

      {/* Сцена с осью */}
      <div className="tl-scene">
        <div className="tl-axis-glow" />
        <div className="tl-axis" />

        {MOMENTS.map((moment, i) => {
          const side = i % 2 === 0 ? 'left' : 'right';
          return (
            <div key={moment.id} className={`tl-row tl-row--${side}`}>
              {side === 'left' && (
                <TimelineCard moment={moment} side="left" onClick={() => setActive(moment)} />
              )}
              <TimelineNode moment={moment} onClick={() => setActive(moment)} />
              {side === 'right' && (
                <TimelineCard moment={moment} side="right" onClick={() => setActive(moment)} />
              )}
            </div>
          );
        })}
      </div>

      {/* Нижний конец */}
      <div className="tl-footer">
        <div className="tl-footer-line" />
        <div className="tl-footer-badge">lo mejor está por venir ✦</div>
      </div>

      {/* Модальное окно */}
      <MomentModal moment={active} onClose={() => setActive(null)} />
    </div>
  );
}

export default TimelinePage;