import { useState } from 'react';
import AuthScreen from './components/AuthScreen.jsx';
import HomePage from './components/HomePage.jsx';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fairytale_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleAuth = ({ name }) => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem('fairytale_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fairytale_user');
  };

  return (
    <div className="app-root">
      {user ? (
        <HomePage user={user} onLogout={handleLogout} />
      ) : (
        <AuthScreen onAuth={handleAuth} />
      )}
    </div>
  );
}

export default App;

