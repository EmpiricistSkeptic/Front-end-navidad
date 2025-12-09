import { useState } from 'react';

function AuthScreen({ onAuth }) {
  const [name, setName] = useState('');
  const [secret, setSecret] = useState('');
  const [mode, setMode] = useState('register'); // 'register' | 'login'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !secret.trim()) return;

    // Здесь в будущем будет вызов реального /api/register/ или /api/login/
    onAuth({ name: name.trim() });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">
          {mode === 'register' ? 'Вход в сказку' : 'Вернуться в сказку'}
        </h1>

        <p className="auth-subtitle">
          {mode === 'register'
            ? 'Введи своё имя и придумай секретный код — страж сказки пропустит только тебя.'
            : 'Введи имя и секретный код, чтобы вернуться к своему небу и коту.'}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Имя
            <input
              className="auth-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Например, Алиса"
            />
          </label>

          <label className="auth-label">
            Секретный код
            <input
              className="auth-input"
              type="password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Только ты и звёзды будете его знать"
            />
          </label>

          <button type="submit" className="auth-button">
            {mode === 'register' ? 'Войти в сказку' : 'Войти'}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch"
          onClick={() =>
            setMode((prev) => (prev === 'register' ? 'login' : 'register'))
          }
        >
          {mode === 'register'
            ? 'У меня уже есть код'
            : 'Я здесь впервые'}
        </button>
      </div>
    </div>
  );
}

export default AuthScreen;
