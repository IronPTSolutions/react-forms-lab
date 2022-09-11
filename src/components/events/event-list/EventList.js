import React from "react";
import { useState } from "react";
import EventForm from "../event-form/EventForm";
import EventItem from "../event-item/EventItem";

function EventList() {
  const [events, setEvents] = useState([]);

  const handleEventCreated = (event) => {
    setEvents((events) => {
      return [...events, event];
    });
  };
  const handleDeleteEvent = (id) =>
    setEvents((events) => events.filter((event) => event.id !== id));

  return (
    <div>
      <div>
        <EventForm onCreatedEvent={handleEventCreated} />
      </div>
      <h1 className="mt-5">Listado de eventos</h1>
      <div className="d-flex justify-content-start">
        {events.map((event) => (
          <div className="col" key={event.id}>
            <EventItem {...event} onDeletedEvent={handleDeleteEvent} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventList;
