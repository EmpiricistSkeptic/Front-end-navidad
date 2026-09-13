import React, { useEffect, useRef, useState } from 'react';
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

const STAR_COUNT = 3600;
const HEART_COUNT = 6500;
const HEART_EDGE_COUNT = 1700;
const HEART_SPARK_COUNT = 650;
const PHRASE_ORBITS = 5;

function random(min, max) {
  return min + Math.random() * (max - min);
}

/* =========================================================
   STAR FIELD
   Круглые звёзды через ShaderMaterial
   ========================================================= */

function createStarField() {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(STAR_COUNT * 3);
  const sizes = new Float32Array(STAR_COUNT);
  const phases = new Float32Array(STAR_COUNT);
  const brightness = new Float32Array(STAR_COUNT);

  for (let i = 0; i < STAR_COUNT; i += 1) {
    const radius = random(38, 145);
    const theta = random(0, Math.PI * 2);
    const phi = Math.acos(random(-1, 1));

    positions[i * 3] =
      radius *
      Math.sin(phi) *
      Math.cos(theta);

    positions[i * 3 + 1] =
      radius *
      Math.cos(phi);

    positions[i * 3 + 2] =
      radius *
      Math.sin(phi) *
      Math.sin(theta);

    sizes[i] = random(1.0, 3.8);
    phases[i] = random(0, Math.PI * 2);
    brightness[i] = random(0.45, 1);
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  geometry.setAttribute(
    'aSize',
    new THREE.BufferAttribute(sizes, 1)
  );

  geometry.setAttribute(
    'aPhase',
    new THREE.BufferAttribute(phases, 1)
  );

  geometry.setAttribute(
    'aBrightness',
    new THREE.BufferAttribute(brightness, 1)
  );

  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,

    uniforms: {
      uTime: {
        value: 0,
      },
      uPixelRatio: {
        value: Math.min(
          window.devicePixelRatio,
          1.75
        ),
      },
    },

    vertexShader: `
      attribute float aSize;
      attribute float aPhase;
      attribute float aBrightness;

      uniform float uTime;
      uniform float uPixelRatio;

      varying float vBrightness;

      void main() {
        vec4 mvPosition =
          modelViewMatrix *
          vec4(position, 1.0);

        float twinkle =
          0.78 +
          0.22 *
          sin(uTime * 0.9 + aPhase);

        gl_PointSize =
          aSize *
          uPixelRatio *
          (260.0 / -mvPosition.z) *
          twinkle;

        gl_Position =
          projectionMatrix *
          mvPosition;

        vBrightness =
          aBrightness *
          twinkle;
      }
    `,

    fragmentShader: `
      varying float vBrightness;

      void main() {
        vec2 uv =
          gl_PointCoord -
          vec2(0.5);

        float dist =
          length(uv);

        if (dist > 0.5) discard;

        float soft =
          1.0 -
          smoothstep(
            0.05,
            0.5,
            dist
          );

        float glow =
          pow(
            soft,
            2.2
          );

        vec3 color =
          mix(
            vec3(0.72, 0.81, 1.0),
            vec3(1.0, 0.96, 1.0),
            soft
          );

        gl_FragColor =
          vec4(
            color,
            glow * vBrightness
          );
      }
    `,
  });

  return {
    points: new THREE.Points(
      geometry,
      material
    ),
    geometry,
    material,
  };
}

/* =========================================================
   HEART PARTICLES
   ========================================================= */

function heartEquation(t) {
  return {
    x:
      16 *
      Math.pow(
        Math.sin(t),
        3
      ),

    y:
      13 *
        Math.cos(t) -
      5 *
        Math.cos(2 * t) -
      2 *
        Math.cos(3 * t) -
      Math.cos(4 * t),
  };
}

function createHeartParticleData(
  count,
  scale = 0.88,
  edgeOnly = false
) {
  const positions = new Float32Array(
    count * 3
  );

  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const strengths = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const t =
      Math.random() *
      Math.PI *
      2;

    const heart =
      heartEquation(t);

    let fill;

    if (edgeOnly) {
      fill = random(
        0.96,
        1.04
      );
    } else {
      fill =
        Math.sqrt(
          Math.random()
        );
    }

    positions[i * 3] =
      heart.x *
      scale *
      fill +
      random(
        -0.16,
        0.16
      );

    positions[i * 3 + 1] =
      heart.y *
      scale *
      fill +
      random(
        -0.16,
        0.16
      );

    const depth =
      edgeOnly
        ? random(
            -0.55,
            0.55
          )
        : random(
            -1.8,
            1.8
          );

    positions[i * 3 + 2] =
      depth;

    sizes[i] = edgeOnly
      ? random(
          1.3,
          3.3
        )
      : random(
          1.0,
          3.2
        );

    phases[i] =
      random(
        0,
        Math.PI * 2
      );

    strengths[i] =
      random(
        0.55,
        1
      );
  }

  return {
    positions,
    sizes,
    phases,
    strengths,
  };
}

function createHeartParticles(
  count,
  scale,
  mode
) {
  const data =
    createHeartParticleData(
      count,
      scale,
      mode === 'edge'
    );

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      data.positions,
      3
    )
  );

  geometry.setAttribute(
    'aSize',
    new THREE.BufferAttribute(
      data.sizes,
      1
    )
  );

  geometry.setAttribute(
    'aPhase',
    new THREE.BufferAttribute(
      data.phases,
      1
    )
  );

  geometry.setAttribute(
    'aStrength',
    new THREE.BufferAttribute(
      data.strengths,
      1
    )
  );

  const material =
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,

      uniforms: {
        uTime: {
          value: 0,
        },
        uPixelRatio: {
          value: Math.min(
            window.devicePixelRatio,
            1.75
          ),
        },
        uMode: {
          value:
            mode === 'edge'
              ? 1
              : 0,
        },
      },

      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute float aStrength;

        uniform float uTime;
        uniform float uPixelRatio;

        varying float vStrength;

        void main() {
          vec4 mvPosition =
            modelViewMatrix *
            vec4(position, 1.0);

          float pulse =
            0.92 +
            0.12 *
            sin(
              uTime * 2.3 +
              aPhase
            );

          gl_PointSize =
            aSize *
            pulse *
            uPixelRatio *
            (280.0 / -mvPosition.z);

          gl_Position =
            projectionMatrix *
            mvPosition;

          vStrength =
            aStrength *
            pulse;
        }
      `,

      fragmentShader: `
        varying float vStrength;

        void main() {
          vec2 uv =
            gl_PointCoord -
            vec2(0.5);

          float dist =
            length(uv);

          if (dist > 0.5) discard;

          float soft =
            1.0 -
            smoothstep(
              0.03,
              0.5,
              dist
            );

          float core =
            1.0 -
            smoothstep(
              0.0,
              0.24,
              dist
            );

          vec3 outerColor =
            vec3(
              1.0,
              0.20,
              0.60
            );

          vec3 innerColor =
            vec3(
              1.0,
              0.72,
              0.92
            );

          vec3 color =
            mix(
              outerColor,
              innerColor,
              core
            );

          float alpha =
            soft *
            vStrength *
            0.96;

          gl_FragColor =
            vec4(
              color,
              alpha
            );
        }
      `,
    });

  return {
    points:
      new THREE.Points(
        geometry,
        material
      ),
    geometry,
    material,
  };
}

/* =========================================================
   HEART SPARKS
   ========================================================= */

function createHeartSparks() {
  const count =
    HEART_SPARK_COUNT;

  const positions =
    new Float32Array(
      count * 3
    );

  const sizes =
    new Float32Array(
      count
    );

  const phases =
    new Float32Array(
      count
    );

  for (
    let i = 0;
    i < count;
    i += 1
  ) {
    const t =
      Math.random() *
      Math.PI *
      2;

    const heart =
      heartEquation(t);

    const radius =
      random(
        0.94,
        1.3
      );

    positions[i * 3] =
      heart.x *
        0.88 *
        radius +
      random(
        -0.28,
        0.28
      );

    positions[i * 3 + 1] =
      heart.y *
        0.88 *
        radius +
      random(
        -0.28,
        0.28
      );

    positions[i * 3 + 2] =
      random(
        -2.2,
        2.2
      );

    sizes[i] =
      random(
        1.4,
        4
      );

    phases[i] =
      random(
        0,
        Math.PI * 2
      );
  }

  const geometry =
    new THREE.BufferGeometry();

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  geometry.setAttribute(
    'aSize',
    new THREE.BufferAttribute(
      sizes,
      1
    )
  );

  geometry.setAttribute(
    'aPhase',
    new THREE.BufferAttribute(
      phases,
      1
    )
  );

  const material =
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,

      uniforms: {
        uTime: {
          value: 0,
        },
        uPixelRatio: {
          value: Math.min(
            window.devicePixelRatio,
            1.75
          ),
        },
      },

      vertexShader: `
        attribute float aSize;
        attribute float aPhase;

        uniform float uTime;
        uniform float uPixelRatio;

        varying float vAlpha;

        void main() {
          vec4 mvPosition =
            modelViewMatrix *
            vec4(position, 1.0);

          float flicker =
            0.45 +
            0.55 *
            (
              0.5 +
              0.5 *
              sin(
                uTime * 2.2 +
                aPhase
              )
            );

          gl_PointSize =
            aSize *
            uPixelRatio *
            (260.0 / -mvPosition.z);

          gl_Position =
            projectionMatrix *
            mvPosition;

          vAlpha =
            flicker;
        }
      `,

      fragmentShader: `
        varying float vAlpha;

        void main() {
          vec2 uv =
            gl_PointCoord -
            vec2(0.5);

          float dist =
            length(uv);

          if (dist > 0.5)
            discard;

          float glow =
            1.0 -
            smoothstep(
              0.0,
              0.5,
              dist
            );

          gl_FragColor =
            vec4(
              1.0,
              0.82,
              0.96,
              glow * vAlpha
            );
        }
      `,
    });

  return {
    points:
      new THREE.Points(
        geometry,
        material
      ),
    geometry,
    material,
  };
}

/* =========================================================
   TEXT SPRITES
   ========================================================= */

function createTextSprite(
  text,
  scale = 1
) {
  const canvas =
    document.createElement(
      'canvas'
    );

  const context =
    canvas.getContext('2d');

  const width = 1600;
  const height = 240;

  canvas.width = width;
  canvas.height = height;

  context.clearRect(
    0,
    0,
    width,
    height
  );

  const cx =
    width / 2;
  const cy =
    height / 2;

  const boxWidth =
    width - 90;
  const boxHeight =
    118;

  const radius = 59;

  context.beginPath();

  context.roundRect(
    cx - boxWidth / 2,
    cy - boxHeight / 2,
    boxWidth,
    boxHeight,
    radius
  );

  const background =
    context.createLinearGradient(
      0,
      0,
      width,
      height
    );

  background.addColorStop(
    0,
    'rgba(18, 7, 29, 0.92)'
  );

  background.addColorStop(
    0.5,
    'rgba(34, 10, 41, 0.84)'
  );

  background.addColorStop(
    1,
    'rgba(12, 7, 24, 0.92)'
  );

  context.fillStyle =
    background;

  context.fill();

  context.lineWidth = 2;

  const border =
    context.createLinearGradient(
      0,
      0,
      width,
      0
    );

  border.addColorStop(
    0,
    'rgba(255, 126, 201, 0.12)'
  );

  border.addColorStop(
    0.5,
    'rgba(255, 175, 226, 0.48)'
  );

  border.addColorStop(
    1,
    'rgba(175, 111, 255, 0.12)'
  );

  context.strokeStyle =
    border;

  context.stroke();

  context.font =
    '600 43px Inter, Arial, sans-serif';

  context.textAlign =
    'center';

  context.textBaseline =
    'middle';

  context.shadowColor =
    'rgba(255, 71, 180, 0.65)';

  context.shadowBlur = 18;

  context.fillStyle =
    'rgba(255, 247, 253, 0.98)';

  context.fillText(
    text,
    cx,
    cy + 2,
    width - 150
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  texture.needsUpdate = true;

  const material =
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      depthTest: false,
      blending:
        THREE.NormalBlending,
    });

  const sprite =
    new THREE.Sprite(
      material
    );

  sprite.scale.set(
    7.0 * scale,
    1.05 * scale,
    1
  );

  sprite.userData.texture =
    texture;

  return sprite;
}

/* =========================================================
   ORBITS
   ========================================================= */

function createEllipsePoints(
  radius,
  verticalScale = 0.42,
  segments = 360
) {
  const points = [];

  for (
    let i = 0;
    i < segments;
    i += 1
  ) {
    const angle =
      (i / segments) *
      Math.PI *
      2;

    points.push(
      new THREE.Vector3(
        Math.cos(angle) *
          radius,
        Math.sin(angle) *
          radius *
          verticalScale,
        0
      )
    );
  }

  return points;
}

function createOrbitRing(
  radius,
  color,
  opacity
) {
  const group =
    new THREE.Group();

  const curvePoints =
    createEllipsePoints(
      radius,
      random(
        0.38,
        0.48
      ),
      420
    );

  const curve =
    new THREE.CatmullRomCurve3(
      curvePoints,
      true
    );

  const outerGeometry =
    new THREE.TubeGeometry(
      curve,
      420,
      0.055,
      6,
      true
    );

  const outerMaterial =
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,
    });

  const outer =
    new THREE.Mesh(
      outerGeometry,
      outerMaterial
    );

  const glowGeometry =
    new THREE.TubeGeometry(
      curve,
      420,
      0.15,
      6,
      true
    );

  const glowMaterial =
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: opacity * 0.22,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,
    });

  const glow =
    new THREE.Mesh(
      glowGeometry,
      glowMaterial
    );

  group.add(
    glow,
    outer
  );

  group.rotation.x =
    random(
      0.12,
      0.38
    );

  group.rotation.y =
    random(
      0,
      Math.PI
    );

  group.rotation.z =
    random(
      -0.28,
      0.28
    );

  group.userData = {
    rotationSpeed:
      random(
        0.00018,
        0.00065
      ) *
      (Math.random() > 0.5
        ? 1
        : -1),
    baseOpacity: opacity,
    outerMaterial,
    glowMaterial,
    glow,
  };

  return {
    group,
    geometries: [
      outerGeometry,
      glowGeometry,
    ],
    materials: [
      outerMaterial,
      glowMaterial,
    ],
  };
}

/* =========================================================
   DUST
   ========================================================= */

function createDustDisk() {
  const count = 2600;

  const geometry =
    new THREE.BufferGeometry();

  const positions =
    new Float32Array(
      count * 3
    );

  const sizes =
    new Float32Array(
      count
    );

  const phases =
    new Float32Array(
      count
    );

  for (
    let i = 0;
    i < count;
    i += 1
  ) {
    const radius =
      Math.pow(
        Math.random(),
        0.58
      ) * 35 + 5;

    const angle =
      random(
        0,
        Math.PI * 2
      );

    positions[i * 3] =
      Math.cos(angle) *
      radius;

    positions[i * 3 + 1] =
      random(
        -0.7,
        0.7
      );

    positions[i * 3 + 2] =
      Math.sin(angle) *
      radius *
      0.42;

    sizes[i] =
      random(
        0.7,
        2.4
      );

    phases[i] =
      random(
        0,
        Math.PI * 2
      );
  }

  geometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
      positions,
      3
    )
  );

  geometry.setAttribute(
    'aSize',
    new THREE.BufferAttribute(
      sizes,
      1
    )
  );

  geometry.setAttribute(
    'aPhase',
    new THREE.BufferAttribute(
      phases,
      1
    )
  );

  const material =
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,

      uniforms: {
        uTime: {
          value: 0,
        },
        uPixelRatio: {
          value: Math.min(
            window.devicePixelRatio,
            1.75
          ),
        },
      },

      vertexShader: `
        attribute float aSize;
        attribute float aPhase;

        uniform float uTime;
        uniform float uPixelRatio;

        varying float vAlpha;

        void main() {
          vec4 mvPosition =
            modelViewMatrix *
            vec4(position, 1.0);

          float flicker =
            0.55 +
            0.45 *
            sin(
              uTime * 0.6 +
              aPhase
            );

          gl_PointSize =
            aSize *
            uPixelRatio *
            (190.0 / -mvPosition.z);

          gl_Position =
            projectionMatrix *
            mvPosition;

          vAlpha =
            flicker;
        }
      `,

      fragmentShader: `
        varying float vAlpha;

        void main() {
          vec2 uv =
            gl_PointCoord -
            vec2(0.5);

          float dist =
            length(uv);

          if (dist > 0.5)
            discard;

          float glow =
            1.0 -
            smoothstep(
              0.02,
              0.5,
              dist
            );

          gl_FragColor =
            vec4(
              1.0,
              0.34,
              0.76,
              glow *
              vAlpha *
              0.32
            );
        }
      `,
    });

  const points =
    new THREE.Points(
      geometry,
      material
    );

  points.rotation.x =
    Math.PI * 0.1;

  return {
    points,
    geometry,
    material,
  };
}

/* =========================================================
   CENTER GLOW
   ========================================================= */

function createCenterGlow() {
  const canvas =
    document.createElement(
      'canvas'
    );

  canvas.width = 1024;
  canvas.height = 1024;

  const context =
    canvas.getContext('2d');

  const gradient =
    context.createRadialGradient(
      512,
      512,
      0,
      512,
      512,
      512
    );

  gradient.addColorStop(
    0,
    'rgba(255,245,255,0.98)'
  );

  gradient.addColorStop(
    0.05,
    'rgba(255,164,222,0.86)'
  );

  gradient.addColorStop(
    0.14,
    'rgba(255,77,185,0.58)'
  );

  gradient.addColorStop(
    0.32,
    'rgba(210,70,255,0.25)'
  );

  gradient.addColorStop(
    0.58,
    'rgba(113,74,255,0.08)'
  );

  gradient.addColorStop(
    1,
    'rgba(0,0,0,0)'
  );

  context.fillStyle =
    gradient;

  context.fillRect(
    0,
    0,
    1024,
    1024
  );

  const texture =
    new THREE.CanvasTexture(
      canvas
    );

  texture.colorSpace =
    THREE.SRGBColorSpace;

  const material =
    new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
      blending:
        THREE.AdditiveBlending,
    });

  const sprite =
    new THREE.Sprite(
      material
    );

  sprite.scale.set(
    31,
    31,
    1
  );

  return {
    sprite,
    texture,
    material,
  };
}

/* =========================================================
   RESET BUTTON
   ========================================================= */

function createResetButton(
  container,
  resetView
) {
  const button =
    document.createElement(
      'button'
    );

  button.className =
    'love-universe-reset';

  button.type =
    'button';

  button.textContent =
    'Сбросить вид';

  button.addEventListener(
    'click',
    resetView
  );

  container.appendChild(
    button
  );

  return button;
}

/* =========================================================
   MAIN
   ========================================================= */

export default function LoveUniverse({
  onBack,
}) {
  const containerRef =
    useRef(null);

  const rendererRef =
    useRef(null);

  const animationFrameRef =
    useRef(null);

  const [stage, setStage] =
    useState('intro');

  const [showControls, setShowControls] =
    useState(true);

  const handleEnter = () => {
    setStage('flight');
  };

  useEffect(() => {
    if (
      stage !== 'flight'
    ) {
      return undefined;
    }

    return undefined;
  }, [stage]);

  useEffect(() => {
    if (
      stage !== 'universe' ||
      !containerRef.current
    ) {
      return undefined;
    }

    const container =
      containerRef.current;

    const scene =
      new THREE.Scene();

    scene.background =
      new THREE.Color(
        0x010008
      );

    const camera =
      new THREE.PerspectiveCamera(
        52,
        window.innerWidth /
          window.innerHeight,
        0.1,
        600
      );

    camera.position.set(
      0,
      0,
      42
    );

    const renderer =
      new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference:
          'high-performance',
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        1.75
      )
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.toneMapping =
      THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure =
      1.1;

    container.innerHTML = '';
    container.appendChild(
      renderer.domElement
    );

    rendererRef.current =
      renderer;

    /* =====================================================
       UNIVERSE GROUP
       ===================================================== */

    const universe =
      new THREE.Group();

    scene.add(
      universe
    );

    /* =====================================================
       LIGHTS
       ===================================================== */

    const ambientLight =
      new THREE.AmbientLight(
        0x513050,
        0.45
      );

    scene.add(
      ambientLight
    );

    const pinkLight =
      new THREE.PointLight(
        0xff5bb6,
        20,
        80
      );

    pinkLight.position.set(
      0,
      1,
      5
    );

    scene.add(
      pinkLight
    );

    const purpleLight =
      new THREE.PointLight(
        0x8c63ff,
        16,
        75
      );

    purpleLight.position.set(
      5,
      -5,
      -5
    );

    scene.add(
      purpleLight
    );

    /* =====================================================
       STARS
       ===================================================== */

    const starField =
      createStarField();

    universe.add(
      starField.points
    );

    /* =====================================================
       CENTER GLOW
       ===================================================== */

    const centerGlow =
      createCenterGlow();

    universe.add(
      centerGlow.sprite
    );

    /* =====================================================
       HEART
       ===================================================== */

    const heart =
      createHeartParticles(
        HEART_COUNT,
        0.9,
        'fill'
      );

    heart.points.position.y =
      -0.6;

    universe.add(
      heart.points
    );

    const heartEdge =
      createHeartParticles(
        HEART_EDGE_COUNT,
        0.92,
        'edge'
      );

    heartEdge.points.position.y =
      -0.6;

    universe.add(
      heartEdge.points
    );

    const heartSparks =
      createHeartSparks();

    heartSparks.points.position.y =
      -0.6;

    universe.add(
      heartSparks.points
    );

    /* =====================================================
       DUST
       ===================================================== */

    const dust =
      createDustDisk();

    universe.add(
      dust.points
    );

    /* =====================================================
       ORBITS
       ===================================================== */

    const orbitDefinitions = [
      {
        radius: 13.5,
        color: 0xff64bd,
        opacity: 0.42,
      },
      {
        radius: 17.5,
        color: 0xff8bd1,
        opacity: 0.34,
      },
      {
        radius: 22,
        color: 0xbf70ff,
        opacity: 0.32,
      },
      {
        radius: 28,
        color: 0x8c76ff,
        opacity: 0.28,
      },
      {
        radius: 34,
        color: 0xffb6e8,
        opacity: 0.22,
      },
    ];

    const orbitObjects =
      [];

    orbitDefinitions.forEach(
      (definition) => {
        const orbit =
          createOrbitRing(
            definition.radius,
            definition.color,
            definition.opacity
          );

        universe.add(
          orbit.group
        );

        orbitObjects.push(
          orbit
        );
      }
    );

    /* =====================================================
       PHRASES
       ===================================================== */

    const phraseGroup =
      new THREE.Group();

    universe.add(
      phraseGroup
    );

    const orbitSettings = [
      {
        radius: 13.4,
        speed: 0.00022,
        y: 0.3,
      },
      {
        radius: 17.3,
        speed: -0.00016,
        y: 0.65,
      },
      {
        radius: 21.8,
        speed: 0.00012,
        y: -0.5,
      },
      {
        radius: 27.7,
        speed: -0.000085,
        y: 1.0,
      },
      {
        radius: 33.5,
        speed: 0.00007,
        y: -1.15,
      },
    ];

    const phraseObjects =
      [];

    ROMANTIC_PHRASES.forEach(
      (phrase, index) => {
        const orbitIndex =
          index %
          PHRASE_ORBITS;

        const settings =
          orbitSettings[
            orbitIndex
          ];

        const sprite =
          createTextSprite(
            phrase,
            index % 4 === 0
              ? 1.0
              : 0.8
          );

        const angle =
          (index /
            ROMANTIC_PHRASES.length) *
          Math.PI *
          2 *
          2.4;

        sprite.position.set(
          Math.cos(angle) *
            settings.radius,

          settings.y +
            Math.sin(
              angle * 1.7
            ) *
              1.5,

          Math.sin(angle) *
            settings.radius *
            0.42
        );

        sprite.userData = {
          angle,
          radius:
            settings.radius,
          speed:
            settings.speed,
          y: settings.y,
          phase:
            random(
              0,
              Math.PI * 2
            ),
          orbitIndex,
          texture:
            sprite.userData.texture,
        };

        phraseGroup.add(
          sprite
        );

        phraseObjects.push(
          sprite
        );
      }
    );

    /* =====================================================
       TITLE
       ===================================================== */

    const title =
      createTextSprite(
        'TE AMO ❤',
        1.55
      );

    title.position.set(
      0,
      14.7,
      0
    );

    title.material.opacity =
      0.96;

    universe.add(
      title
    );

    const subtitle =
      createTextSprite(
        'nuestro universo',
        0.72
      );

    subtitle.position.set(
      0,
      13.15,
      0
    );

    subtitle.material.opacity =
      0.68;

    universe.add(
      subtitle
    );

    /* =====================================================
       INTERACTION
       ===================================================== */

    const pointer = {
      down: false,
      lastX: 0,
      lastY: 0,
    };

    let rotationX = 0;
    let rotationY = 0;

    let velocityX = 0;
    let velocityY = 0;

    const autoRotation =
      0.0004;

    const onPointerDown = (
      event
    ) => {
      pointer.down =
        true;

      pointer.lastX =
        event.clientX;

      pointer.lastY =
        event.clientY;

      renderer.domElement.setPointerCapture?.(
        event.pointerId
      );
    };

    const onPointerMove = (
      event
    ) => {
      if (
        !pointer.down
      ) {
        return;
      }

      const dx =
        event.clientX -
        pointer.lastX;

      const dy =
        event.clientY -
        pointer.lastY;

      pointer.lastX =
        event.clientX;

      pointer.lastY =
        event.clientY;

      velocityY =
        dx * 0.003;

      velocityX =
        dy * 0.003;

      rotationY +=
        dx * 0.003;

      rotationX +=
        dy * 0.003;

      rotationX =
        THREE.MathUtils.clamp(
          rotationX,
          -0.75,
          0.75
        );
    };

    const onPointerUp = (
      event
    ) => {
      pointer.down =
        false;

      renderer.domElement.releasePointerCapture?.(
        event.pointerId
      );
    };

    const onWheel = (
      event
    ) => {
      event.preventDefault();

      camera.position.z +=
        event.deltaY * 0.018;

      camera.position.z =
        THREE.MathUtils.clamp(
          camera.position.z,
          25,
          68
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
      {
        passive: false,
      }
    );

    /* =====================================================
       RESET
       ===================================================== */

    const resetView =
      () => {
        camera.position.set(
          0,
          0,
          42
        );

        rotationX = 0;
        rotationY = 0;

        velocityX = 0;
        velocityY = 0;
      };

    const resetButton =
      createResetButton(
        container,
        resetView
      );

    /* =====================================================
       ANIMATION
       ===================================================== */

    let time = 0;

    const animate =
      () => {
        animationFrameRef.current =
          requestAnimationFrame(
            animate
          );

        time +=
          0.016;

        if (
          !pointer.down
        ) {
          rotationY +=
            autoRotation;
        }

        rotationY +=
          velocityY;

        rotationX +=
          velocityX;

        velocityY *=
          0.94;

        velocityX *=
          0.94;

        universe.rotation.y =
          rotationY;

        universe.rotation.x =
          rotationX;

        /* Stars */
        starField.material.uniforms.uTime.value =
          time;

        /* Heart */
        heart.material.uniforms.uTime.value =
          time;

        heartEdge.material.uniforms.uTime.value =
          time;

        heartSparks.material.uniforms.uTime.value =
          time;

        heart.points.rotation.z =
          Math.sin(
            time * 0.5
          ) *
          0.012;

        heartEdge.points.rotation.z =
          Math.sin(
            time * 0.5 +
              0.4
          ) *
          0.015;

        heartSparks.points.rotation.z =
          Math.sin(
            time * 0.5 +
              0.8
          ) *
          0.02;

        const heartPulse =
          1 +
          Math.sin(
            time * 2.4
          ) *
            0.035;

        heart.points.scale.setScalar(
          heartPulse
        );

        heartEdge.points.scale.setScalar(
          1 +
            Math.sin(
              time * 2.4 +
                0.5
            ) *
              0.06
        );

        heartSparks.points.scale.setScalar(
          1 +
            Math.sin(
              time * 2.8
            ) *
              0.08
        );

        /* Center glow */
        centerGlow.material.opacity =
          0.62 +
          Math.sin(
            time * 1.25
          ) *
            0.1;

        centerGlow.sprite.scale.setScalar(
          1 +
            Math.sin(
              time * 1.25
            ) *
              0.045
        );

        /* Dust */
        dust.material.uniforms.uTime.value =
          time;

        dust.points.rotation.y +=
          0.0008;

        dust.points.rotation.z +=
          0.00025;

        /* Stars rotation */
        starField.points.rotation.y +=
          0.000018;

        starField.points.rotation.x +=
          0.000008;

        /* Orbits */
        orbitObjects.forEach(
          (orbit, index) => {
            orbit.group.rotation.y +=
              orbit.group.userData
                .rotationSpeed;

            orbit.group.rotation.z +=
              orbit.group.userData
                .rotationSpeed *
              0.16;

            const pulse =
              0.84 +
              Math.sin(
                time *
                  (0.55 +
                    index *
                      0.08)
              ) *
                0.16;

            orbit.group.userData
              .outerMaterial.opacity =
              orbit.group.userData
                .baseOpacity *
              pulse;

            orbit.group.userData
              .glowMaterial.opacity =
              orbit.group.userData
                .baseOpacity *
              0.22 *
              pulse;
          }
        );

        /* Phrases */
        phraseObjects.forEach(
          (sprite) => {
            const data =
              sprite.userData;

            data.angle +=
              data.speed * 16;

            sprite.position.x =
              Math.cos(
                data.angle
              ) *
              data.radius;

            sprite.position.z =
              Math.sin(
                data.angle
              ) *
              data.radius *
              0.42;

            sprite.position.y =
              data.y +
              Math.sin(
                time * 0.45 +
                  data.phase
              ) *
                0.65;

            const distance =
              Math.sqrt(
                sprite.position.x **
                  2 +
                sprite.position.z **
                  2
              );

            const scale =
              THREE.MathUtils.clamp(
                1.18 -
                  distance / 52,
                0.76,
                1.05
              );

            sprite.scale.set(
              7.0 * scale,
              1.05 * scale,
              1
            );

            sprite.material.opacity =
              0.72 +
              Math.sin(
                time * 0.65 +
                  data.phase
              ) *
                0.12;
          }
        );

        /* Title */
        title.position.y =
          14.7 +
          Math.sin(
            time * 0.85
          ) *
            0.22;

        subtitle.position.y =
          13.15 +
          Math.sin(
            time * 0.85 +
              0.7
          ) *
            0.12;

        renderer.render(
          scene,
          camera
        );
      };

    /* =====================================================
       RESIZE
       ===================================================== */

    const onResize =
      () => {
        const width =
          window.innerWidth;

        const height =
          window.innerHeight;

        camera.aspect =
          width / height;

        camera.updateProjectionMatrix();

        renderer.setSize(
          width,
          height
        );

        const ratio =
          Math.min(
            window.devicePixelRatio,
            1.75
          );

        starField.material.uniforms.uPixelRatio.value =
          ratio;

        heart.material.uniforms.uPixelRatio.value =
          ratio;

        heartEdge.material.uniforms.uPixelRatio.value =
          ratio;

        heartSparks.material.uniforms.uPixelRatio.value =
          ratio;

        dust.material.uniforms.uPixelRatio.value =
          ratio;
      };

    window.addEventListener(
      'resize',
      onResize
    );

    animate();

    /* =====================================================
       CLEANUP
       ===================================================== */

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

      /* stars */
      starField.geometry.dispose();
      starField.material.dispose();

      /* heart */
      heart.geometry.dispose();
      heart.material.dispose();

      heartEdge.geometry.dispose();
      heartEdge.material.dispose();

      heartSparks.geometry.dispose();
      heartSparks.material.dispose();

      /* dust */
      dust.geometry.dispose();
      dust.material.dispose();

      /* glow */
      centerGlow.texture.dispose();
      centerGlow.material.dispose();

      /* orbits */
      orbitObjects.forEach(
        (orbit) => {
          orbit.geometries.forEach(
            (geometry) =>
              geometry.dispose()
          );

          orbit.materials.forEach(
            (material) =>
              material.dispose()
          );
        }
      );

      /* text */
      phraseObjects.forEach(
        (sprite) => {
          sprite.userData.texture?.dispose();
          sprite.material.map?.dispose();
          sprite.material.dispose();
        }
      );

      title.userData.texture?.dispose();
      title.material.map?.dispose();
      title.material.dispose();

      subtitle.userData.texture?.dispose();
      subtitle.material.map?.dispose();
      subtitle.material.dispose();

      renderer.dispose();

      container.innerHTML = '';

      rendererRef.current =
        null;
    };
  }, [stage]);

  return (
    <div className="love-universe-page">
      {stage === 'intro' && (
        <UniverseIntro
          onEnter={handleEnter}
          onBack={onBack}
        />
      )}

      {stage === 'flight' && (
        <SpaceFlight
          duration={3200}
          onComplete={() => {
            setStage(
              'universe'
            );
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
              onClick={onBack}
            >
              ← Назад
            </button>

            {showControls && (
              <div className="love-universe-hint">
                <div>
                  Перетаскивание —
                  вращение
                </div>

                <div>
                  Колесо —
                  приближение
                </div>
              </div>
            )}

            <button
              type="button"
              className="love-universe-help"
              onClick={() => {
                setShowControls(
                  (value) =>
                    !value
                );
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