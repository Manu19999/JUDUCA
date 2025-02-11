import React, { useEffect, useState } from 'react'

const ModoOscuro = () => {
    const [modo, setModo] = useState("dark");

    const tema = document.querySelector("[data-bs-theme]");

    const cambiarModo = (nuevoModo) =>  {
        setModo(nuevoModo);
    }

    useEffect(() => {
        tema.setAttribute("data-bs-theme",modo);
    }, [modo]);

  return (
      <div className="btn-group mt-4 mb-4" role="group" aria-label="Esquema de colores">
    <button className='btn btn-primary' title="Modo oscuro" onClick={() => cambiarModo("dark")}><i className="bi bi-moon-fill"></i></button>
    <button className='btn btn-primary' title="Modo claro" onClick={() => cambiarModo("light")}><i className="bi bi-sun-fill"></i></button>
    </div>
  )
}

export default ModoOscuro
