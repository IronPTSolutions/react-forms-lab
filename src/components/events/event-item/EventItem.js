import React, { useState } from 'react'
import moment from "moment"

function EventItem({ id, title, poster, date, onDeleteEvent}) {
  const [like, setLike] = useState(false)
  
  const handleLike = () => {
    setLike(!like)
  }

  const handleDeleteEvent = () => {onDeleteEvent(id)}

  return (
    <div className='event col-3'>
      <div className="position-relative">
        <img src={poster || "https://media.istockphoto.com/vectors/default-image-icon-vector-missing-picture-page-for-website-design-or-vector-id1357365823?k=20&m=1357365823&s=612x612&w=0&h=ZH0MQpeUoSHM3G2AWzc8KkGYRg4uP_kuu0Za8GFxdFc="} className="image-icon w-100 rounded" alt={title} />
        <span className='bg-light rounded px-2 fw-semibold date-icon'>{moment(date).format("DD MMM")}</span>
        <i className='fa fa-times text-danger delete-icon' role="button" onClick={handleDeleteEvent}></i>
        <i className={`fa fa-heart ${!like ? "text-light" : "text-danger"} like-icon`} role="button" onClick={handleLike}></i>     
      </div>
        <p className="fs-5 align-self-start mt-1">{title}</p> 
    </div>
  )
}

export default EventItem;
