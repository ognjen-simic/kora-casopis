import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Article from './pages/Article';
import { FaInstagram } from 'react-icons/fa';

function App() {

  return (
    <>
    <header>
      <h1>Kora Časopis</h1>
    </header>
    <BrowserRouter>
      <div className='background'></div>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
        </Routes>

        <a 
        href="https://www.instagram.com/kora.casopis/?igsh=cGl4NzhqZGxhNXJp#" 
        target="_blank" 
        rel="noreferrer"
        className="floating-insta"
        >
          <FaInstagram />
        </a>

      </div>
    </BrowserRouter>
    </>
  )
}

export default App
