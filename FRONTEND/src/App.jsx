import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import React, { useEffect, useState } from "react";
import reactLogo from './assets/react.svg'
import bootstrapLogo from './assets/Bootstrap-logo.png'
import viteLogo from './assets/vite.svg'
import ModoOscuro from "./components/ModoOscuro"
import './styles/App.css'
import CreateEvent from "./pages/Evento";
import CreateCredencial from "./pages/credencial";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/crear-evento" element={<CreateEvent />} />
        <Route path="/crear-credencial" element={<CreateCredencial />} />


      </Routes>
    </Router>
  );
}

export default App;


/*
  const [count, setCount] = useState(0)

  return (
    <div className="App container">
      <div>
        <a target="_blank">
          <img src={viteLogo} className="logo" alt="Logo Vite" />
        </a>
        <a target="_blank">
          <img src={reactLogo} className="logo logo-spin" alt="Logo React" />
        </a>
        <a target="_blank">
          <img src={bootstrapLogo} className="logo" alt="Logo Bootstrap" />
        </a>
      </div>
      <h1>Vite + React + Bootstrap</h1>
      <div className="card">
        <button className='btn btn-primary' onClick={() => setCount((count) => count + 1)}>
          Número de clicks: <b>{count}</b>
        </button>
        <ModoOscuro />
        <p>
          Edita el archivo <code>src/App.jsx</code> para empezar a crear en React.
        </p>
      </div>
      <p className="read-the-docs">
        Haz click en los logos para aprender sobre cada librería
      </p>
    </div>
  )
}

export default App
*/