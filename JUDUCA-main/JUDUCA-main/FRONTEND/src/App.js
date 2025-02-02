import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import VistaFicha from "./pages/ficha";
import Crearficha from "./pages/CrearFicha";

  function App() {
    return (
      <Router>
        <Routes>
          <Route path="/ficha" element={<VistaFicha />} />
          <Route path="/creacion-ficha" element={<Crearficha />} />

        </Routes>
      </Router>
    );
  }

export default App;
