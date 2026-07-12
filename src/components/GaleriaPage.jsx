import { useState, useEffect, useRef, useCallback } from 'react';
import './galeria.css';

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN — reemplaza las fotos y ajusta los puntos de cada imagen
// ─────────────────────────────────────────────────────────────────────────────

// Importa tus fotos así:
// import foto1 from '../assets/galeria/foto1.jpg';
// import foto2 from '../assets/galeria/foto2.jpg';
// ... etc
// Luego ponlas en el campo `src` de cada obra abajo.

const OBRAS = [
  {
    id: 1,
    src: null, // ← import foto1 from '...'
    titulo: 'Primera luz',
    año: '2024',
    tecnica: 'Fotografía digital',
    descripcion: 'El momento en que todo comenzó.',
    puntos: [
      {
        x: 50, y: 28,
        titulo: 'Sus ojos',
        texto: 'Cuando miro tus ojos no veo simplemente un color hermoso. Veo el lugar al que quiero volver siempre. Veo paz. Veo a la persona con la que quiero despertar cada mañana.',
      },
      {
        x: 52, y: 48,
        titulo: 'Su sonrisa',
        texto: 'Tu sonrisa no es solo una expresión. Es el instante exacto en que el mundo deja de moverse y yo entiendo por qué estoy aquí.',
      },
    ],
  },
  {
    id: 2,
    src: null,
    titulo: 'Luz de tarde',
    año: '2024',
    tecnica: 'Fotografía digital',
    descripcion: 'La luz siempre te encuentra a ti primero.',
    puntos: [
      {
        x: 45, y: 22,
        titulo: 'Su cabello',
        texto: 'Hay algo en la forma en que el viento mueve tu cabello que me hace querer detener el tiempo. Como si el universo quisiera mostrarte que eres parte de algo poético.',
      },
      {
        x: 55, y: 60,
        titulo: 'Sus manos',
        texto: 'Tus manos son las más honestas que he conocido. Cuando me las das, siento que me estás diciendo algo que las palabras nunca podrían terminar de decir.',
      },
    ],
  },
  {
    id: 3,
    src: null,
    titulo: 'Instante eterno',
    año: '2024',
    tecnica: 'Fotografía digital',
    descripcion: 'Algunos momentos duran para siempre.',
    puntos: [
      {
        x: 50, y: 35,
        titulo: 'Su presencia',
        texto: 'No necesitas hacer nada especial. Tu presencia sola cambia la temperatura de cada habitación en la que entras. Hay personas que iluminan un espacio y luego estás tú, que lo transformas.',
      },
      {
        x: 48, y: 65,
        titulo: 'Su esencia',
        texto: 'Hay algo en ti que no tiene nombre. No es solo la belleza. Es una combinación de fuerza y ternura que me hace sentir que estar cerca de ti es un privilegio.',
      },
    ],
  },
  {
    id: 4,
    src: null,
    titulo: 'Serenidad',
    año: '2024',
    tecnica: 'Fotografía digital',
    descripcion: 'La calma que traes al caos.',
    puntos: [
      {
        x: 50, y: 30,
        titulo: 'Su rostro',
        texto: 'Memoricé tu rostro no como se memoriza algo hermoso, sino como se aprende el camino a casa. Sin esfuerzo. Con la certeza de que es el lugar al que pertenezco.',
      },
      {
        x: 50, y: 55,
        titulo: 'Su corazón',
        texto: 'Tienes un corazón que da sin llevar la cuenta. Que quiere sin pedir permiso. Que siente con una intensidad que me enseñó que yo también podía sentir así.',
      },
    ],
  },
  {
    id: 5,
    src: null,
    titulo: 'Fuerza suave',
    año: '2024',
    tecnica: 'Fotografía digital',
    descripcion: 'La belleza que no necesita demostrarse.',
    puntos: [
      {
        x: 50, y: 25,
        titulo: 'Su mirada',
        texto: 'Cuando me miras, no me siento observado. Me siento visto. Hay una diferencia enorme entre las dos cosas, y tú eres de las pocas personas que saben la diferencia.',
      },
      {
        x: 50, y: 70,
        titulo: 'Su valentía',
        texto: 'Lo que más admiro de ti no aparece en ninguna fotografía. Es la forma en que enfrentas lo que te asusta. Callada, sin fanfarria, con una dignidad que me deja sin palabras.',
      },
    ],
  },
  {
    id: 6,
    src: null,
    titulo: 'Lo que no se ve',
    año: '2024',
    tecnica: 'Fotografía digital',
    descripcion: 'La obra más importante de esta galería.',
    puntos: [
      {
        x: 50, y: 20,
        titulo: 'Lo más hermoso',
        texto: 'Lo más hermoso de ti no puede ser capturado en ninguna fotografía.\n\nEs la forma en que me haces sentir cuando estoy contigo.\nEs la persona que me vuelvo cuando te tengo cerca.\n\nPor eso ninguna imagen de esta galería podrá mostrarte completamente a ti.\nPorque tú eres más que lo que cualquier lente puede contener.',
        esSecreto: true,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Punto interactivo sobre la foto
// ─────────────────────────────────────────────────────────────────────────────
function PuntoInteractivo({ punto, onOpen }) {
  return (
    <button
      className={`gl-punto ${punto.esSecreto ? 'gl-punto--secreto' : ''}`}
      style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
      onClick={() => onOpen(punto)}
      aria-label={punto.titulo}
    >
      <span className="gl-punto-anillo" />
      <span className="gl-punto-nucleo" />
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Modal de cumplido
// ─────────────────────────────────────────────────────────────────────────────
function ModalCumplido({ punto, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!punto) return null;

  return (
    <div className="gl-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`gl-modal ${punto.esSecreto ? 'gl-modal--secreto' : ''}`}>
        <button className="gl-modal-cerrar" onClick={onClose} aria-label="Cerrar">✕</button>

        {punto.esSecreto && (
          <div className="gl-modal-corona">✦</div>
        )}

        <div className="gl-modal-titulo">{punto.titulo}</div>

        <div className="gl-modal-separador">
          <span className="gl-modal-sep-linea" />
          <span className="gl-modal-sep-rombo">◆</span>
          <span className="gl-modal-sep-linea" />
        </div>

        <p className="gl-modal-texto">
          {punto.texto.split('\n').map((line, i) =>
            line === '' ? <br key={i} /> : <span key={i}>{line}<br /></span>
          )}
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Marco de una obra
// ─────────────────────────────────────────────────────────────────────────────
function ObraDeArte({ obra, onPuntoClick, index }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const PLACEHOLDER_COLORS = [
    '#0d1520', '#0f1a18', '#150d1a', '#0a1520', '#131510', '#0d1015',
  ];

  return (
    <article
      ref={ref}
      className={`gl-obra ${visible ? 'gl-obra--visible' : ''}`}
      style={{ transitionDelay: `${index * 0.08}s` }}
    >
      {/* Marco exterior */}
      <div className="gl-marco-exterior">
        <div className="gl-marco-interior">

          {/* Foto o placeholder */}
          <div className="gl-foto-wrap">
            {obra.src ? (
              <img src={obra.src} alt={obra.titulo} className="gl-foto" draggable={false} />
            ) : (
              <div
                className="gl-foto-placeholder"
                style={{ background: PLACEHOLDER_COLORS[index % PLACEHOLDER_COLORS.length] }}
              >
                <span className="gl-foto-placeholder-icon">✦</span>
                <span className="gl-foto-placeholder-text">Añade tu foto aquí</span>
              </div>
            )}

            {/* Puntos interactivos */}
            {obra.puntos.map((punto, i) => (
              <PuntoInteractivo
                key={i}
                punto={punto}
                onOpen={onPuntoClick}
              />
            ))}

            {/* Velo sutil */}
            <div className="gl-foto-velo" />
          </div>

        </div>

        {/* Esquinas decorativas del marco */}
        <span className="gl-marco-esquina gl-marco-esquina--tl" />
        <span className="gl-marco-esquina gl-marco-esquina--tr" />
        <span className="gl-marco-esquina gl-marco-esquina--bl" />
        <span className="gl-marco-esquina gl-marco-esquina--br" />
      </div>

      {/* Etiqueta de museo */}
      <div className="gl-etiqueta">
        <div className="gl-etiqueta-titulo">{obra.titulo}</div>
        <div className="gl-etiqueta-meta">
          <span>{obra.año}</span>
          <span className="gl-etiqueta-sep">·</span>
          <span>{obra.tecnica}</span>
        </div>
        <div className="gl-etiqueta-desc">{obra.descripcion}</div>
      </div>
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Reproductor de vinilo
// ─────────────────────────────────────────────────────────────────────────────
function VinylPlayer() {
  const [playing, setPlaying] = useState(false);
  const [cancion] = useState('Nuestra canción');
  const audioRef = useRef(null);

  // Para usar audio real:
  // const audioRef = useRef(new Audio('/assets/nuestra-cancion.mp3'));
  // audioRef.current.loop = true;

  const toggle = () => {
    setPlaying(p => !p);
    // Si tienes audio real:
    // if (playing) audioRef.current.pause();
    // else audioRef.current.play();
  };

  return (
    <div className="gl-vinilo-wrap">
      <div className={`gl-vinilo ${playing ? 'gl-vinilo--girando' : ''}`}>
        <div className="gl-vinilo-disco">
          <div className="gl-vinilo-surco gl-vinilo-surco--1" />
          <div className="gl-vinilo-surco gl-vinilo-surco--2" />
          <div className="gl-vinilo-surco gl-vinilo-surco--3" />
          <div className="gl-vinilo-centro">
            <div className="gl-vinilo-label">
              <span className="gl-vinilo-nota">♪</span>
            </div>
          </div>
        </div>
        <div className="gl-vinilo-aguja" />
      </div>

      <div className="gl-vinilo-info">
        <div className="gl-vinilo-nombre">{cancion}</div>
        <div className="gl-vinilo-artista">Solo para ti</div>
      </div>

      <button className="gl-vinilo-btn" onClick={toggle}>
        {playing ? (
          <>
            <span className="gl-vinilo-btn-icon">⏸</span>
            Pausar
          </>
        ) : (
          <>
            <span className="gl-vinilo-btn-icon">▶</span>
            Reproducir nuestra canción
          </>
        )}
      </button>

      {/* Partículas musicales */}
      {playing && (
        <div className="gl-particulas" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="gl-particula"
              style={{
                '--i': i,
                '--x': `${-20 + Math.random() * 40}px`,
              }}
            >
              {['♪', '♫', '♩', '♬'][i % 4]}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Partículas doradas de fondo
// ─────────────────────────────────────────────────────────────────────────────
function ParticulasDoradas() {
  const particulas = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 10,
    size: 1 + Math.random() * 2,
  }));

  return (
    <div className="gl-particulas-fondo" aria-hidden="true">
      {particulas.map(p => (
        <div
          key={p.id}
          className="gl-polvo"
          style={{
            left: `${p.left}%`,
            '--dur': `${p.duration}s`,
            '--delay': `${p.delay}s`,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────
function GaleriaPage({ onBack }) {
  const [puntoActivo, setPuntoActivo] = useState(null);

  const handlePuntoClick = useCallback((punto) => {
    setPuntoActivo(punto);
  }, []);

  const handleCerrar = useCallback(() => {
    setPuntoActivo(null);
  }, []);

  return (
    <div className="gl-root">
      <ParticulasDoradas />

      {/* Botón volver */}
      {onBack && (
        <button className="gl-btn-volver" onClick={onBack}>
          ← Volver
        </button>
      )}

      {/* ── Introducción ──────────────────────────────────────── */}
      <header className="gl-intro">
        <div className="gl-intro-ornamento">✦ ✦ ✦</div>
        <div className="gl-intro-eyebrow">Galería de mi musa</div>
        <h1 className="gl-intro-titulo">
          El arte de
          <br />
          <em>quererte</em>
        </h1>
        <div className="gl-intro-separador">
          <span /><span className="gl-intro-rombo">◆</span><span />
        </div>
        <p className="gl-intro-texto">
          A lo largo de la historia, las personas intentaron preservar
          la belleza de quienes las inspiraron.
          <br /><br />
          Los pintores usaron pinceles.
          Los poetas usaron palabras.
          Los músicos usaron melodías.
          <br /><br />
          Yo escribo código.
          <br /><br />
          Esta galería es mi forma de retratar a la mujer que me inspira.
        </p>
        <div className="gl-intro-nota">
          Toca los puntos dorados para descubrir lo que siento
        </div>
      </header>

      {/* ── Galería ───────────────────────────────────────────── */}
      <main className="gl-galeria">
        {OBRAS.map((obra, i) => (
          <ObraDeArte
            key={obra.id}
            obra={obra}
            index={i}
            onPuntoClick={handlePuntoClick}
          />
        ))}
      </main>

      {/* ── Sección vinilo ────────────────────────────────────── */}
      <section className="gl-seccion-vinilo">
        <div className="gl-seccion-vinilo-titulo">
          <span className="gl-seccion-vinilo-ornamento">♪</span>
          Nuestra banda sonora
        </div>
        <VinylPlayer />
      </section>

      {/* ── Pie de galería ────────────────────────────────────── */}
      <footer className="gl-footer">
        <div className="gl-footer-ornamento">✦</div>
        <p className="gl-footer-texto">
          Creado con amor.
          <br />
          Para ti. Solo para ti.
        </p>
        <div className="gl-footer-linea" />
      </footer>

      {/* ── Modal de cumplido ─────────────────────────────────── */}
      <ModalCumplido punto={puntoActivo} onClose={handleCerrar} />
    </div>
  );
}

export default GaleriaPage;