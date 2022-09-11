import React, { useEffect, useState } from 'react'
import eventsList from "../../data/Data"
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment/moment'

function EventDetail() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [event, setEvent] = useState([])

  useEffect(() => {
    const ev = eventsList.find(event => event.id === id)
    if (!ev) {
      navigate("/")
    }
    setEvent(ev)
  }, [id, navigate])

  return (
    <div className='d-flex flex-column'>
      <div className='row'>
        <h3 className='col-9 fw-light'>{event.title} on {moment(event.date).format("dddd Do MMM")}</h3>
      </div>
      <img src={event.poster} alt={event.title} />
    </div>
  )
}

export default EventDetail