import './App.css'
import './components/game'
import GameComponent from './components/game'
import StartGameComponent from './components/startGame'
import HomeComponent from './components/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'
import Settings from './pages/Settings'
import { useEffect } from 'react'
import i18n from './i18n'
import UpdateSW from './components/updateSW';
import Teams from './pages/Teams'

function App() {

  useEffect(() => {
    const lang = localStorage.getItem('language');
    if (lang) {
      i18n.changeLanguage(lang);
    }
    else {
      i18n.changeLanguage('en');
      localStorage.setItem("language", "en");
    }
  }, []);
  
  return (
    <>
      <UpdateSW />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <HomeComponent />
            </ProtectedRoute>
          } />
          <Route path="/teams" element={
            <ProtectedRoute>
              <Teams />
            </ProtectedRoute>
          } />
          <Route path="/game" element={
            <ProtectedRoute>
              <GameComponent />
            </ProtectedRoute>
          } />
          <Route path="/start-game" element={
            <ProtectedRoute>
              <StartGameComponent />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App