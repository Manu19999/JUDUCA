import React from "react";
import { Card } from "react-bootstrap";
import "../../styles/Inicio/EventCard.css";

const EventCard = ({ event }) => {
  return (
    <Card className="event-card">
      <Card.Img variant="top" src={event.image} alt={event.title} className="event-image" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{event.date}</Card.Text>
        <Card.Text className="event-description">{event.description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventCard;