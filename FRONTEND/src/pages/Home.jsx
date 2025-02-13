import React from 'react';
import Hero from '../components/Inicio/Hero';
import EventList from '../components/Inicio/EventList';
import Footer from '../components/Inicio/Footer';
import Navbar from '../components/Inicio/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <EventList />
      <Footer />
    </div>
  );
};

export default Home;