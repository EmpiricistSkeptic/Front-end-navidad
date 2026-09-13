import React from 'react';

export default function UniverseIntro({
  onEnter,
  onBack,
}) {
  return (
    <div className="universe-intro">
      <div className="universe-intro-stars">
        {Array.from(
          { length: 55 },
          (_, index) => (
            <span
              key={index}
              className="intro-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${
                  2 + Math.random() * 3
                }s`,
              }}
            />
          )
        )}
      </div>

      <div className="universe-intro-glow" />

      <div className="universe-intro-card">
        <div className="universe-intro-heart">
          ❤
        </div>

        <div className="universe-intro-overline">
          PARA TI
        </div>

        <h1>
          Haz clic para
          <br />
          entrar en tu universo
        </h1>

        <p>
          Donde solo estamos nosotros,
          <br />
          nuestras estrellas y un poco de infinito.
        </p>

        <button
          type="button"
          className="universe-intro-enter"
          onClick={onEnter}
        >
          <span>Entrar al universo</span>
          <span className="universe-intro-arrow">
            →
          </span>
        </button>

        <button
          type="button"
          className="universe-intro-back"
          onClick={onBack}
        >
          ← Regresar
        </button>
      </div>
    </div>
  );
}