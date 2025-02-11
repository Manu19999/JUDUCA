import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateEvent from "../pages/CreateEvent";
import Evento from "../pages/Evento";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/crear-evento" element={<CreateEvent />} />
      <Route path="/eventos" element={<Evento />} />
    </Routes>
  );
};

export default AppRoutes;
