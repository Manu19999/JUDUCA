import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import EventCard from "./EventCard";
import EventImage from "../../assets/eventoConcierto.jpg";
import EventImage2 from "../../assets/eventoCine.jpg";
import EventImage3 from "../../assets/eventoArte.jpg";
import "../../styles/Inicio/EventList.css";

const EventList = () => {
  const events = [
    {
      id: 1,
      title: "Concierto de Rock",
      date: "15 de Octubre, 2023",
      image: EventImage,
      description: "Disfruta de una noche llena de música y energía con las mejores bandas.",
    },
    {
      id: 2,
      title: "Festival de Cine",
      date: "20 de Noviembre, 2023",
      image: EventImage2,
      description: "Proyecciones de cine independiente y conversatorios con directores.",
    },
    {
      id: 3,
      title: "Feria de Tecnología",
      date: "5 de Diciembre, 2023",
      image: EventImage3,
      description: "Descubre las últimas innovaciones tecnológicas en un solo lugar.",
    },
  ];

  return (
    <Container className="my-5 event-list">
      <h2 className="text-center mb-4 title">🎉 Próximos Eventos</h2>
      <Row>
        {events.map((event) => (
          <Col key={event.id} md={4} sm={6} xs={12} className="mb-4">
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventList;
