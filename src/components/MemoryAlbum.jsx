import React, { useState } from 'react';

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


// Категория: Её рисунки (Sus Dibujos / Su Arte)
import photo_her_art_1 from '../assets/dibujonosotros.jpg';
import photo_her_art_2 from '../assets/figura1.jpg';
import photo_her_art_4 from '../assets/figura3.jpg';
import photo_her_art_5 from '../assets/figura4.jpg';
import photo_her_art_6 from '../assets/figura5.jpg';
import photo_her_art_7 from '../assets/figura6.jpg';
import photo_her_art_8 from '../assets/Figura7.jpg';
import photo_her_art_9 from '../assets/figura8.jpg';
import photo_her_art_10 from '../assets/figura9.jpg';
import photo_her_art_11 from '../assets/figura10.jpg';

// Категория: Животные (Animales)
import photo_animals_1 from '../assets/rana.jpg';
import photo_animals_2 from '../assets/banda.jpg';
import photo_animals_3 from '../assets/stas.jpg';
import photo_animals_4 from '../assets/hirosha.jpg';
import photo_animals_5 from '../assets/hirosha1.jpg';


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
    { id: 204, src: photo_animals_4, caption: 'Hirosha' },
    { id: 205, src: photo_animals_5, caption: 'Gay' },
  ],
};

// Порядок отображения категорий на экране
const categoriesOrder = ["nosotros", "sus_dibujos", "animales"];

function MemoryAlbum({ onBack }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="night-album-wrapper">
      
      {/* Гирлянда */}
      <div className="cozy-lights">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="warm-bulb"></div>
        ))}
      </div>

      <nav className="album-nav">
        <button className="album-back-btn" onClick={onBack}>
          ← Regresar a las Estrellas
        </button>
      </nav>

      <header className="album-header">
        <h1 className="night-title">Nuestra Galería de Recuerdos</h1>
        <p className="night-subtitle">
          "Cada foto es una estrella en el cielo de nuestra historia..."
        </p>
      </header>

      {/* Контейнер категорий */}
      <div className="categories-container">
        {categoriesOrder.map((categoryKey) => {
          const photosInCategory = categorizedPhotos[categoryKey] || [];
          
          // Определяем название заголовка на основе ключа
          let categoryTitle = "";
          switch(categoryKey) {
            case "nosotros": categoryTitle = "Nosotros"; break;
            case "sus_dibujos": categoryTitle = "Tu Arte 🎨"; break;
            case "animales": categoryTitle = "Amigos y Animales 🐾"; break;
            default: categoryTitle = categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1);
          }

          return (
            <section key={categoryKey} className="photo-category-section">
              
              <h2 className="category-title">{categoryTitle}</h2>

              <div className="album-grid">
                {photosInCategory.map((photo, index) => (
                  <div 
                    key={photo.id} 
                    className="polaroid-card-night"
                    // Анимация задержки (чтобы фото не появлялись все одновременно)
                    style={{ animationDelay: `${index * 0.1}s` }} 
                    onClick={() => setSelectedPhoto(photo)}
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
                ))}
              </div>
            </section>
          );
        })}
      </div>
      
      <footer className="album-footer-night">
        <p>✨ Contigo, cada noche es Navidad. Te amo. ✨</p>
      </footer>

      {/* Модальное окно (Просмотр фото) */}
      {selectedPhoto && (
        <div className="photo-modal-night" onClick={() => setSelectedPhoto(null)}>
          <div className="photo-modal-content-night" onClick={(e) => e.stopPropagation()}>
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
            <p className="modal-caption-night">{selectedPhoto.caption}</p>
            <button className="close-modal-btn-night" onClick={() => setSelectedPhoto(null)}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryAlbum;