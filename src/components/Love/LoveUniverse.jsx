import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import UniverseIntro from './UniverseIntro.jsx';
import SpaceFlight from './SpaceFlight.jsx';
import './LoveUniverse.css';

/* =========================================================
   PHRASES DATA
   ========================================================= */

const CORE_PHRASES = [
  'Te amo',
  'Eres mi hogar',
  'Mi persona favorita',
  'Mi corazón te pertenece',
  'Para всегда',
  'Tú eres mi infinito ∞',
];

const ROMANTIC_PHRASES = [
  'Te amo un montón 💖',
  'Amor sin límites 💜',
  'Para siempre ⏳',
  'Hasta las estrellas y más allá 🚀',
  'Conexión del alma 🔗',
  'Mi refugio perfecto 🕊️',
  'Un universo juntos 🌌',
  'Tú y yo contra el mundo 🌎',
  'Mi sueño hecho realidad 🌙',
  'Contigo todo es mejor ✨',
  'Cada día te elijo a ti 📅',
  'Mi corazón te pertenece ❤️',
  'Eres mi lugar favorito 🏠',
  'Brillas más que cualquier estrella ⭐',
  'Mi presente y mi futuro ⏳',
  'Mi felicidad tiene tu nombre 💖',
  'Mi razón de ser ⭐',
  'Eres todo para mí 🌹',
  'Magia en cada instante 🌟',
  'Para toda la eternidad ♾️',
  'Mi otra mitad 💫',
  'Eres mi persona favorita 🎯',
  'Mi hogar eres tú 🏡',
  'Contigo el tiempo vuela ⏱️',
  'Eres mi calma 🌊',
  'Mi mejor decisión 💎',
  'Me completas 🧩',
  'Siempre juntos, pase lo que pase 🤝',
  'Eres mi paz 🕊️',
  'Contigo, siempre es sí 💌',
  'Mi milagro cotidiano ✨',
  'Gracias por existir 🙏',
  'Eres mi persona 💗',
  'El amor de mi vida 💍',

  // 💖 Pertenencia
  'Soy tuyo, hoy y siempre ❤️',
  'Eres mía, hoy y siempre 💕',
  'Mi corazón es tuyo ❤️',
  'Tu corazón es mi hogar 🏡',
  'Tú eres mi amor y yo soy tuyo 💘',
  'Siempre seré tuyo 💖',
  'Siempre serás mía 💜',
  'Mi corazón te eligió a ti 💓',
  'Tú tienes mi corazón 🔐❤️',
  'Mi corazón lleva tu nombre 💌',
  'Mi alma te reconoce ✨',
  'Eres parte de mí 🫶',
  'Una parte de mí vive en ti 💗',
  'Tú eres de mi corazón ❤️',
  'Mi lugar siempre será a tu lado 🌙',

  // 🌹 Más íntimas y románticas
  'Solo tú y nadie más 💕',
  'Te elegiría una y otra vez ♾️',
  'Si volviera a empezar, te elegiría a ti 💖',
  'No quiero un mundo sin ti 🌎❤️',
  'Quiero vivir mil vidas contigo 🌌',
  'En esta vida, te encontré a ti ✨',
  'Mi destino favorito eres tú 🌙',
  'Tú haces que todo tenga sentido 💫',
  'Mi corazón sonríe por ti 😊❤️',
  'Donde estés tú, quiero estar yo 🫶',
  'Mi lugar favorito es contigo 🏡',
  'Tu amor es mi lugar seguro 🕊️',
  'En tus brazos está mi hogar 🤍',
  'Quiero todos mis mañanas contigo 🌅',
  'Quiero envejecer contigo 🥹❤️',
  'Tú eres mi siempre ♾️',
  'Eres mi ahora y mi siempre 💖',
  'Mi para siempre comienza contigo ⏳',
  'No hay distancia para lo que siento por ti 🌎❤️',
  'Ni las estrellas nos separan ✨',
  'Nuestro amor no conoce distancias 🌌',
  'Dos corazones, un universo 💞',
  'Dos almas, un mismo destino 🔗',
  'Nuestro pequeño infinito ♾️',
  'Tú y yo, sin final 🌙',

  // 💌 Muy personales
  'Te quiero en todos mis días 📅❤️',
  'Quiero despertar a tu lado 🌅',
  'Quiero dormir pensando en ti 🌙',
  'Quiero hacer recuerdos contigo 📸💕',
  'Quiero llenar mi vida de nosotros 💖',
  'Quiero que seas mi historia favorita 📖',
  'Eres mi capítulo favorito 📖❤️',
  'Nuestra historia apenas comienza ✨',
  'Todavía nos quedan miles de momentos juntos 💕',
  'Quiero descubrir el mundo contigo 🌎',
  'Quiero perderme contigo y encontrarnos juntos 🌌',
  'Contigo quiero todo 💍',
  'Contigo quiero una vida entera ❤️',
  'Mi futuro tiene tu sonrisa 😊',
  'Mi vida es más bonita contigo 🌹',
  'Tú haces bonito mi mundo 🌎✨',
  'Gracias por ser mi amor 💗',
  'Gracias por elegirme 🥹❤️',
  'Qué suerte tenerte 🍀💕',
  'Qué suerte encontrarte en esta vida ✨',

  // 🌌 Для атмосферы галактики
  'Eres mi estrella favorita ⭐❤️',
  'Entre millones de estrellas, te elegiría a ti 🌟',
  'Mi universo empieza contigo 🌌',
  'Tú eres el centro de mi universo 💫',
  'Nuestro amor es infinito ♾️',
  'Ni todo el universo sería suficiente para amarte 🌌❤️',
  'Te buscaría en cualquier universo 🌠',
  'En cualquier vida, te encontraría 💕',
  'En cualquier universo, elegiría tu amor 🌌',
  'Si el amor fuera un universo, tú serías mi galaxia 💜',
  'Mi estrella, mi luna, mi universo 🌙⭐',
  'Eres la luz de mi universo ✨',
  'Nuestro amor llega más lejos que las estrellas 🚀❤️',
  'Dos almas flotando en el mismo universo 🌌',
  'Tú eres mi infinito 💫',
];

const RINGS_CONFIG = [
  { radius: 270, height: 55, count: 6, speed: 0.055, fontSize: 44, scale: 0.50 },
  { radius: 410, height: 95, count: 8, speed: -0.038, fontSize: 40, scale: 0.46 },
  { radius: 570, height: 135, count: 9, speed: 0.028, fontSize: 36, scale: 0.42 },
  { radius: 750, height: 185, count: 10, speed: -0.020, fontSize: 32, scale: 0.39 },
  { radius: 970, height: 250, count: 10, speed: 0.014, fontSize: 29, scale: 0.35 },
];

/* =========================================================
   MATH & SHAPE HELPERS
   ========================================================= */

function heartXY(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y =
    13 * Math.cos(t) -
    5 * Math.cos(2 * t) -
    2 * Math.cos(3 * t) -
    Math.cos(4 * t);
  return [x, y];
}

function createGlowTexture(rgb) {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );

  gradient.addColorStop(0, `rgba(${rgb},0.98)`);
  gradient.addColorStop(0.16, `rgba(${rgb},0.72)`);
  gradient.addColorStop(0.38, `rgba(${rgb},0.29)`);
  gradient.addColorStop(0.67, `rgba(${rgb},0.07)`);
  gradient.addColorStop(1, `rgba(${rgb},0)`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

function createTextSprite(text, options = {}) {
  const fontSize = options.fontSize || 44;
  const color = options.color || '#f7e6f0';
  const glow = options.glow || 'rgba(255,100,180,0.9)';
  const weight = options.weight || 500;
  const padding = 30;

  const font = `${weight} ${fontSize}px Georgia, "Times New Roman", serif`;

  const measureCanvas = document.createElement('canvas');
  const measureContext = measureCanvas.getContext('2d');
  measureContext.font = font;
  const textWidth = measureContext.measureText(text).width;

  const dpr = 2;
  const canvasWidth = Math.ceil(textWidth + padding * 2);
  const canvasHeight = Math.ceil(fontSize * 1.65 + padding);

  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Двойное мягкое свечение без мыла
  ctx.shadowColor = glow;
  ctx.shadowBlur = options.blur || 14;
  ctx.fillStyle = color;
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

  ctx.shadowBlur = (options.blur || 14) * 0.28;
  ctx.fillText(text, canvasWidth / 2, canvasHeight / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
  });

  const sprite = new THREE.Sprite(material);
  const scale = options.scale || 0.5;
  sprite.scale.set(
    canvasWidth * scale * 0.24,
    canvasHeight * scale * 0.24,
    1
  );

  sprite.userData.texture = texture;
  return sprite;
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function LoveUniverse({ onBack }) {
  const containerRef = useRef(null);
  const flashRef = useRef(null);

  const [stage, setStage] = useState('intro');
  const [showHint, setShowHint] = useState(true);

  const handleEnter = () => {
    setStage('flight');
  };

  useEffect(() => {
    if (stage !== 'universe' || !containerRef.current) {
      return undefined;
    }

    const wrap = containerRef.current;
    const getWidth = () => wrap.clientWidth || window.innerWidth;
    const getHeight = () => wrap.clientHeight || window.innerHeight;

    /* RENDERER */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(getWidth(), getHeight());
    renderer.setClearColor(0x020105, 1);

    wrap.innerHTML = '';
    wrap.appendChild(renderer.domElement);

    /* SCENE & FOG */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020105, 0.00029);

    /* CAMERA & EXTENDED ZOOM RANGE */
    const camera = new THREE.PerspectiveCamera(
      52,
      getWidth() / getHeight(),
      1,
      30000 // Дальняя плоскость для супер-отдаления
    );

    const target = new THREE.Vector3(0, 15, 0);

    // Свободный зум (от вплотную к сердцу до глубокого космоса)
    const MIN_RADIUS = 110;
    const MAX_RADIUS = 4200;

    let radius = 820;
    let theta = 0.35;
    let phi = 1.25;

    let autoRotate = true;
    let dragging = false;
    let previousX = 0;
    let previousY = 0;
    let velocityTheta = 0;
    let velocityPhi = 0;

    let mouseX = 0;
    let mouseY = 0;
    let smoothMouseX = 0;
    let smoothMouseY = 0;

    const onPointerMoveWindow = (event) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onPointerMoveWindow);

    function updateCamera() {
      const safePhi = THREE.MathUtils.clamp(phi, 0.2, Math.PI - 0.2);

      smoothMouseX += (mouseX - smoothMouseX) * 0.025;
      smoothMouseY += (mouseY - smoothMouseY) * 0.025;

      camera.position.x =
        target.x +
        radius * Math.sin(safePhi) * Math.sin(theta) +
        smoothMouseX * 18;

      camera.position.y =
        target.y +
        radius * Math.cos(safePhi) -
        smoothMouseY * 10;

      camera.position.z =
        target.z + radius * Math.sin(safePhi) * Math.cos(theta);

      camera.lookAt(target);
    }

    /* STARFIELDS */
    function createStarfield({ count, minRadius, maxRadius, size, opacity, color }) {
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        const r = minRadius + Math.random() * (maxRadius - minRadius);
        const u = Math.random();
        const v = Math.random();
        const azimuth = u * Math.PI * 2;
        const polar = Math.acos(2 * v - 1);

        positions[i * 3] = r * Math.sin(polar) * Math.cos(azimuth);
        positions[i * 3 + 1] = r * Math.cos(polar) * 0.65;
        positions[i * 3 + 2] = r * Math.sin(polar) * Math.sin(azimuth);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const material = new THREE.PointsMaterial({
        color,
        size,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });

      return new THREE.Points(geometry, material);
    }

    const farStars = createStarfield({
      count: 6000,
      minRadius: 1800,
      maxRadius: 10000,
      size: 2.8,
      opacity: 0.8,
      color: 0xffffff,
    });
    scene.add(farStars);

    const midStars = createStarfield({
      count: 3000,
      minRadius: 900,
      maxRadius: 5000,
      size: 2.0,
      opacity: 0.48,
      color: 0xffcce8,
    });
    scene.add(midStars);

    /* LOCAL STARS */
    const LOCAL_STAR_COUNT = 1100;
    const localPositions = new Float32Array(LOCAL_STAR_COUNT * 3);
    const localBase = new Float32Array(LOCAL_STAR_COUNT * 3);
    const localPhase = new Float32Array(LOCAL_STAR_COUNT);

    for (let i = 0; i < LOCAL_STAR_COUNT; i++) {
      const r = 260 + Math.random() * 1050;
      const angle = Math.random() * Math.PI * 2;
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const y = (Math.random() - 0.5) * 600;

      localPositions[i * 3] = x;
      localPositions[i * 3 + 1] = y;
      localPositions[i * 3 + 2] = z;

      localBase[i * 3] = x;
      localBase[i * 3 + 1] = y;
      localBase[i * 3 + 2] = z;

      localPhase[i] = Math.random() * Math.PI * 2;
    }

    const localGeometry = new THREE.BufferGeometry();
    localGeometry.setAttribute('position', new THREE.BufferAttribute(localPositions, 3));
    const localMaterial = new THREE.PointsMaterial({
      color: 0xffd5ea,
      size: 2.4,
      transparent: true,
      opacity: 0.62,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const localStars = new THREE.Points(localGeometry, localMaterial);
    scene.add(localStars);

    /* CENTRAL GALAXY GLOW */
    const glowTex = createGlowTexture('255,25,130');
    const mainGlowMaterial = new THREE.SpriteMaterial({
      map: glowTex,
      transparent: true,
      opacity: 0.76,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const mainGlow = new THREE.Sprite(mainGlowMaterial);
    mainGlow.position.set(0, 18, 0);
    mainGlow.scale.set(1150, 1150, 1);
    scene.add(mainGlow);

    const innerGlow = new THREE.Sprite(mainGlowMaterial.clone());
    innerGlow.material.opacity = 0.45;
    innerGlow.position.set(0, 18, 0);
    innerGlow.scale.set(560, 560, 1);
    scene.add(innerGlow);

    /* HEART GROUP */
    const heart = new THREE.Group();
    scene.add(heart);

    const HEART_SCALE = 9.5;
    const HEART_POINTS = 4200;
    const heartPositions = new Float32Array(HEART_POINTS * 3);
    const heartColors = new Float32Array(HEART_POINTS * 3);

    for (let i = 0; i < HEART_POINTS; i++) {
      const t = Math.random() * Math.PI * 2;
      const edgeBias = Math.pow(Math.random(), 0.57);
      const [hx, hy] = heartXY(t);

      const x = hx * edgeBias * HEART_SCALE + (Math.random() - 0.5) * 5;
      const y = hy * edgeBias * HEART_SCALE + (Math.random() - 0.5) * 5;
      const depth =
        (Math.random() - 0.5) * 75 * (0.35 + 0.65 * (1 - edgeBias));

      heartPositions[i * 3] = x;
      heartPositions[i * 3 + 1] = y + 18;
      heartPositions[i * 3 + 2] = depth;

      const variation = Math.random();
      heartColors[i * 3] = 1.0;
      heartColors[i * 3 + 1] = 0.18 + variation * 0.30;
      heartColors[i * 3 + 2] = 0.43 + variation * 0.34;
    }

    const heartGeometry = new THREE.BufferGeometry();
    heartGeometry.setAttribute('position', new THREE.BufferAttribute(heartPositions, 3));
    heartGeometry.setAttribute('color', new THREE.BufferAttribute(heartColors, 3));

    const heartMaterial = new THREE.PointsMaterial({
      size: 3.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const heartPoints = new THREE.Points(heartGeometry, heartMaterial);
    heart.add(heartPoints);

    /* HEART OUTLINE */
    const OUTLINE_POINTS = 620;
    const outlinePositions = new Float32Array(OUTLINE_POINTS * 3);
    for (let i = 0; i < OUTLINE_POINTS; i++) {
      const t = (i / OUTLINE_POINTS) * Math.PI * 2;
      const [hx, hy] = heartXY(t);
      outlinePositions[i * 3] = hx * HEART_SCALE;
      outlinePositions[i * 3 + 1] = hy * HEART_SCALE + 18;
      outlinePositions[i * 3 + 2] = (Math.random() - 0.5) * 17;
    }
    const outlineGeometry = new THREE.BufferGeometry();
    outlineGeometry.setAttribute('position', new THREE.BufferAttribute(outlinePositions, 3));
    const outlineMaterial = new THREE.PointsMaterial({
      color: 0xffc9e7,
      size: 5.3,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const outline = new THREE.Points(outlineGeometry, outlineMaterial);
    heart.add(outline);

    /* HEART CORE */
    const coreTex = createGlowTexture('255,40,125');
    const heartCore = new THREE.Sprite(
      new THREE.SpriteMaterial({
        map: coreTex,
        transparent: true,
        opacity: 0.40,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    );
    heartCore.position.set(0, 18, 0);
    heartCore.scale.set(350, 350, 1);
    heart.add(heartCore);

    /* HEART SPARKS */
    const SPARK_COUNT = 420;
    const sparkPositions = new Float32Array(SPARK_COUNT * 3);
    const sparkData = [];

    for (let i = 0; i < SPARK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 105 + Math.random() * 230;

      sparkPositions[i * 3] = Math.cos(angle) * distance;
      sparkPositions[i * 3 + 1] = 18 + (Math.random() - 0.5) * 150;
      sparkPositions[i * 3 + 2] = Math.sin(angle) * distance;

      sparkData.push({
        angle,
        distance,
        speed: 0.04 + Math.random() * 0.11,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
    const sparkMaterial = new THREE.PointsMaterial({
      color: 0xffa9d6,
      size: 3.8,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const sparks = new THREE.Points(sparkGeometry, sparkMaterial);
    scene.add(sparks);

    /* GALACTIC DISK */
    const DISK_COUNT = 2100;
    const diskPositions = new Float32Array(DISK_COUNT * 3);
    const diskData = [];

    for (let i = 0; i < DISK_COUNT; i++) {
      const distance = 120 + Math.random() * 440;
      const angle = Math.random() * Math.PI * 2;
      const vertical =
        -80 + (Math.random() - 0.5) * 42 * (1 - distance / 650);

      diskPositions[i * 3] = Math.cos(angle) * distance;
      diskPositions[i * 3 + 1] = vertical;
      diskPositions[i * 3 + 2] = Math.sin(angle) * distance;

      diskData.push({
        distance,
        angle,
        vertical,
        speed: (0.09 + Math.random() * 0.18) / (distance * 0.012 + 1),
        phase: Math.random() * Math.PI * 2,
      });
    }

    const diskGeometry = new THREE.BufferGeometry();
    diskGeometry.setAttribute('position', new THREE.BufferAttribute(diskPositions, 3));
    const diskMaterial = new THREE.PointsMaterial({
      color: 0xff72ba,
      size: 2.15,
      transparent: true,
      opacity: 0.46,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const disk = new THREE.Points(diskGeometry, diskMaterial);
    scene.add(disk);

    /* ENERGY RINGS */
    function createEnergyRing(radiusVal, verticalScale, opacity, rotationX, rotationZ) {
      const points = [];
      const segments = 360;
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const wave = Math.sin(angle * 5) * 5;
        const r = radiusVal + wave;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * r,
            Math.sin(angle * 3) * 8 * verticalScale,
            Math.sin(angle) * r
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xff67b6,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.LineLoop(geometry, material);
      ring.rotation.x = rotationX;
      ring.rotation.z = rotationZ;
      scene.add(ring);
      return ring;
    }

    const ringA = createEnergyRing(380, 1, 0.18, 0.18, 0);
    const ringB = createEnergyRing(560, 1.25, 0.12, -0.42, 0.25);
    const ringC = createEnergyRing(760, 1.45, 0.075, 0.75, -0.32);
    const ringD = createEnergyRing(990, 1.65, 0.045, -0.32, 0.85);

    /* LIGHT RIBBONS */
    function createRibbon(radiusVal, yVal, opacity, rotation) {
      const vertices = [];
      const segments = 320;
      const turns = 2.4;
      for (let i = 0; i < segments; i++) {
        const p = i / (segments - 1);
        const angle = p * Math.PI * 2 * turns;
        const wobble = Math.sin(p * Math.PI * 12) * 8;
        const currentRadius = radiusVal * (0.82 + p * 0.18) + wobble;
        vertices.push(
          new THREE.Vector3(
            Math.cos(angle) * currentRadius,
            yVal + Math.sin(p * Math.PI * 4) * 20,
            Math.sin(angle) * currentRadius
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
      const material = new THREE.LineBasicMaterial({
        color: 0xff59a9,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const line = new THREE.Line(geometry, material);
      line.rotation.y = rotation;
      scene.add(line);
      return line;
    }

    const ribbonA = createRibbon(430, -65, 0.15, 0);
    const ribbonB = createRibbon(620, -110, 0.09, 1.3);
    const ribbonC = createRibbon(820, -145, 0.055, 2.2);

    /* COMETS */
    const cometTexture = createGlowTexture('255,210,238');
    const comets = [];
    const cometGroup = new THREE.Group();
    scene.add(cometGroup);

    for (let i = 0; i < 12; i++) {
      const mat = new THREE.SpriteMaterial({
        map: cometTexture,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(22, 22, 1);
      cometGroup.add(sprite);

      comets.push({
        sprite,
        angle: Math.random() * Math.PI * 2,
        radius: 800 + Math.random() * 950,
        height: (Math.random() - 0.5) * 650,
        speed: 0.12 + Math.random() * 0.18,
        phase: Math.random(),
        offset: Math.random() * Math.PI * 2,
      });
    }

    /* TITLES */
    const title = createTextSprite('TE AMO ❤', {
      fontSize: 120,
      color: '#ff438f',
      glow: 'rgba(255,30,135,1)',
      blur: 34,
      weight: 700,
      scale: 1.04,
    });
    title.position.set(0, 335, 0);
    scene.add(title);

    const subtitle = createTextSprite('hasta las estrellas y más allá', {
      fontSize: 29,
      color: '#f0d7e7',
      glow: 'rgba(255,95,170,0.55)',
      blur: 10,
      weight: 400,
      scale: 0.42,
    });
    subtitle.position.set(0, 285, 0);
    scene.add(subtitle);

    /* ORBITING PHRASES */
    const orbitItems = [];
    const phraseQueue = [
      ...CORE_PHRASES,
      ...ROMANTIC_PHRASES.filter((p) => !CORE_PHRASES.includes(p)),
    ];

    let phraseIndex = 0;
    RINGS_CONFIG.forEach((ring, ringIndex) => {
      for (let i = 0; i < ring.count; i++) {
        const text = phraseQueue[phraseIndex % phraseQueue.length];
        phraseIndex++;

        const sprite = createTextSprite(text, {
          fontSize: ring.fontSize,
          color:
            ringIndex === 0
              ? '#ffeaf5'
              : ringIndex === 1
              ? '#f8dfeb'
              : ringIndex === 2
              ? '#efd7e2'
              : '#e3cad8',
          glow: 'rgba(255,105,185,0.68)',
          blur: ringIndex === 0 ? 15 : ringIndex === 1 ? 12 : 9,
          scale: ring.scale,
        });

        scene.add(sprite);

        const angle =
          (Math.PI * 2 * i) / ring.count + ringIndex * 0.47;

        orbitItems.push({
          sprite,
          angle,
          radius: ring.radius * (0.92 + Math.random() * 0.15),
          y: 18 + (Math.random() - 0.5) * ring.height,
          speed: ring.speed * (0.87 + Math.random() * 0.26),
          phase: Math.random() * Math.PI * 2,
          bobSpeed: 0.30 + Math.random() * 0.50,
          bobAmount: 6 + Math.random() * 12,
          ringIndex,
        });
      }
    });

    /* BURST PARTICLES & SCREEN FLASH */
    const BURST_COUNT = 950;
    const burstPositions = new Float32Array(BURST_COUNT * 3);
    const burstVelocity = [];

    for (let i = 0; i < BURST_COUNT; i++) {
      burstPositions[i * 3] = 0;
      burstPositions[i * 3 + 1] = 18;
      burstPositions[i * 3 + 2] = 0;

      const direction = new THREE.Vector3(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();

      burstVelocity.push(
        direction.multiplyScalar(100 + Math.random() * 270)
      );
    }

    const burstGeometry = new THREE.BufferGeometry();
    burstGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(burstPositions, 3)
    );

    const burstMaterial = new THREE.PointsMaterial({
      color: 0xffb4db,
      size: 3.1,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const burst = new THREE.Points(burstGeometry, burstMaterial);
    scene.add(burst);

    let burstLife = 0;
    let screenFlash = 0;

    function triggerBurst() {
      burstLife = 1;
      screenFlash = 1;

      for (let i = 0; i < BURST_COUNT; i++) {
        burstPositions[i * 3] = 0;
        burstPositions[i * 3 + 1] = 18;
        burstPositions[i * 3 + 2] = 0;

        burstVelocity[i]
          .normalize()
          .multiplyScalar(100 + Math.random() * 270);
      }
    }

    /* DOUBLE TAP / DOUBLE CLICK DETECTOR */
    let lastTap = 0;
    const onPointerUpWrap = () => {
      const now = performance.now();
      if (now - lastTap < 320) {
        triggerBurst();
      }
      lastTap = now;
      dragging = false;
      wrap.classList.remove('dragging');
    };

    /* POINTER DRAG */
    const onPointerDownWrap = (event) => {
      dragging = true;
      autoRotate = false;
      previousX = event.clientX;
      previousY = event.clientY;
      wrap.classList.add('dragging');
      wrap.setPointerCapture?.(event.pointerId);
    };

    const onPointerMoveWrap = (event) => {
      if (!dragging) return;
      const dx = event.clientX - previousX;
      const dy = event.clientY - previousY;
      previousX = event.clientX;
      previousY = event.clientY;

      const sensitivity = 0.0047;
      theta -= dx * sensitivity;
      phi -= dy * sensitivity;

      velocityTheta = -dx * sensitivity;
      velocityPhi = -dy * sensitivity;

      phi = THREE.MathUtils.clamp(phi, 0.2, Math.PI - 0.2);
    };

    /* EXPONENTIAL SMOOTH ZOOM (WHEEL) */
    const onWheelWrap = (event) => {
      event.preventDefault();
      radius *= Math.exp(event.deltaY * 0.001);
      radius = THREE.MathUtils.clamp(radius, MIN_RADIUS, MAX_RADIUS);
    };

    /* PINCH TO ZOOM */
    let pinchStartDistance = null;
    let pinchStartRadius = null;

    const onTouchStart = (event) => {
      if (event.touches.length === 2) {
        const dx = event.touches[0].clientX - event.touches[1].clientX;
        const dy = event.touches[0].clientY - event.touches[1].clientY;
        pinchStartDistance = Math.hypot(dx, dy);
        pinchStartRadius = radius;
      }
    };

    const onTouchMove = (event) => {
      if (event.touches.length !== 2 || !pinchStartDistance) return;
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const distance = Math.hypot(dx, dy);

      radius = pinchStartRadius * (pinchStartDistance / distance);
      radius = THREE.MathUtils.clamp(radius, MIN_RADIUS, MAX_RADIUS);
    };

    const onTouchEnd = () => {
      pinchStartDistance = null;
      pinchStartRadius = null;
    };

    wrap.addEventListener('pointerdown', onPointerDownWrap);
    wrap.addEventListener('pointermove', onPointerMoveWrap);
    wrap.addEventListener('pointerup', onPointerUpWrap);
    wrap.addEventListener('pointercancel', onPointerUpWrap);
    wrap.addEventListener('wheel', onWheelWrap, { passive: false });
    wrap.addEventListener('touchstart', onTouchStart, { passive: true });
    wrap.addEventListener('touchmove', onTouchMove, { passive: true });
    wrap.addEventListener('touchend', onTouchEnd);

    /* RESET BUTTON LISTENER */
    const resetView = () => {
      radius = 820;
      theta = 0.35;
      phi = 1.25;
      velocityTheta = 0;
      velocityPhi = 0;
      autoRotate = true;
    };

    window.__loveUniverseResetView = resetView;

    /* RESIZE LISTENER */
    const onResize = () => {
      camera.aspect = getWidth() / getHeight();
      camera.updateProjectionMatrix();
      renderer.setSize(getWidth(), getHeight());
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    };
    window.addEventListener('resize', onResize);

    /* ANIMATION LOOP */
    const clock = new THREE.Clock();
    let animId = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      /* Heart */
      const heartPulse = 1 + Math.sin(time * 1.35) * 0.038;
      heart.scale.set(heartPulse, heartPulse, heartPulse);
      heart.rotation.y = Math.sin(time * 0.13) * 0.13;
      heartMaterial.opacity = 0.84 + Math.sin(time * 2.15) * 0.06;
      outlineMaterial.opacity = 0.88 + Math.sin(time * 2.6) * 0.12;

      const corePulse = 350 + Math.sin(time * 1.4) * 30;
      heartCore.scale.set(corePulse, corePulse, 1);

      /* Galaxy Glow */
      const glowWave = Math.sin(time * 0.82);
      mainGlow.material.opacity = 0.72 + glowWave * 0.11;
      innerGlow.material.opacity = 0.41 + glowWave * 0.09;
      const glowSize = 1100 + glowWave * 100;
      mainGlow.scale.set(glowSize, glowSize, 1);
      innerGlow.scale.set(glowSize * 0.5, glowSize * 0.5, 1);

      /* Local Stars Movement */
      const localAttribute = localStars.geometry.attributes.position;
      for (let i = 0; i < LOCAL_STAR_COUNT; i++) {
        const phase = localPhase[i];
        localAttribute.array[i * 3] =
          localBase[i * 3] + Math.sin(time * 0.17 + phase) * 7;
        localAttribute.array[i * 3 + 1] =
          localBase[i * 3 + 1] + Math.sin(time * 0.22 + phase) * 10;
        localAttribute.array[i * 3 + 2] =
          localBase[i * 3 + 2] + Math.cos(time * 0.16 + phase) * 7;
      }
      localAttribute.needsUpdate = true;
      localMaterial.opacity = 0.50 + Math.sin(time * 1.5) * 0.10;

      /* Galactic Disk */
      const diskAttribute = disk.geometry.attributes.position;
      for (let i = 0; i < DISK_COUNT; i++) {
        const d = diskData[i];
        d.angle += d.speed * dt;
        diskAttribute.array[i * 3] = Math.cos(d.angle) * d.distance;
        diskAttribute.array[i * 3 + 1] =
          d.vertical + Math.sin(time * 0.6 + d.phase) * 3;
        diskAttribute.array[i * 3 + 2] = Math.sin(d.angle) * d.distance;
      }
      diskAttribute.needsUpdate = true;
      disk.material.opacity = 0.40 + Math.sin(time * 0.8) * 0.065;

      /* Sparks */
      const sparkAttribute = sparks.geometry.attributes.position;
      for (let i = 0; i < SPARK_COUNT; i++) {
        const s = sparkData[i];
        s.angle += s.speed * dt;
        const wave = Math.sin(time * 0.8 + s.phase) * 12;
        sparkAttribute.array[i * 3] = Math.cos(s.angle) * (s.distance + wave);
        sparkAttribute.array[i * 3 + 1] =
          18 + Math.sin(time * 0.55 + s.phase) * 55;
        sparkAttribute.array[i * 3 + 2] = Math.sin(s.angle) * (s.distance + wave);
      }
      sparkAttribute.needsUpdate = true;
      sparks.material.opacity = 0.55 + Math.sin(time * 2) * 0.18;

      /* Energy Rings */
      ringA.rotation.y = time * 0.10;
      ringA.rotation.z = Math.sin(time * 0.12) * 0.05;

      ringB.rotation.y = -time * 0.07;
      ringB.rotation.x = -0.42 + Math.sin(time * 0.10) * 0.08;

      ringC.rotation.y = time * 0.045;
      ringC.rotation.z = -0.32 + Math.cos(time * 0.08) * 0.06;

      ringD.rotation.y = -time * 0.025;
      ringD.rotation.x = 0.55 + Math.sin(time * 0.07) * 0.07;

      /* Ribbons */
      ribbonA.rotation.y = time * 0.026;
      ribbonB.rotation.y = -time * 0.017;
      ribbonC.rotation.y = time * 0.011;
      ribbonA.rotation.z = Math.sin(time * 0.11) * 0.08;
      ribbonB.rotation.z = Math.cos(time * 0.09) * 0.07;
      ribbonC.rotation.z = Math.sin(time * 0.07) * 0.05;

      /* Titles */
      title.position.y = 335 + Math.sin(time * 0.72) * 8;
      subtitle.position.y = 285 + Math.sin(time * 0.72 + 0.8) * 6;

      /* Orbiting Text */
      orbitItems.forEach((item) => {
        item.angle += item.speed * dt;
        const bob =
          Math.sin(time * item.bobSpeed + item.phase) * item.bobAmount;

        item.sprite.position.set(
          Math.cos(item.angle) * item.radius,
          item.y + bob,
          Math.sin(item.angle) * item.radius
        );

        const scalePulse =
          1 +
          Math.sin(time * 0.75 + item.phase) *
            (item.ringIndex === 0 ? 0.040 : 0.025);

        const baseScale =
          item.sprite.userData.baseScale || item.sprite.scale.clone();
        item.sprite.userData.baseScale = baseScale;

        item.sprite.scale.set(
          baseScale.x * scalePulse,
          baseScale.y * scalePulse,
          1
        );
      });

      /* Comets */
      comets.forEach((comet) => {
        comet.angle += comet.speed * dt;
        const r = comet.radius;
        comet.sprite.position.set(
          Math.cos(comet.angle) * r,
          comet.height + Math.sin(time * 0.55 + comet.offset) * 90,
          Math.sin(comet.angle) * r
        );
        const fade =
          (Math.sin(time * 0.55 + comet.phase * Math.PI * 2) + 1) * 0.5;
        comet.sprite.material.opacity = fade * 0.42;
        const cometScale = 17 + fade * 13;
        comet.sprite.scale.set(cometScale, cometScale, 1);
      });

      /* Heart Burst & Flash */
      if (burstLife > 0) {
        burstLife -= dt * 1.25;
        const burstAttribute = burst.geometry.attributes.position;
        for (let i = 0; i < BURST_COUNT; i++) {
          burstAttribute.array[i * 3] +=
            burstVelocity[i].x * dt * burstLife;
          burstAttribute.array[i * 3 + 1] +=
            burstVelocity[i].y * dt * burstLife;
          burstAttribute.array[i * 3 + 2] +=
            burstVelocity[i].z * dt * burstLife;
        }
        burstAttribute.needsUpdate = true;
        burst.material.opacity = Math.max(0, burstLife * 0.85);
        heartCore.material.opacity = 0.40 + burstLife * 0.58;
      } else {
        heartCore.material.opacity =
          0.38 + Math.sin(time * 1.2) * 0.05;
      }

      if (screenFlash > 0 && flashRef.current) {
        screenFlash -= dt * 2.4;
        flashRef.current.style.opacity = Math.max(
          0,
          screenFlash * 0.65
        ).toString();
      }

      /* Camera Movement */
      if (autoRotate) {
        theta += 0.042 * dt;
      } else if (!dragging) {
        theta += velocityTheta;
        phi += velocityPhi;
        velocityTheta *= 0.91;
        velocityPhi *= 0.91;
        phi = THREE.MathUtils.clamp(phi, 0.2, Math.PI - 0.2);
      }

      updateCamera();
      renderer.render(scene, camera);
    };

    animate();

    /* CLEANUP */
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMoveWindow);

      wrap.removeEventListener('pointerdown', onPointerDownWrap);
      wrap.removeEventListener('pointermove', onPointerMoveWrap);
      wrap.removeEventListener('pointerup', onPointerUpWrap);
      wrap.removeEventListener('pointercancel', onPointerUpWrap);
      wrap.removeEventListener('wheel', onWheelWrap);
      wrap.removeEventListener('touchstart', onTouchStart);
      wrap.removeEventListener('touchmove', onTouchMove);
      wrap.removeEventListener('touchend', onTouchEnd);

      delete window.__loveUniverseResetView;

      renderer.dispose();
      wrap.innerHTML = '';
    };
  }, [stage]);

  return (
    <div className="love-universe-page">
      {stage === 'intro' && (
        <UniverseIntro onEnter={handleEnter} onBack={onBack} />
      )}

      {stage === 'flight' && (
        <SpaceFlight
          duration={3200}
          onComplete={() => {
            setStage('universe');
          }}
        />
      )}

      {stage === 'universe' && (
        <div className="love-universe-stage">
          {/* Инжектированные стили эффектов, виньетки и зерна из оригинального HTML */}
          <style>{`
            .love-universe-stage {
              position: fixed;
              inset: 0;
              overflow: hidden;
              background: radial-gradient(
                circle at 50% 44%,
                #1b0310 0%,
                #0b020b 32%,
                #040106 68%,
                #010104 100%
              );
            }

            .canvas-wrap {
              position: fixed;
              inset: 0;
              overflow: hidden;
              cursor: grab;
              touch-action: none;
            }

            .canvas-wrap.dragging {
              cursor: grabbing;
            }

            .galaxy-atmosphere {
              position: fixed;
              inset: 0;
              z-index: 4;
              pointer-events: none;
              background: radial-gradient(
                circle at 50% 47%,
                rgba(255, 40, 145, 0.085),
                transparent 28%
              );
              mix-blend-mode: screen;
            }

            .galaxy-vignette {
              position: fixed;
              inset: 0;
              z-index: 5;
              pointer-events: none;
              background: radial-gradient(
                ellipse at center,
                transparent 27%,
                rgba(0, 0, 0, 0.07) 43%,
                rgba(0, 0, 0, 0.24) 68%,
                rgba(0, 0, 0, 0.72) 100%
              );
            }

            .galaxy-grain {
              position: fixed;
              inset: -50%;
              z-index: 6;
              pointer-events: none;
              opacity: 0.035;
              background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 160 160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E");
              animation: grainMove 0.35s steps(2) infinite;
            }

            @keyframes grainMove {
              0% { transform: translate(0, 0); }
              25% { transform: translate(2%, -1%); }
              50% { transform: translate(-1%, 2%); }
              75% { transform: translate(1%, 1%); }
              100% { transform: translate(0, 0); }
            }

            .galaxy-flash {
              position: fixed;
              inset: 0;
              z-index: 7;
              pointer-events: none;
              background: radial-gradient(circle at center, rgba(255,170,220,0.22), rgba(255,50,145,0) 42%);
              opacity: 0;
              transition: opacity 0.05s linear;
            }

            .galaxy-reset-btn {
              position: fixed;
              top: max(16px, env(safe-area-inset-top));
              right: 16px;
              z-index: 10;
              border: 1px solid rgba(255, 170, 215, 0.24);
              border-radius: 999px;
              padding: 9px 15px;
              color: rgba(255, 236, 247, 0.92);
              background: rgba(255, 255, 255, 0.045);
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 12px;
              letter-spacing: 0.3px;
              cursor: pointer;
              backdrop-filter: blur(14px);
              box-shadow: 0 0 26px rgba(255, 50, 150, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.022);
              transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
            }

            .galaxy-reset-btn:hover {
              background: rgba(255, 105, 180, 0.10);
              border-color: rgba(255, 185, 220, 0.48);
              transform: translateY(-1px);
            }

            .galaxy-reset-btn:active {
              transform: scale(0.95);
            }

            .galaxy-back-btn {
              position: fixed;
              top: max(16px, env(safe-area-inset-top));
              left: 16px;
              z-index: 10;
              border: 1px solid rgba(255, 170, 215, 0.24);
              border-radius: 999px;
              padding: 9px 15px;
              color: rgba(255, 236, 247, 0.92);
              background: rgba(255, 255, 255, 0.045);
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 12px;
              letter-spacing: 0.3px;
              cursor: pointer;
              backdrop-filter: blur(14px);
              box-shadow: 0 0 26px rgba(255, 50, 150, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.022);
              transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
              display: flex;
              align-items: center;
              gap: 6px;
            }

            .galaxy-back-btn:hover {
              background: rgba(255, 105, 180, 0.10);
              border-color: rgba(255, 185, 220, 0.48);
              transform: translateY(-1px);
            }

            .galaxy-hint {
              position: fixed;
              left: 50%;
              bottom: max(18px, env(safe-area-inset-bottom));
              transform: translateX(-50%);
              z-index: 10;
              width: max-content;
              max-width: calc(100% - 32px);
              padding: 7px 14px;
              border: 1px solid rgba(255, 255, 255, 0.05);
              border-radius: 999px;
              color: rgba(255, 255, 255, 0.43);
              background: rgba(0, 0, 0, 0.13);
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
              font-size: 11.5px;
              letter-spacing: 0.25px;
              line-height: 1.4;
              text-align: center;
              pointer-events: none;
              backdrop-filter: blur(10px);
            }
          `}</style>

          {/* Three.js Canvas Container */}
          <div ref={containerRef} className="canvas-wrap" />

          {/* Визуальные слои из HTML */}
          <div className="galaxy-atmosphere" />
          <div className="galaxy-vignette" />
          <div className="galaxy-grain" />
          <div ref={flashRef} className="galaxy-flash" />

          {/* UI Кнопки */}
          <button
            type="button"
            className="galaxy-back-btn"
            onClick={onBack}
          >
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
            Volver
          </button>

          <button
            type="button"
            className="galaxy-reset-btn"
            onClick={() => window.__loveUniverseResetView?.()}
          >
            Regresar al corazón
          </button>

          {showHint && (
            <div className="galaxy-hint">
              Arrastrar: girar · Rueda / pinza: acercar/alejar · Doble toque: flash
            </div>
          )}
        </div>
      )}
    </div>
  );
}