import React from 'react';
import Hero from '../components/Inicio/Hero';
import EventList from '../components/Inicio/EventList';
import Footer from '../components/Inicio/Footer';
import Navbar from '../components/Inicio/Navbar';
import Acercade from '../components/Inicio/Acercade';

const Home = () => {
  return (
    <div id="inicio">
      <Navbar />
      <Hero />
      <EventList />
      <Acercade />
      <Footer />
    </div>
  );
};

export default Home;