import { React, useState } from "react";
import EventForm from "../event-form/EventForm";
import EventItem from "../event-item/EventItem";
import eventData from "../../../data/event";

function EventList() {
  const [events, setEvents] = useState(eventData);



  const handleCreatedEvent = (event) => {
    setEvents((events) => {
      return [...events, event];
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents((events) => [...events].filter((event) => event.id !== id))
  }

  const handleLikeEvent = (id) => {
    setEvents((events) => {
      return [...events]
    })
  }

  return (
    <>
      <EventForm onCreatedEvent={handleCreatedEvent} />
      <hr />
      <div className="container">
      <div className="d-flex justify-content-between">
        {events.map((event) => (
          <EventItem key={event.id} {...event} onDeletedEvent={handleDeleteEvent} onLikedEvent={handleLikeEvent} className="mx-2"/>
        ))}
         </div>
      </div>
    </>
  );
}

export default EventList;
