import { useState } from 'react'
import './App.css'
import './components/game'
import GameComponent from './components/game'
import StartGameComponent from './components/startGame'
import HomeComponent from './components/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/game" element={<GameComponent />} />
          <Route path="/start-game" element={<StartGameComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
