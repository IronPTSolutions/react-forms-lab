import React, { useState, useEffect } from 'react'
import EventForm from '../event-form/EventForm'
import EventItem from '../event-item/EventItem';

import staticEvents from '../../../data/events';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => setEvents(staticEvents), []);

  const handleCreateEvent = (event) => setEvents((events) => [...events, event]);
  const handleDeleteEvent = (id) => setEvents((events) => events.filter((event) => event.id !== id));

  return (
    <>
      <EventForm onCreatedEvent={handleCreateEvent}/>
      <hr />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
        {events.map((event) => <div className='col' key={event.id}><EventItem {...event} onDeletedEvent={handleDeleteEvent}/></div>)}
      </div>
    </>
  )
}

export default EventList
