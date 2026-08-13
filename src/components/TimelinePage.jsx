import { useState } from 'react';

// ─────────────────────────────────────────────────────────────
//  НАСТРОЙ СВОИ МОМЕНТЫ ЗДЕСЬ
//  hasPhoto: true  →  укажи реальный импорт в поле photo
//  Для фото: import photo1 from '../assets/timeline/photo1.jpg'
//  и передай его в поле photo: photo1
// ─────────────────────────────────────────────────────────────

import peque1 from '../assets/peque.jpg'
import unmes from '../assets/unmes.jpg'
import futb from '../assets/futb.jpg'
import 2mes from '../assets/2mes.jpg'
import venjun from '../assets/venjun.jpg'
const MOMENTS = [
  {
    id: 0,
    icon: '✦',
    color: 'pink',
    date: '13 de abril de 2025',
    shortDate: '13 Abr 2025',
    title: 'Nuestro primer encuentro',
    body: 'El universo conspiró durante años para que dos personas llegaran al mismo punto al mismo tiempo. Ese día, sin saberlo, comenzó la historia más bonita de mi vida.',
    tags: ['primer encuentro', 'destino', 'amor'],
    photo: null,
  },
  {
    id: 1,
    icon: '♥',
    color: 'violet',
    date: '21 de abril de 2025',
    shortDate: '21 Abr 2025',
    title: 'Primera llamada',
    body: 'El día que escuché por primera vez tu magnífica voz. La voz que tanto amo ahora. Aquel momento pareció sencillo, pero sin saberlo se convirtió en uno de mis recuerdos favoritos. Desde entonces, cada llamada es una razón para sonreír y la prueba de que algunas voces tienen el poder de hacer sentir hogar incluso a kilómetros de distancia.',
    tags: ['primera llamada', 'somos'],
    photo: null,
  },
  {
    id: 2,
    icon: '★',
    color: 'rose',
    date: '4 de mayo de 2025',
    shortDate: '4 Mayo 2025',
    title: 'El día que elegimos un nombre para Hirosha',
    body: 'Sahura, Irosha, Ukiyo. Cual es mejor? Ahora lo sabemos, baby. Quizás en aquell momento solo era elegir un nombre, pero para mí fue uno de esos pequeños momentos que hacen especial una historia ahora. Fue una de las primeras veces que construimos algo juntos, compartiendo ideas, risas y creando un recuerdo que siempre me hará pensar en nosotros.',
    tags: ['El gato', 'amistad', 'nombre'],
    photo: peque1
  },
  {
    id: 3,
    icon: '♥',
    color: 'teal',
    date: '9 de noviembre de 2025',
    shortDate: '9 Nov 2025',
    title: 'Primer "te quiero"',
    body: 'Nuestro primer momento de decir "te quiero". Mucho tiempo ha pasado pero te amo tan fuerte como nunca. Nuestro primer momento de decir "te quiero". Mucho tiempo ha pasado, pero te amo tan fuerte como nunca. Recuerdo lo especial que fue escuchar esas palabras y sentir que todo lo que llevábamos construyendo tenía un nombre. Desde aquel día, cada "te quiero" ha tenido un significado diferente, porque ha crecido junto a nosotros, junto a cada recuerdo, y cada momento compartido.',
    tags: ['amor', 'palabras', 'recuerdos'],
    photo: null,
  },
  {
    id: 4,
    icon: '❋',
    color: 'gold',
    date: '8 de febrero de 2026',
    shortDate: '8 Feb 2026',
    title: '100 días juntos',
    body: 'Cien días que sumaron mil momentos. Cien días de buenos días y buenas noches. Cien días aprendiendo lo que es estar con alguien que te hace mejor persona.',
    tags: ['100 días', 'celebración', 'amor'],
    photo: null, // ← замени на: import photo from '../assets/timeline/photo2.jpg'
  },
  {
    id: 5,
    icon: '♥',
    color: 'gold',
    date: '19 de Mayo de 2026',
    shortDate: '19 Mayo 2026',
    title: '200 días juntos',
    body: 'Dicen que el tiempo vuela cuando eres feliz, y contigo lo he entendido de verdad. 200 días llenos de complicidad, cariño y recuerdos que guardo como un tesoro. Lo más bonito no es el tiempo que ha pasado, sino saber que cada día contigo sigue siendo mi lugar favorito. ✨❤️',
    tags: ['200 días', 'celebración', 'amor'],
    photo: null, // ← замени на: import photo from '../assets/timeline/photo2.jpg'
  },
  {
    id: 6,
    icon: '♥',
    color: 'gold',
    date: '13 de Mayo de 2026',
    shortDate: '13 Mayo 2026',
    title: '¿Quieres ser mi novia?',
    body: 'Hay días que cambian una vida entera, y para mí este fue uno de ellos. Con los nervios de quien está a punto de dar un paso importante y la ilusión de quien ya sabe lo que siente, te hice una pregunta sencilla, pero llena de significado: "¿Quieres ser mi novia?". Tu respuesta convirtió ese instante en uno de los recuerdos más bonitos de mi vida. Desde ese día comenzó oficialmente nuestra historia, una historia que sigue llenando mis días de felicidad, cariño y momentos inolvidables. ❤️✨',
    tags: ['novia', 'inicio', 'amor'],
    photo: null, // ← reemplaza con: import photo from '../assets/timeline/photo2.jpg'
  },
  {
    id: 7,
    icon: '♥',
    color: 'rose',
    date: '13 de Junio de 2026',
    shortDate: '13 Jun 2026',
    title: 'Un mes juntos',
    body: 'Un mes puede parecer poco para el mundo, pero para mí significó el comienzo de toda una vida contigo. Ese día vimos Your Name juntos, compartimos risas, miradas a través de una pantalla y una conexión que iba mucho más allá de la distancia. Entre la ternura, las palabras llenas de amor y la pasión que solo nosotros entendemos, descubrí una vez más que cada instante contigo es especial. Fue nuestro día, un recuerdo que siempre llevaré en el corazón. Te amo. ❤️',
    tags: ['1 mes', 'Your Name', 'videollamada', 'amor'],
    photo: unmes,
  },
  {
    id: 8,
    icon: '⚽',
    color: 'violet',
    date: '28 de junio de 2026',
    shortDate: '28 Jun 2026',
    title: 'Nuestro primer partido de fútbol',
    body: 'Nunca imaginé que ver un partido de fútbol contigo pudiera ser tan divertido. Entre comentarios, risas y la emoción de cada jugada, convertimos un simple partido en otro recuerdo bonito para guardar. Y cómo olvidar aquel gol de Colombia que anularon por una razón tan absurda que no pudimos evitar reírnos. Al final, lo mejor del partido no estuvo en el marcador, sino en haberlo vivido juntos. ❤️⚽',
    tags: ['fútbol', 'primer partido', 'Colombia', 'recuerdos'],
    photo: futb,
  },

  {
    id: 9,
    icon: '♥',
    color: 'rose',
    date: '13 de Julio de 2026',
    shortDate: '13 Jul 2026',
    title: 'Dos meses juntos',
    body: 'Dos meses pueden parecer poco para el mundo, pero para mí significan muchísimo. ❤️ Hemos compartido amor, risas, ternura y momentos que guardaré siempre en mi corazón. Y entre todos ellos, nunca olvidaré esa sorpresa inesperada que me diste, un detalle que hizo nuestro día aún más especial. Cada momento contigo me recuerda cuánto te amo y lo especial que eres para mí. Dos meses de nosotros, de amor y de seguir construyendo nuestra historia. Te amo muchísimo, mi amor. ❤️',
    tags: ['2 meses', 'momento especial', 'videollamada', 'amor'],
    photo: 2mes,
  },

  {
    id: 10,
    icon: '♥',
    color: 'rose',
    date: '18 de Julio de 2026',
    shortDate: '18 Jul 2026',
    title: 'Un momento nuestro',
    body: 'El 18 de julio tuvimos uno de esos momentos que simplemente se quedan contigo. ❤️ Hubo mucha confianza, deseo y esa conexión que siento contigo de una forma que no puedo explicar. Me encantó verte dejarte llevar, confiar en mí, obedecerme como mi beuna niña y disfrutar de ese momento juntos. Fue intenso, íntimo y muy nuestro, con esa mezcla de pasión y ternura que solo nosotros tenemos. Sin duda, es uno de esos recuerdos que voy a guardar con una sonrisa. Te amo, mi niña buena. ❤️',
    tags: ['momento íntimo', 'pasión', 'confianza', 'nosotros'],
    photo: venjun,
  },


  {
    id: 11,
    icon: '∞',
    color: 'gold-big',
    date: 'Hoy y siempre',
    shortDate: 'Hoy ∞',
    title: 'Nuestra historia continúa...',
    body: 'Esto no es el final de la línea del tiempo — es apenas el comienzo. Hay tantos capítulos por escribir, tantos lugares por descubrir, tantos momentos por vivir. Contigo, el tiempo es infinito. Porque al final, mi historia favorita siempre será aquella en la que apareces tú ❤️.',
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