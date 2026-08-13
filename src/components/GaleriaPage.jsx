import { useState, useEffect, useRef, useCallback } from 'react';
//import './galeria.css';

// ─────────────────────────────────────────────────────────────────────────────
//  CONFIGURACIÓN — reemplaza las fotos y ajusta los puntos de cada imagen
// ─────────────────────────────────────────────────────────────────────────────

import galeria1 from '../assets/galeria/galeria1.jpg';
import galeria2 from '../assets/galeria/galeria2.jpg';
import galeria3 from '../assets/galeria/galeria3.jpg';
import galeria4 from '../assets/galeria/galeria4.jpg';
import galeria5 from '../assets/galeria/galeria5.jpg';
import galeria6 from '../assets/galeria/galeria6.jpg';
import galeria7 from '../assets/galeria/galeria7.jpg';
import galeria8 from '../assets/galeria/galeria8.jpg';

// ВАЖНО: Добавлен импорт музыки! 
// Убедись, что путь и расширение (.mp3, .wav) совпадают с твоим файлом.
import cancion1 from '../assets/songs/cancion1.mp3'; 

const CANCIONES = [
  {
    nombre: 'Nuestra canción',
    artista: 'Solo para ti',
    src: cancion1,
  },
];

const OBRAS = [
  {
    id: 1,
    src: galeria1,
    titulo: 'La mirada que encontré',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'Hay miradas que simplemente se ven. La tuya se siente.',
    puntos: [
      {
        x: 50,
        y: 28,
        titulo: 'Sus ojos',
        texto:
          'De todos los lugares donde podría perderme, elegiría tus ojos una y otra vez. No porque sean perfectos, sino porque cuando me miran siento una tranquilidad que jamás había conocido. Son los ojos de la mujer de la que me enamoré.',
      },
      {
        x: 50,
        y: 52,
        titulo: 'Su dulzura',
        texto:
          'Hay una delicadeza en tu forma de mirar, de sonreír y de existir que hace que todo a tu alrededor parezca un poco más amable. Nunca dejes de ser esa mujer tan increíblemente femenina y auténtica.',
      },
    ],
  },

  {
    id: 2,
    src: galeria2,
    titulo: 'La luz que llevas dentro',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'Hay sonrisas que iluminan una habitación. La tuya ilumina personas.',
    puntos: [
      {
        x: 50,
        y: 42,
        titulo: 'Su sonrisa',
        texto:
          'Tu sonrisa tiene una capacidad extraña: consigue hacerme olvidar cualquier preocupación durante unos segundos. Es como si el mundo bajara el volumen y solo existiera la felicidad de verte sonreír.',
      },
      {
        x: 55,
        y: 28,
        titulo: 'Su alegría',
        texto:
          'Lo más bonito de tu sonrisa no son tus labios ni tus dientes. Es que siempre nace desde dentro. Es la prueba de que tu luz no depende de nadie; simplemente forma parte de quien eres.',
      },
    ],
  },

  {
    id: 3,
    src: galeria3,
    titulo: 'Espíritu libre',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'Hay personas que hacen que la vida parezca más viva.',
    puntos: [
      {
        x: 50,
        y: 38,
        titulo: 'Su energía',
        texto:
          'Cuando te veo así, con los brazos abiertos y sonriendo, recuerdo que la felicidad también puede tener una forma. Me encanta esa parte de ti que disfruta el momento sin miedo y convierte lo sencillo en algo inolvidable.',
      },
      {
        x: 50,
        y: 72,
        titulo: 'Su esencia',
        texto:
          'Nunca pierdas esa capacidad de maravillarte con las cosas pequeñas. Es una de las razones por las que el mundo se siente más bonito cuando lo comparto contigo.',
      },
    ],
  },

  {
    id: 4,
    src: galeria4,
    titulo: 'Elegancia',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'La elegancia nunca necesita llamar la atención.',
    puntos: [
      {
        x: 50,
        y: 28,
        titulo: 'Su elegancia',
        texto:
          'Hay mujeres que intentan parecer elegantes. Tú simplemente lo eres. No depende de la ropa ni del peinado; nace de la forma tranquila y segura con la que ocupas tu lugar en el mundo.',
      },
      {
        x: 50,
        y: 55,
        titulo: 'Quién eres',
        texto:
          'Lo que más admiro de ti es que nunca intentas convertirte en alguien distinto para impresionar a los demás. Tu autenticidad tiene mucho más valor que cualquier apariencia.',
      },
    ],
  },

  {
    id: 5,
    src: galeria5,
    titulo: 'Más fuerte de lo que crees',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'La verdadera fuerza casi siempre es silenciosa.',
    puntos: [
      {
        x: 60,
        y: 35,
        titulo: 'Su fuerza',
        texto:
          'Cada vez que dudas de ti, desearía que pudieras verte con mis ojos. Descubrirías a una mujer mucho más fuerte de lo que imagina. No solo por lo que puede hacer, sino por todo lo que ha sido capaz de superar.',
      },
      {
        x: 50,
        y: 70,
        titulo: 'Su valentía',
        texto:
          'Admiro tu capacidad de seguir adelante incluso cuando las cosas no son fáciles. No haces ruido, no buscas reconocimiento. Simplemente sigues avanzando. Y eso, para mí, es una de las formas más bonitas de valentía.',
      },
    ],
  },

  {
    id: 6,
    src: galeria6,
    titulo: 'Lo que ninguna cámara puede capturar',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'La obra más importante de toda esta galería.',
    puntos: [
        {
        x: 50,
        y: 22,
        titulo: 'Lo más hermoso',
        texto:
            'Lo más hermoso de ti nunca podrá capturarse por completo en una fotografía.\n\nNo es solo la simetría de tu rostro o tu belleza exterior.\n\nEs la paz genuina que compartimos en lo cotidiano.\nEs la complicidad absoluta que no necesita filtros.\nEs la certeza de saber que incluso aquellas pequeñas cosas de ti que a veces te hacen dudar de ti misma, yo las amo porque forman parte de la mujer de la que me enamoré.\n\nPor eso esta imagen una de mis favoritas.\nPorque aquí no hay posturas, ni expectativas, ni necesidad de impresionar a nadie.\n\nSimplemente eres tú.\n\nY tú eres muchísimo más que cualquier mirada superficial.',
        esSecreto: true,
        },
    ],
    },
  
  {
    id: 7,
    src: galeria7,
    titulo: 'Más bonita cuando no lo intenta',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'Hay una belleza especial en los momentos en los que simplemente eres tú.',
    puntos: [
      {
        x: 52,
        y: 36,
        titulo: 'Esa mirada',
        texto:
          'Me encanta esta foto porque aquí no estás intentando posar ni demostrar nada. Simplemente estás ahí, sonriendo, mirando hacia abajo, siendo tú. Y no sé cómo explicarlo, pero precisamente así es como me pareces más bonita. Hay algo en tu expresión que me transmite una ternura enorme y hace que quiera acercarme a ti y darte un beso.',
      },
      {
        x: 28,
        y: 54,
        titulo: 'Cuando simplemente eres tú',
        texto:
          'Creo que esta es una de esas fotos que me gustan precisamente porque no parece que estés intentando verte bonita. Estás simplemente disfrutando tu momento, con esa sonrisa tranquila y tu forma tan natural de ser. Y quizá por eso me gusta tanto. Porque no necesito que hagas nada especial para verte hermosa. Me gustas así, cuando simplemente eres tú.',
      },
    ],
  },
  {
    id: 8,
    src: galeria8,
    titulo: 'Mi niña buena',
    año: '2026',
    tecnica: 'Fotografía digital',
    descripcion: 'Hay algo irresistible en verte así, mi niña buena, tan dulce y tan obediente conmigo.',
    puntos: [
    {
    x: 52,
    y: 36,
    titulo: 'Esa sumisión',
    texto:
    'Hay algo en tu mirada que me encanta. Esa forma tuya de mirarme y escucharme cuando yo te doy órdenes, mi niña buena. Me gusta saber que confías en mí, que puedes relajarte conmigo y simplemente dejar que yo te guíe. Y sí, admito que verte así me parece increíblemente bonita.',
    },
    {
    x: 28,
    y: 54,
    titulo: 'Tu obediencia',
    texto:
    'Creo que una de las cosas que más me gustan de nuestra relación es esa parte de ti que solo aparece conmigo. Esa pequeña sonrisa cuando sabes que estás siendo mi niña buena, esa confianza y esa manera tan dulce de hacer lo que te pido. No se trata solo de obedecerme; me encanta saber que lo haces porque confías en mí y porque disfrutas de nuestra conexión. Y eso te hace todavía más especial para mí.',
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
// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE: Modal de cumplido
//  ESTRUCTURA CORREGIDA:
//  - .gl-modal ahora es solo el contenedor (no scrollea él mismo)
//  - .gl-modal-cerrar está FUERA del área de scroll → siempre visible
//  - .gl-modal-scroll es el único elemento que scrollea
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

        {/* Botón de cerrar — FUERA del área scrolleable, siempre visible */}
        <button className="gl-modal-cerrar" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Área scrolleable — todo el contenido va aquí dentro */}
        <div className="gl-modal-scroll">
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
      <div className="gl-marco-exterior">
        <div className="gl-marco-interior">
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

            {obra.puntos.map((punto, i) => (
              <PuntoInteractivo
                key={i}
                punto={punto}
                onOpen={onPuntoClick}
              />
            ))}

            <div className="gl-foto-velo" />
          </div>
        </div>

        <span className="gl-marco-esquina gl-marco-esquina--tl" />
        <span className="gl-marco-esquina gl-marco-esquina--tr" />
        <span className="gl-marco-esquina gl-marco-esquina--bl" />
        <span className="gl-marco-esquina gl-marco-esquina--br" />
      </div>

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
  const audioRef = useRef(null);
  
  // Берем первую песню из массива
  const cancionActual = CANCIONES[0];

  // Останавливаем музыку, если компонент размонтируется (например, при смене страницы)
  useEffect(() => {
    const audioElement = audioRef.current;
    return () => {
      if (audioElement) {
        audioElement.pause();
      }
    };
  }, []);

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setPlaying(true);
        })
        .catch((error) => {
          console.error("Error al reproducir el audio:", error);
        });
    }
  };

  return (
    <div className="gl-vinilo-wrap">
      {/* Скрытый HTML5 аудио элемент */}
      <audio ref={audioRef} src={cancionActual.src} loop />

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
        <div className="gl-vinilo-nombre">{cancionActual.nombre}</div>
        <div className="gl-vinilo-artista">{cancionActual.artista}</div>
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
          <em>amarte</em>
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