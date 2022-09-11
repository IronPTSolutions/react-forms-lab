import { React, useState } from "react";
import EventForm from "../event-form/EventForm";
import EventItem from "../event-item/EventItem";
import eventData from "../../../data/event";

function EventList() {
  const [events, setEvents] = useState(eventData);
  console.log(eventData)

  const handleCreatedEvent = (event) => {
    setEvents((events) => {
      return [...events, event];
    });
  };

  return (
    <>
      <EventForm onCreatedEvent={handleCreatedEvent} />
      <ul className="list-group">
        {events.map((event) => (
          <EventItem key={event.id} {...event} />
        ))}
      </ul>
    </>
  );
}

export default EventList;
