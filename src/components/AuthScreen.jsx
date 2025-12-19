import { useState } from 'react';
import authService from '../services/auth.service';

function AuthScreen({ onAuth }) {
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !secret.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await authService.login(
        name.trim(),
        secret.trim()
      );

      onAuth({
        userId: response.user_id,
        username: response.username,
      });
    } catch (err) {
      setError(err.message || 'La puerta no se abrió');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      {/* capa de polvo estelar */}
      <div className="auth-stars-layer" aria-hidden="true" />

      <div className="auth-scene">
        <header className="auth-header">
          <h1 className="auth-title">
            La puerta secreta
          </h1>
          <p className="auth-subtitle">
            Di tu nombre y la palabra secreta.
            Solo para ti, la puerta se abrirá.
          </p>
        </header>

        <div className="auth-door-layout">
          <div className="auth-door-glow" aria-hidden="true" />

          <div className="auth-door-frame">
            <form onSubmit={handleSubmit} className="auth-door-form">
              <div className="auth-door-form-inner">
                <label className="auth-label">
                  Tu nombre
                  <input
                    className="auth-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    placeholder="¿Quién llama a la puerta?"
                  />
                </label>

                <label className="auth-label">
                  Palabra secreta
                  <input
                    className="auth-input"
                    type="password"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    disabled={loading}
                    placeholder="Solo tú y las estrellas lo saben"
                  />
                </label>

                {error && (
                  <p className="auth-error">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="auth-button"
                  disabled={loading}
                >
                  {loading
                    ? 'La puerta escucha...'
                    : 'Abrir la puerta'}
                </button>
              </div>
            </form>
          </div>

          <div className="auth-door-side-text">
            <p>
              El gato susurra:
              <span> «Solo a ti te dejaré entrar.»</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;


