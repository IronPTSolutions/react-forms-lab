import React from 'react';
import moment from 'moment';

import './EventItem.css';

function EventItem({ id, poster, title, date, liked, onDeletedEvent, onToogledLikeEvent }) {

  const handleDeleteEvent = () => onDeletedEvent(id)
  const handleToogleLikeEvent = () => onToogledLikeEvent(id)

  return (
    <div className='event'>
      <div className='position-relative'>
        <img src={poster || 'https://via.placeholder.com/300x150'} alt={title} className="w-100 rounded" />
        <span className='position-absolute date badge text-bg-light'>{moment(date).format('DD MMM')}</span>
        <div className="actions position-absolute">
          <i className='fa fa-times text-danger' role="button" onClick={handleDeleteEvent} />
        </div>
        <i 
          className={`fa fa-heart position-absolute shadow like ${liked ? 'text-danger' : 'text-light'}`} 
          role="button"
          onClick={handleToogleLikeEvent} />
      </div>
      <h3 className='fw-lighter mt-2'>{title}</h3>
    </div>
  )
}

EventItem.defaultProps = {
  onDeletedEvent: () => {},
  onToogledLikeEvent: () => {},
  liked: false
}

export default EventItem;
