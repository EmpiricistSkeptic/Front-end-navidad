import React, { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';

// --- 1. ИМПОРТ ФОТОГРАФИЙ ---

// Категория: Мы (Nosotros)
import photo_us_1 from '../assets/us.png';
import photo_us_2 from '../assets/fotoconjunta.jpg';
import photo_us_3 from '../assets/nuestroprimerabrazo.jpg';
import photo_us_4 from '../assets/primercorazon.jpg';
import photo_us_5 from '../assets/segundocorazon.jpg';
import photo_us_6 from '../assets/tercercorazon.jpg';
import photo_us_7 from '../assets/tuprimerdíaenelgimnasio.jpg';
import photo_us_8 from '../assets/teñidodelcabello.jpg';
import photo_us_9 from '../assets/viajeavenezuela.jpg';
import photo_us_10 from '../assets/eresfestivo.jpg';
// Исправил дубликаты имен переменных ниже:
import photo_us_11 from '../assets/calcetines.jpg';
import photo_us_12 from '../assets/camera.jpg';
import photo_us_13 from '../assets/videollamada1.jpg';
import photo_us_14 from '../assets/videollamada2.jpg';
import photo_us_15 from '../assets/videollamada3.jpg';
import photo_us_16 from '../assets/videollamada4.jpg';
import photo_us_17 from '../assets/camera1.jpg';
import photo_us_18 from '../assets/musculos.jpg';
import photo_us_19 from '../assets/primeravezenunnuevotrabajo.jpg';
import photo_us_20 from '../assets/lesbiana.jpg';
import photo_us_21 from '../assets/fun.jpg';
import photo_us_22 from '../assets/fun2.jpg';
import photo_us_23 from '../assets/bebes.jpg';
import photo_us_24 from '../assets/baby.jpg';
import photo_us_25 from '../assets/cara.jpg';
import photo_us_26 from '../assets/cara2.jpg';
import photo_us_27 from '../assets/cara3.jpg';
import photo_us_28 from '../assets/cara4.jpg';
import photo_us_29 from '../assets/cara5.jpg';
import photo_us_30 from '../assets/cara6.jpg';
import photo_us_31 from '../assets/corazon.jpg';
import photo_us_32 from '../assets/tongue.jpg';
import photo_us_33 from '../assets/tongue1.jpg';
import photo_us_34 from '../assets/ojo.jpg';
import photo_us_35 from '../assets/linda.jpg';
import photo_us_36 from '../assets/linda1.jpg';
import photo_us_37 from '../assets/linda2.jpg';
import photo_us_38 from '../assets/linda3.jpg';
import photo_us_39 from '../assets/linda4.jpg';
import photo_us_40 from '../assets/linda5.jpg';
import photo_us_41 from '../assets/linda6.jpg';
import photo_us_42 from '../assets/linda7.jpg';
import photo_us_43 from '../assets/linda8.jpg';
import photo_us_44 from '../assets/paraella.jpg';
import photo_us_45 from '../assets/conmiamor.jpg';
import photo_us_46 from '../assets/p1.jpg';
import photo_us_47 from '../assets/p2.jpg';
import photo_us_48 from '../assets/p3.jpg';
import photo_us_49 from '../assets/p4.jpg';
import photo_us_50 from '../assets/p5.jpg';
import photo_us_51 from '../assets/p6.jpg';
import photo_us_52 from '../assets/p7.jpg';
import photo_us_53 from '../assets/p8.jpg';
import photo_us_54 from '../assets/p9.jpg';
import photo_us_55 from '../assets/p10.jpg';
import photo_us_56 from '../assets/p11.jpg';
import photo_us_57 from '../assets/p12.jpg';
import photo_us_58 from '../assets/p13.jpg';
import photo_us_59 from '../assets/p14.jpg';
import photo_us_60 from '../assets/p15.jpg';
import photo_us_61 from '../assets/p16.jpg';
import photo_us_62 from '../assets/p17.jpg';
import photo_us_63 from '../assets/p18.jpg';
import photo_us_64 from '../assets/p19.jpg';
import photo_us_65 from '../assets/p20.jpg';
import photo_us_66 from '../assets/p21.jpg';
import photo_us_67 from '../assets/p22.jpg';
import photo_us_68 from '../assets/p23.jpg';
import photo_us_69 from '../assets/p24.jpg';
import photo_us_70 from '../assets/p25.jpg';
import photo_us_71 from '../assets/p26.jpg';
import photo_us_72 from '../assets/p27.jpg';
import photo_us_73 from '../assets/p28.jpg';
import photo_us_74 from '../assets/p29.jpg';
import photo_us_75 from '../assets/p30.jpg';
import photo_us_76 from '../assets/p31.jpg';
import photo_us_77 from '../assets/p32.jpg';
import photo_us_78 from '../assets/p33.jpg';
import photo_us_79 from '../assets/p34.jpg';
import photo_us_80 from '../assets/p35.jpg';
import photo_us_81 from '../assets/p36.jpg';
import photo_us_82 from '../assets/p37.jpg';
import photo_us_83 from '../assets/p38.jpg';
import photo_us_84 from '../assets/p39.jpg';
import photo_us_85 from '../assets/p40.jpg';



// Категория: Её рисунки (Sus Dibujos / Su Arte)
import photo_her_art_1 from '../assets/dibujonosotros.jpg';
import photo_her_art_2 from '../assets/figura1.jpg';
import photo_her_art_4 from '../assets/figura3.jpg';
import photo_her_art_5 from '../assets/figura4.jpg';
import photo_her_art_6 from '../assets/figura5.jpg';
import photo_her_art_7 from '../assets/figura6.jpg';
import photo_her_art_8 from '../assets/Figura7.jpg';
import photo_her_art_9 from '../assets/Figura8.jpg';
import photo_her_art_10 from '../assets/figura9.jpg';
import photo_her_art_11 from '../assets/figura10.jpg';

// Категория: Животные (Animales)
import photo_animals_1 from '../assets/rana.jpg';
import photo_animals_2 from '../assets/banda.jpg';
import photo_animals_3 from '../assets/stas.jpg';
import photo_animals_4 from '../assets/viunchik.jpg';
import photo_animals_5 from '../assets/viunchik1.jpg';
import photo_animals_6 from '../assets/hiroshima.jpg';
import photo_animals_7 from '../assets/hiroshima1.jpg';
import photo_animals_8 from '../assets/baron.jpg';
import photo_animals_9 from '../assets/baron1.jpg';
import photo_animals_10 from '../assets/lapatapilar.jpg';
import photo_animals_11 from '../assets/lucky.jpg';
import photo_animals_12 from '../assets/malytka.jpg';
import photo_animals_13 from '../assets/blanco.jpg';


// --- 2. НАСТРОЙКА КАТЕГОРИЙ И ПОДПИСЕЙ ---
const categorizedPhotos = {
  "nosotros": [ 
    { id: 1, src: photo_us_1, caption: 'Nosotros ❤️' },
    { id: 2, src: photo_us_2, caption: 'Juntos es mejor ✨' },
    { id: 3, src: photo_us_3, caption: 'Nuestro primer abrazo 🫂' },
    { id: 4, src: photo_us_4, caption: 'Primer corazón' },
    { id: 5, src: photo_us_5, caption: 'El amor crece' },
    { id: 6, src: photo_us_6, caption: 'Corazón latiente' },
    { id: 7, src: photo_us_7, caption: 'Tu primer día de gym 💪' },
    { id: 8, src: photo_us_8, caption: 'Cambio de look 💇‍♀️' },
    { id: 9, src: photo_us_9, caption: 'Viaje a Venezuela 🇻🇪' },
    { id: 10, src: photo_us_10, caption: 'Eres mi fiesta 🎉' },
    { id: 11, src: photo_us_11, caption: 'Calcetines tiernos 🧦' },
    { id: 12, src: photo_us_12, caption: 'Capturando momentos 📸' },
    { id: 13, src: photo_us_13, caption: 'Videollamada con amor' },
    { id: 14, src: photo_us_14, caption: 'Cerca a la distancia' },
    { id: 15, src: photo_us_15, caption: 'Your name' },
    { id: 16, src: photo_us_16, caption: 'Conexión digital' },
    { id: 17, src: photo_us_17, caption: 'Sonríe para mí' },
    { id: 18, src: photo_us_18, caption: 'Musculos' },
    { id: 19, src: photo_us_19, caption: 'Nuevo trabajo' },
    { id: 20, src: photo_us_20, caption: 'Tu primer desfile del orgullo gay' },
    { id: 21, src: photo_us_21, caption: 'Mentira' },
    { id: 22, src: photo_us_22, caption: 'Pista' },
    { id: 23, src: photo_us_23, caption: 'Mis bebes❤️' },
    { id: 24, src: photo_us_24, caption: '❤️' },
    { id: 25, src: photo_us_25, caption: '' },
    { id: 26, src: photo_us_26, caption: '' },
    { id: 27, src: photo_us_27, caption: '' },
    { id: 28, src: photo_us_28, caption: '' },
    { id: 29, src: photo_us_29, caption: '' },
    { id: 30, src: photo_us_30, caption: '' },
    { id: 31, src: photo_us_31, caption: '' },
    { id: 32, src: photo_us_32, caption: '' },
    { id: 33, src: photo_us_33, caption: '' },
    { id: 34, src: photo_us_34, caption: '' },
    { id: 35, src: photo_us_35, caption: '' },
    { id: 36, src: photo_us_36, caption: '' },
    { id: 37, src: photo_us_37, caption: '' },
    { id: 38, src: photo_us_38, caption: '' },
    { id: 39, src: photo_us_39, caption: '' },
    { id: 40, src: photo_us_40, caption: '' },
    { id: 41, src: photo_us_41, caption: '' },
    { id: 42, src: photo_us_42, caption: '' },
    { id: 43, src: photo_us_43, caption: '' },
    { id: 44, src: photo_us_44, caption: '❤️' },
    { id: 45, src: photo_us_45, caption: 'Con mi amorcito❤️' },
    { id: 46, src: photo_us_46, caption: '' },
    { id: 47, src: photo_us_47, caption: '' },
    { id: 48, src: photo_us_48, caption: '' },
    { id: 49, src: photo_us_49, caption: '' },
    { id: 50, src: photo_us_50, caption: '' },
    { id: 51, src: photo_us_51, caption: '' },
    { id: 52, src: photo_us_52, caption: '' },
    { id: 53, src: photo_us_53, caption: '' },
    { id: 54, src: photo_us_54, caption: '' },
    { id: 55, src: photo_us_55, caption: '' },
    { id: 56, src: photo_us_56, caption: '' },
    { id: 57, src: photo_us_57, caption: '' },
    { id: 58, src: photo_us_58, caption: '' },
    { id: 59, src: photo_us_59, caption: '' },
    { id: 60, src: photo_us_60, caption: '' },
    { id: 61, src: photo_us_61, caption: '' },
    { id: 62, src: photo_us_62, caption: '' },
    { id: 63, src: photo_us_63, caption: '' },
    { id: 64, src: photo_us_64, caption: '' },
    { id: 65, src: photo_us_65, caption: '' },
    { id: 66, src: photo_us_66, caption: '' },
    { id: 67, src: photo_us_67, caption: '' },
    { id: 68, src: photo_us_68, caption: '' },
    { id: 69, src: photo_us_69, caption: '' },
    { id: 70, src: photo_us_70, caption: '' },
    { id: 71, src: photo_us_71, caption: '' },
    { id: 72, src: photo_us_72, caption: '' },
    { id: 73, src: photo_us_73, caption: '' },
    { id: 74, src: photo_us_74, caption: '' },
    { id: 75, src: photo_us_75, caption: '' },
    { id: 76, src: photo_us_76, caption: '' },
    { id: 77, src: photo_us_77, caption: '' },
    { id: 78, src: photo_us_78, caption: '' },
    { id: 79, src: photo_us_79, caption: '' },
    { id: 80, src: photo_us_80, caption: '' },
    { id: 81, src: photo_us_81, caption: '' },
    { id: 82, src: photo_us_82, caption: '' },
    { id: 83, src: photo_us_83, caption: '' },
    { id: 84, src: photo_us_84, caption: '' },
    { id: 85, src: photo_us_85, caption: '' },
    
  ],
  "sus_dibujos": [
    { id: 101, src: photo_her_art_1, caption: 'Dibujo de nosotros 🎨' },
    { id: 102, src: photo_her_art_2, caption: 'Figura Mágica 1' },
    { id: 104, src: photo_her_art_4, caption: 'Figura Mágica 3' },
    { id: 105, src: photo_her_art_5, caption: 'Figura Mágica 4' },
    { id: 106, src: photo_her_art_6, caption: 'Figura Mágica 5' },
    { id: 107, src: photo_her_art_7, caption: 'Figura Mágica 6' },
    { id: 108, src: photo_her_art_8, caption: 'Figura Mágica 7' },
    { id: 109, src: photo_her_art_9, caption: 'Figura Mágica 8' },
    { id: 110, src: photo_her_art_10, caption: 'Figura Mágica 9' },
    { id: 111, src: photo_her_art_11, caption: 'Obra Maestra' },
  ],
  "animales": [
    { id: 201, src: photo_animals_1, caption: 'La Ranita 🐸' },
    { id: 202, src: photo_animals_2, caption: 'Banda' },
    { id: 203, src: photo_animals_3, caption: 'Stas' },
    { id: 204, src: photo_animals_4, caption: 'Viunchik' },
    { id: 205, src: photo_animals_5, caption: 'Viunchik again' },
    { id: 206, src: photo_animals_6, caption: 'Hiroshima' },
    { id: 207, src: photo_animals_7, caption: 'Hiroshima again' },
    { id: 208, src: photo_animals_8, caption: 'Baron' },
    { id: 209, src: photo_animals_9, caption: 'Baron grosero' },
    { id: 210, src: photo_animals_10, caption: 'La pata Pilar' },
    { id: 211, src: photo_animals_11, caption: 'Lucky' },
    { id: 212, src: photo_animals_12, caption: 'Baby' },
    { id: 213, src: photo_animals_13, caption: 'Blanco' },

  ],
};

// Порядок отображения категорий на экране
const categoriesOrder = ["nosotros", "sus_dibujos", "animales"];

// Título legible + ícono suave para cada categoría
const CATEGORY_META = {
  nosotros: { title: 'Nosotros', icon: '❤' },
  sus_dibujos: { title: 'Tu Arte', icon: '✎' },
  animales: { title: 'Amigos y Animales', icon: '✦' },
};

// Rotaciones sutiles y deterministas para el efecto "tablón de fotos" (sin Math.random en cada render)
const TILT_SEQUENCE = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.1, -2.6, 1.9, -1.4, 2.1];

const galleryStyles = `
  .night-album-wrapper {
    position: relative;
    min-height: 100vh;
    width: 100%;
    padding: 0 0 90px 0;
    box-sizing: border-box;
    overflow-x: hidden;
    background:
      radial-gradient(ellipse at 20% 0%, rgba(120, 40, 70, 0.28), transparent 55%),
      radial-gradient(ellipse at 85% 15%, rgba(90, 50, 120, 0.22), transparent 50%),
      radial-gradient(ellipse at 50% 100%, rgba(60, 35, 90, 0.25), transparent 60%),
      linear-gradient(180deg, #07050d 0%, #0b0714 35%, #0a0510 100%);
    font-family: Georgia, 'Times New Roman', serif;
    color: #ECE3D6;
  }

  /* ---------- Гирлянда ---------- */
  .cozy-lights {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 22px;
    padding: 22px 16px 10px;
    z-index: 2;
  }
  .cozy-lights::before {
    content: '';
    position: absolute;
    top: 30px;
    left: 4%;
    right: 4%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,110,0.35), transparent);
  }
  .warm-bulb {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(circle, #ffdca0 0%, #e8b463 55%, rgba(232,180,99,0) 100%);
    box-shadow: 0 0 8px 2px rgba(240, 190, 110, 0.55);
    animation: bulbTwinkle 3.2s ease-in-out infinite;
  }
  .warm-bulb:nth-child(odd) { animation-delay: 0.4s; }
  .warm-bulb:nth-child(3n) { animation-delay: 1.1s; }
  .warm-bulb:nth-child(4n) { animation-delay: 1.8s; }
  @keyframes bulbTwinkle {
    0%, 100% { opacity: 0.45; transform: scale(0.9); }
    50% { opacity: 1; transform: scale(1.15); }
  }

  /* ---------- Nav / Header ---------- */
  .album-nav {
    display: flex;
    justify-content: flex-start;
    padding: 6px clamp(16px, 5vw, 48px) 0;
    z-index: 3;
    position: relative;
  }
  .album-back-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px 10px 16px;
    border-radius: 999px;
    border: 1px solid rgba(212, 175, 110, 0.4);
    background: linear-gradient(160deg, rgba(28, 20, 34, 0.7) 0%, rgba(16, 11, 22, 0.85) 100%);
    backdrop-filter: blur(8px);
    color: #F0DCA8;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 0.92rem;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: transform 0.25s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  }
  .album-back-btn:hover {
    transform: translateX(-3px);
    border-color: rgba(232, 205, 150, 0.7);
    box-shadow: 0 8px 20px rgba(0,0,0,0.35), 0 0 16px rgba(212,175,110,0.25);
  }
  .album-back-btn svg { width: 16px; height: 16px; flex-shrink: 0; }

  .album-header {
    text-align: center;
    padding: clamp(28px, 6vw, 46px) 20px clamp(20px, 5vw, 34px);
    position: relative;
    z-index: 2;
  }
  .night-title {
    font-size: clamp(1.7rem, 5vw, 2.6rem);
    font-weight: 400;
    color: #F3E1B0;
    margin: 0 0 12px 0;
    letter-spacing: 0.015em;
    text-shadow: 0 2px 24px rgba(232, 195, 125, 0.25);
  }
  .night-subtitle {
    font-style: italic;
    color: rgba(230, 220, 230, 0.7);
    font-size: clamp(0.85rem, 2.6vw, 1rem);
    max-width: 480px;
    margin: 0 auto;
    line-height: 1.6;
  }
  .header-divider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin: 18px auto 0;
  }
  .header-divider span.line {
    width: 44px; height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,110,0.6));
  }
  .header-divider span.line.right {
    background: linear-gradient(90deg, rgba(212,175,110,0.6), transparent);
  }
  .header-divider span.dot { color: rgba(212,175,110,0.85); font-size: 0.7rem; }

  /* ---------- Categorías ---------- */
  .categories-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 clamp(16px, 5vw, 48px);
    position: relative;
    z-index: 2;
  }
  .photo-category-section {
    margin-bottom: clamp(36px, 6vw, 60px);
  }
  .category-title-row {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 0 0 22px 0;
  }
  .category-title-row .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212,175,110,0.4));
  }
  .category-title-row .line.after {
    background: linear-gradient(90deg, rgba(212,175,110,0.4), transparent);
  }
  .category-title {
    margin: 0;
    font-size: clamp(0.95rem, 2.6vw, 1.15rem);
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #E8CD8F;
    white-space: nowrap;
    font-weight: 400;
  }

  .album-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: clamp(18px, 3vw, 30px);
  }
  @media (min-width: 900px) {
    .album-grid { grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); }
  }

  /* ---------- Polaroid ---------- */
  .polaroid-card-night {
    position: relative;
    opacity: 0;
    animation: cardRise 0.6s ease-out forwards;
    cursor: pointer;
    transform-origin: center;
  }
  @keyframes cardRise {
    from { opacity: 0; transform: translateY(18px) rotate(var(--tilt, 0deg)) scale(0.96); }
    to { opacity: 1; transform: translateY(0) rotate(var(--tilt, 0deg)) scale(1); }
  }
  .polaroid-inner {
    background: linear-gradient(165deg, rgba(30, 22, 36, 0.9) 0%, rgba(15, 10, 20, 0.95) 100%);
    border: 1px solid rgba(212, 175, 110, 0.22);
    border-radius: 14px;
    padding: 10px 10px 16px;
    box-shadow: 0 14px 30px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.03) inset;
    transform: rotate(var(--tilt, 0deg));
    transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  .polaroid-card-night:hover .polaroid-inner {
    transform: rotate(0deg) translateY(-6px) scale(1.035);
    box-shadow: 0 24px 46px rgba(0,0,0,0.55), 0 0 26px rgba(212,175,110,0.22);
    border-color: rgba(232, 205, 150, 0.55);
    z-index: 5;
  }
  .image-wrapper-night {
    position: relative;
    width: 100%;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 8px;
    background: #14101a;
  }
  .image-wrapper-night img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(0.35) contrast(1.05) brightness(0.92) saturate(0.9);
    transition: filter 0.5s ease, transform 0.5s ease;
  }
  .polaroid-card-night:hover .image-wrapper-night img {
    filter: grayscale(0) contrast(1.02) brightness(1) saturate(1.05);
    transform: scale(1.06);
  }
  .overlay-glow {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.45) 100%);
    pointer-events: none;
  }
  .polaroid-caption-night {
    margin-top: 10px;
    text-align: center;
    font-style: italic;
    font-size: 0.82rem;
    color: rgba(240, 220, 180, 0.85);
    min-height: 1.1em;
    letter-spacing: 0.01em;
    padding: 0 2px;
    overflow-wrap: break-word;
  }
  .gold-clip {
    position: absolute;
    top: -9px;
    left: 50%;
    transform: translateX(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #ffe9b8, #d4af6e 55%, #8a6a34 100%);
    box-shadow: 0 3px 8px rgba(0,0,0,0.5), 0 0 10px rgba(212,175,110,0.5);
    z-index: 3;
  }

  .album-footer-night {
    text-align: center;
    margin-top: clamp(30px, 6vw, 50px);
    padding: 0 20px;
  }
  .album-footer-night p {
    font-style: italic;
    color: rgba(240, 220, 180, 0.75);
    font-size: clamp(0.85rem, 2.4vw, 1rem);
    text-shadow: 0 0 20px rgba(232,195,125,0.2);
  }

  /* ---------- Lightbox ---------- */
  .photo-modal-night {
    position: fixed;
    inset: 0;
    z-index: 999998;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(16px, 5vw, 40px);
    box-sizing: border-box;
    background:
      radial-gradient(ellipse at 50% 30%, rgba(120, 40, 70, 0.25), transparent 60%),
      rgba(4, 3, 8, 0.86);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    animation: modalBgFade 0.35s ease-out forwards;
  }
  @keyframes modalBgFade { from { opacity: 0; } to { opacity: 1; } }

  .photo-modal-content-night {
    position: relative;
    max-width: min(92vw, 620px);
    max-height: 88dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(165deg, rgba(28, 20, 34, 0.85) 0%, rgba(14, 10, 20, 0.94) 100%);
    border: 1px solid rgba(212, 175, 110, 0.35);
    border-radius: 20px;
    padding: clamp(14px, 3vw, 22px) clamp(14px, 3vw, 22px) clamp(18px, 3vw, 26px);
    box-shadow: 0 30px 80px rgba(0,0,0,0.65);
    animation: modalCardRise 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    box-sizing: border-box;
  }
  @keyframes modalCardRise {
    from { opacity: 0; transform: translateY(16px) scale(0.97); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
  .photo-modal-content-night img {
    max-width: 100%;
    max-height: 66dvh;
    object-fit: contain;
    border-radius: 10px;
    animation: modalImgFade 0.3s ease-out;
  }
  @keyframes modalImgFade {
    from { opacity: 0; } to { opacity: 1; }
  }
  .modal-caption-night {
    margin: 14px 0 0;
    font-style: italic;
    color: #F0DCA8;
    font-size: 0.95rem;
    text-align: center;
    letter-spacing: 0.01em;
    min-height: 1.2em;
  }

  .close-modal-btn-night {
    position: absolute;
    top: -14px;
    right: -14px;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 1px solid rgba(212, 175, 110, 0.5);
    background: linear-gradient(160deg, rgba(32, 22, 38, 0.95), rgba(14, 10, 20, 0.98));
    color: #F0DCA8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(0,0,0,0.5);
    transition: transform 0.2s ease, border-color 0.2s ease;
  }
  .close-modal-btn-night:hover {
    transform: scale(1.08);
    border-color: rgba(232, 205, 150, 0.85);
  }

  .modal-nav-btn {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 46px;
    height: 46px;
    border-radius: 50%;
    border: 1px solid rgba(212, 175, 110, 0.4);
    background: linear-gradient(160deg, rgba(28, 20, 34, 0.75), rgba(14, 10, 20, 0.85));
    backdrop-filter: blur(6px);
    color: #F0DCA8;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999999;
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }
  .modal-nav-btn:hover {
    transform: translateY(-50%) scale(1.08);
    border-color: rgba(232, 205, 150, 0.8);
  }
  .modal-nav-btn.prev { left: clamp(10px, 3vw, 28px); }
  .modal-nav-btn.next { right: clamp(10px, 3vw, 28px); }
  .modal-nav-btn svg { width: 18px; height: 18px; }
  @media (max-width: 560px) {
    .modal-nav-btn { width: 40px; height: 40px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .warm-bulb, .polaroid-card-night, .polaroid-inner, .photo-modal-night,
    .photo-modal-content-night, .photo-modal-content-night img {
      animation: none !important;
      transition: none !important;
    }
  }
`;

function MemoryAlbum({ onBack }) {
  // Lista plana de todas las fotos en el orden mostrado, para poder navegar prev/next en el visor
  const flatPhotos = useMemo(
    () => categoriesOrder.flatMap((key) => categorizedPhotos[key] || []),
    []
  );

  const [selectedIndex, setSelectedIndex] = useState(null);
  const selectedPhoto = selectedIndex !== null ? flatPhotos[selectedIndex] : null;

  const closeModal = () => setSelectedIndex(null);
  const showPrev = () =>
    setSelectedIndex((i) => (i === null ? i : (i - 1 + flatPhotos.length) % flatPhotos.length));
  const showNext = () =>
    setSelectedIndex((i) => (i === null ? i : (i + 1) % flatPhotos.length));

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, flatPhotos.length]);

  return (
    <div className="night-album-wrapper">
      <style>{galleryStyles}</style>

      {/* Гирлянда */}
      <div className="cozy-lights">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="warm-bulb"></div>
        ))}
      </div>

      <nav className="album-nav">
        <button className="album-back-btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Regresar a las Estrellas
        </button>
      </nav>

      <header className="album-header">
        <h1 className="night-title">Nuestra Galería de Recuerdos</h1>
        <p className="night-subtitle">
          "Cada foto es una estrella en el cielo de nuestra historia..."
        </p>
        <div className="header-divider" aria-hidden="true">
          <span className="line" />
          <span className="dot">♦</span>
          <span className="line right" />
        </div>
      </header>

      {/* Контейнер категорий */}
      <div className="categories-container">
        {categoriesOrder.map((categoryKey) => {
          const photosInCategory = categorizedPhotos[categoryKey] || [];
          const meta = CATEGORY_META[categoryKey] || {
            title: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
            icon: '✦',
          };

          return (
            <section key={categoryKey} className="photo-category-section">
              <div className="category-title-row">
                <span className="line" />
                <h2 className="category-title">{meta.icon} {meta.title}</h2>
                <span className="line after" />
              </div>

              <div className="album-grid">
                {photosInCategory.map((photo, index) => {
                  const flatIndex = flatPhotos.findIndex((p) => p.id === photo.id);
                  const tilt = TILT_SEQUENCE[index % TILT_SEQUENCE.length];
                  return (
                    <div
                      key={photo.id}
                      className="polaroid-card-night"
                      style={{ animationDelay: `${index * 0.06}s`, '--tilt': `${tilt}deg` }}
                      onClick={() => setSelectedIndex(flatIndex)}
                    >
                      <div className="polaroid-inner">
                        <div className="image-wrapper-night">
                          <img src={photo.src} alt={photo.caption} loading="lazy" />
                          <div className="overlay-glow"></div>
                        </div>
                        <div className="polaroid-caption-night">
                          {photo.caption}
                        </div>
                      </div>
                      <div className="gold-clip"></div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      
      <footer className="album-footer-night">
        <p>✨ Contigo, cada noche es Navidad. Te amo. ✨</p>
      </footer>

      {/* Модальное окно (Просмотр фото) — con navegación prev/next */}
      {selectedPhoto &&
        createPortal(
          <>
            {flatPhotos.length > 1 && (
              <button
                className="modal-nav-btn prev"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
                aria-label="Foto anterior"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}

            <div className="photo-modal-night" onClick={closeModal}>
              <div className="photo-modal-content-night" onClick={(e) => e.stopPropagation()}>
                <img key={selectedPhoto.id} src={selectedPhoto.src} alt={selectedPhoto.caption} />
                <p className="modal-caption-night">{selectedPhoto.caption}</p>
                <button className="close-modal-btn-night" onClick={closeModal} aria-label="Cerrar">✕</button>
              </div>
            </div>

            {flatPhotos.length > 1 && (
              <button
                className="modal-nav-btn next"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
                aria-label="Foto siguiente"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            )}
          </>,
          document.body
        )}
    </div>
  );
}

export default MemoryAlbum;