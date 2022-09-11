import React from 'react'

function EventItem({ title, id }) {
  return (
    <li>{title} {id}</li>
  )
}

export default EventItem;