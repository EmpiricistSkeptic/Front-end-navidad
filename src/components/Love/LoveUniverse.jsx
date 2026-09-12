import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import UniverseIntro from './UniverseIntro.jsx';
import SpaceFlight from './SpaceFlight.jsx';
import './LoveUniverse.css';

const ROMANTIC_PHRASES = [
  'Te amo',
  'Amor sin límites 💜',
  'Para siempre ⏳',
  'Hasta las estrellas y más allá 🚀',
  'Conexión del alma 🔗',
  'Mi refugio perfecto 🕊️',
  'Un universo juntos 🌌',
  'Tú y yo contra el mundo',
  'Mi sueño hecho realidad 🌙',
  'Contigo todo es mejor ✨',
  'Cada día te elijo a ti 📅',
  'Mi corazón te pertenece ❤️',
  'Eres mi lugar favorito 🏠',
  'Brillas más que cualquier estrella ⭐',
  'Mi presente y mi futuro ⏳',
  'Mi felicidad tiene tu nombre 💖',
  'Mi razón de ser ⭐',
  'Eres todo 🌹',
  'Magia en cada instante 🌟',
  'Para toda la eternidad',
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
];

const STAR_COUNT = 4200;
const HEART_COUNT = 4200;
const OUTLINE_COUNT = 1100;
const PHRASE_ORBITS = 5;

function random(min, max) {
  return min + Math.random() * (max - min);
}

function createStarField() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i += 1) {
    const radius = random(35, 130);
    const theta = random(0, Math.PI * 2);
    const phi = Math.acos(random(-1, 1));

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.cos(phi);
    positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);

    sizes[i] = random(0.35, 1.8);
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    'aSize',
    new THREE.BufferAttribute(sizes, 1)
  );

  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.65,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  return new THREE.Points(geometry, material);
}

function createHeartPoints(count, scale = 0.9) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const t = Math.random() * Math.PI * 2;

    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    // Fill area rather than only the contour.
    const depth = random(-1.8, 1.8);
    const fill = Math.sqrt(Math.random());

    positions[i * 3] = x * scale * fill + random(-0.18, 0.18);
    positions[i * 3 + 1] = y * scale * fill + random(-0.18, 0.18);
    positions[i * 3 + 2] = depth;
  }

  return positions;
}

function createHeartOutline(count, scale = 0.94) {
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const t = (i / count) * Math.PI * 2;

    const x =
      16 * Math.pow(Math.sin(t), 3) +
      random(-0.2, 0.2);

    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t) +
      random(-0.2, 0.2);

    positions[i * 3] = x * scale;
    positions[i * 3 + 1] = y * scale;
    positions[i * 3 + 2] = random(-0.6, 0.6);
  }

  return positions;
}

function createTextSprite(text, scale = 1) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');

  const width = 1200;
  const height = 180;

  canvas.width = width;
  canvas.height = height;

  context.clearRect(0, 0, width, height);

  context.font =
    '700 48px Inter, Arial, Helvetica, sans-serif';

  context.textAlign = 'center';
  context.textBaseline = 'middle';

  context.shadowColor = 'rgba(255, 80, 190, 0.95)';
  context.shadowBlur = 24;

  context.fillStyle = 'rgba(255, 245, 255, 0.96)';
  context.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const sprite = new THREE.Sprite(material);

  sprite.scale.set(
    5.8 * scale,
    0.86 * scale,
    1
  );

  return sprite;
}

function createOrbitRing(radius, thickness, color, opacity = 0.24) {
  const curve = new THREE.EllipseCurve(
    0,
    0,
    radius,
    radius * 0.42,
    0,
    Math.PI * 2,
    false,
    0
  );

  const points = curve.getPoints(240);

  const geometry = new THREE.BufferGeometry().setFromPoints(
    points.map((point) => new THREE.Vector3(
      point.x,
      point.y,
      0
    ))
  );

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const line = new THREE.LineLoop(geometry, material);
  line.rotation.x = Math.PI * random(0.12, 0.42);
  line.rotation.y = random(0, Math.PI);
  line.userData.baseOpacity = opacity;
  line.userData.thickness = thickness;

  return line;
}

function createDustDisk() {
  const count = 1800;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const radius = random(7, 34);
    const angle = random(0, Math.PI * 2);

    positions[i * 3] =
      Math.cos(angle) * radius;

    positions[i * 3 + 1] =
      random(-0.55, 0.55);

    positions[i * 3 + 2] =
      Math.sin(angle) * radius * 0.42;
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({
    color: 0xff69c8,
    size: 0.08,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const disk = new THREE.Points(geometry, material);
  disk.rotation.x = Math.PI * 0.1;

  return disk;
}

function createCenterGlow() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');

  const gradient = context.createRadialGradient(
    256,
    256,
    0,
    256,
    256,
    256
  );

  gradient.addColorStop(0, 'rgba(255,170,230,0.95)');
  gradient.addColorStop(0.12, 'rgba(255,80,190,0.55)');
  gradient.addColorStop(0.38, 'rgba(165,55,255,0.20)');
  gradient.addColorStop(1, 'rgba(0,0,0,0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const sprite = new THREE.Sprite(material);

  sprite.scale.set(24, 24, 1);

  return sprite;
}

export default function LoveUniverse() {
  const navigate = useNavigate();

  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [stage, setStage] = useState('intro');
  const [showControls, setShowControls] = useState(true);

  const handleEnter = () => {
    setStage('flight');
  };

  useEffect(() => {
    if (stage !== 'flight') {
      return undefined;
    }

    return undefined;
  }, [stage]);

  useEffect(() => {
    if (stage !== 'universe' || !containerRef.current) {
      return undefined;
    }

    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x02010b);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );

    camera.position.set(0, 0, 39);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.75)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    rendererRef.current = renderer;

    const universe = new THREE.Group();
    scene.add(universe);

    const stars = createStarField();
    universe.add(stars);

    const glow = createCenterGlow();
    universe.add(glow);

    const heartGeometry = new THREE.BufferGeometry();

    heartGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        createHeartPoints(HEART_COUNT, 0.88),
        3
      )
    );

    const heartMaterial = new THREE.PointsMaterial({
      color: 0xff4fa3,
      size: 0.1,
      transparent: true,
      opacity: 0.96,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const heart = new THREE.Points(
      heartGeometry,
      heartMaterial
    );

    heart.position.y = -0.35;

    universe.add(heart);

    const outlineGeometry = new THREE.BufferGeometry();

    outlineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(
        createHeartOutline(OUTLINE_COUNT, 0.9),
        3
      )
    );

    const outlineMaterial = new THREE.PointsMaterial({
      color: 0xffb6e8,
      size: 0.075,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const outline = new THREE.Points(
      outlineGeometry,
      outlineMaterial
    );

    outline.position.y = -0.35;

    universe.add(outline);

    const dust = createDustDisk();
    universe.add(dust);

    const ringColors = [
      0xff64be,
      0xff8ad0,
      0xb968ff,
      0x8b7dff,
      0xffb8ee,
    ];

    const ringRadii = [
      10.5,
      14,
      18,
      22.5,
      27,
    ];

    ringRadii.forEach((radius, index) => {
      const ring = createOrbitRing(
        radius,
        index + 1,
        ringColors[index],
        0.12 + index * 0.035
      );

      ring.userData.baseRotation =
        random(0.00035, 0.00135) *
        (index % 2 === 0 ? 1 : -1);

      universe.add(ring);
    });

    const phraseGroup = new THREE.Group();
    universe.add(phraseGroup);

    const orbitSettings = [
      { radius: 11, speed: 0.00023, y: 0.3 },
      { radius: 14.5, speed: -0.00017, y: 0.7 },
      { radius: 18, speed: 0.00013, y: -0.5 },
      { radius: 22, speed: -0.00009, y: 1.0 },
      { radius: 26, speed: 0.00007, y: -1.2 },
    ];

    const phraseObjects = [];

    ROMANTIC_PHRASES.forEach((phrase, index) => {
      const orbitIndex = index % PHRASE_ORBITS;
      const settings = orbitSettings[orbitIndex];

      const sprite = createTextSprite(
        phrase,
        index % 3 === 0 ? 1.0 : 0.78
      );

      const angle =
        (index / ROMANTIC_PHRASES.length) *
        Math.PI *
        2 *
        2.4;

      sprite.position.set(
        Math.cos(angle) * settings.radius,
        settings.y + Math.sin(angle * 1.7) * 1.5,
        Math.sin(angle) *
          settings.radius *
          0.42
      );

      sprite.userData = {
        angle,
        radius: settings.radius,
        speed: settings.speed,
        y: settings.y,
        phase: random(0, Math.PI * 2),
        orbitIndex,
      };

      phraseGroup.add(sprite);
      phraseObjects.push(sprite);
    });

    const title = createTextSprite('TE AMO ❤', 1.6);
    title.position.set(0, 12.3, 0);
    universe.add(title);

    const subtitle = createTextSprite(
      'nuestro universo',
      0.68
    );

    subtitle.position.set(0, 10.85, 0);
    subtitle.material.opacity = 0.5;
    universe.add(subtitle);

    const pointer = {
      down: false,
      x: 0,
      y: 0,
      lastX: 0,
      lastY: 0,
    };

    let rotationX = 0;
    let rotationY = 0;

    let velocityX = 0;
    let velocityY = 0;

    let autoRotation = 0.00045;

    const onPointerDown = (event) => {
      pointer.down = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;
    };

    const onPointerMove = (event) => {
      if (!pointer.down) {
        return;
      }

      const dx = event.clientX - pointer.lastX;
      const dy = event.clientY - pointer.lastY;

      pointer.lastX = event.clientX;
      pointer.lastY = event.clientY;

      velocityY = dx * 0.003;
      velocityX = dy * 0.003;

      rotationY += dx * 0.003;
      rotationX += dy * 0.003;

      rotationX = THREE.MathUtils.clamp(
        rotationX,
        -0.75,
        0.75
      );
    };

    const onPointerUp = () => {
      pointer.down = false;
    };

    const onWheel = (event) => {
      event.preventDefault();

      camera.position.z += event.deltaY * 0.018;

      camera.position.z = THREE.MathUtils.clamp(
        camera.position.z,
        24,
        65
      );
    };

    renderer.domElement.addEventListener(
      'pointerdown',
      onPointerDown
    );

    renderer.domElement.addEventListener(
      'pointermove',
      onPointerMove
    );

    window.addEventListener(
      'pointerup',
      onPointerUp
    );

    renderer.domElement.addEventListener(
      'wheel',
      onWheel,
      { passive: false }
    );

    const resetView = () => {
      camera.position.set(0, 0, 39);

      rotationX = 0;
      rotationY = 0;

      velocityX = 0;
      velocityY = 0;
    };

    const resetButton = document.createElement('button');

    resetButton.className =
      'love-universe-reset';

    resetButton.type = 'button';
    resetButton.textContent = 'Сбросить вид';

    resetButton.addEventListener(
      'click',
      resetView
    );

    container.appendChild(resetButton);

    let time = 0;

    const animate = () => {
      animationFrameRef.current =
        requestAnimationFrame(animate);

      time += 0.016;

      if (!pointer.down) {
        rotationY += autoRotation;
      }

      rotationY += velocityY;
      rotationX += velocityX;

      velocityY *= 0.94;
      velocityX *= 0.94;

      universe.rotation.y = rotationY;
      universe.rotation.x = rotationX;

      heart.rotation.z =
        Math.sin(time * 0.7) * 0.015;

      const pulse =
        1 +
        Math.sin(time * 2.6) * 0.045;

      heart.scale.setScalar(pulse);

      outline.scale.setScalar(
        1 +
        Math.sin(time * 2.6 + 0.4) * 0.075
      );

      glow.material.opacity =
        0.68 +
        Math.sin(time * 1.4) * 0.1;

      glow.scale.setScalar(
        1 +
        Math.sin(time * 1.4) * 0.055
      );

      dust.rotation.y += 0.0008;
      dust.rotation.z += 0.00025;

      stars.rotation.y += 0.000025;
      stars.rotation.x += 0.00001;

      phraseObjects.forEach((sprite) => {
        const data = sprite.userData;

        data.angle += data.speed * 16;

        sprite.position.x =
          Math.cos(data.angle) *
          data.radius;

        sprite.position.z =
          Math.sin(data.angle) *
          data.radius *
          0.42;

        sprite.position.y =
          data.y +
          Math.sin(
            time * 0.55 + data.phase
          ) *
            0.75;

        const distanceFromCenter =
          Math.sqrt(
            sprite.position.x ** 2 +
            sprite.position.z ** 2
          );

        const scale =
          THREE.MathUtils.clamp(
            1.15 - distanceFromCenter / 42,
            0.64,
            1
          );

        sprite.scale.set(
          5.8 * scale,
          0.86 * scale,
          1
        );

        sprite.material.opacity =
          0.48 +
          Math.sin(
            time * 0.8 +
            data.phase
          ) *
            0.16;
      });

      title.position.y =
        12.3 +
        Math.sin(time * 1.2) * 0.25;

      subtitle.position.y =
        10.85 +
        Math.sin(time * 1.2 + 0.6) * 0.15;

      renderer.render(
        scene,
        camera
      );
    };

    const onResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height
      );
    };

    window.addEventListener(
      'resize',
      onResize
    );

    animate();

    return () => {
      cancelAnimationFrame(
        animationFrameRef.current
      );

      window.removeEventListener(
        'resize',
        onResize
      );

      window.removeEventListener(
        'pointerup',
        onPointerUp
      );

      renderer.domElement.removeEventListener(
        'pointerdown',
        onPointerDown
      );

      renderer.domElement.removeEventListener(
        'pointermove',
        onPointerMove
      );

      renderer.domElement.removeEventListener(
        'wheel',
        onWheel
      );

      resetButton.removeEventListener(
        'click',
        resetView
      );

      heartGeometry.dispose();
      heartMaterial.dispose();

      outlineGeometry.dispose();
      outlineMaterial.dispose();

      renderer.dispose();

      container.innerHTML = '';

      rendererRef.current = null;
    };
  }, [stage]);

  return (
    <div className="love-universe-page">
      {stage === 'intro' && (
        <UniverseIntro
          onEnter={handleEnter}
          onBack={() => navigate('/')}
        />
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
        <>
          <div
            ref={containerRef}
            className="love-universe-canvas"
          />

          <div className="love-universe-ui">
            <button
              type="button"
              className="love-universe-back"
              onClick={() => navigate('/')}
            >
              ← Назад
            </button>

            {showControls && (
              <div className="love-universe-hint">
                <div>
                  Перетаскивание — вращение
                </div>

                <div>
                  Колесо — приближение
                </div>
              </div>
            )}

            <button
              type="button"
              className="love-universe-help"
              onClick={() => {
                setShowControls((value) => !value);
              }}
              aria-label="Показать управление"
            >
              ?
            </button>
          </div>
        </>
      )}
    </div>
  );
}