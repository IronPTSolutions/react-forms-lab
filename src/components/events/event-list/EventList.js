import React, { useEffect, useState } from 'react'
import eventsData from "../../data/Data"
import EventItem from "../event-item/EventItem"
import EventForm from '../event-form/EventForm'

function EventList() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    setEvents(eventsData)
  }, [])

  const handleDeleteEvent = (id) => {
    setEvents(events => [...events].filter(event => event.id !== id))
  }

  const handleCreateEvent = (e) => {
    setEvents(events => [...events, e])
  }

  return (
    <>
      <div className='row'>
        {/* <EventItem className="col-3"/> */}
        <EventForm className="col-9" onCreateEvent={handleCreateEvent}/>
      </div>
      <hr />
      {events.length !== 0 ? (<div className='row'>
          {events.map((event) => (
            <EventItem key={event.id} {...event} onDeleteEvent={handleDeleteEvent}/> ))}
        </div>) : (<h2 className='text-center mt-5'>Oops, any event to show...</h2>)}        
    </>
  )
}

export default EventList
