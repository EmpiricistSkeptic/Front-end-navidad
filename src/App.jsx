import { useState } from 'react';
import AuthScreen from './components/AuthScreen.jsx';
import HomePage from './components/HomePage.jsx';
import MemoryAlbum from './components/MemoryAlbum.jsx'; // Импортируем новый компонент

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('fairytale_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Состояние для переключения между Home и Gallery
  const [currentView, setCurrentView] = useState('home'); 

  const handleAuth = ({ name }) => {
    const userData = { name };
    setUser(userData);
    localStorage.setItem('fairytale_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('home'); // Сбрасываем вид при выходе
    localStorage.removeItem('fairytale_user');
  };

  return (
    <div className="app-root">
      {!user ? (
        <AuthScreen onAuth={handleAuth} />
      ) : (
        // Логика переключения экранов
        currentView === 'gallery' ? (
          <MemoryAlbum onBack={() => setCurrentView('home')} />
        ) : (
          <HomePage 
            user={user} 
            onLogout={handleLogout} 
            onOpenGallery={() => setCurrentView('gallery')}
          />
        )
      )}
    </div>
  );
}

export default App;