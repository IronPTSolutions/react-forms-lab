import React from 'react';
import moment from 'moment';

import './EventItem.css';

function EventItem({ id, poster, title, date, onDeletedEvent }) {

  const handleDeleteEvent = () => onDeletedEvent(id)

  return (
    <div className='event position-relative'>
      <img src={poster || 'https://via.placeholder.com/300x150'} alt={title} className="w-100 rounded" />
      <h3 className='fw-lighter mt-2'>{title}</h3>
      <span className='position-absolute date badge text-bg-light'>{moment(date).format('DD MMM')}</span>
      <div className="actions position-absolute">
        <i className='fa fa-times text-danger' role="button" onClick={handleDeleteEvent}/>
      </div>
    </div>
  )
}

EventItem.defaultProps = {
  onDeletedEvent: () => {}
}

export default EventItem;
