import React from "react";
import moment from "moment";
import "./EventItem.css";

function EventItem({ title, poster, date, onDeletedEvent, id }) {
  const handleDeleteEvent = () => onDeletedEvent(id);

  return (
    <div className='event'>
      <div className="position-relative">
        <img src={poster} alt={title} className="container-img" />
        <div>
          <span className="position-absolute date badge text-bg-light">
            {moment(date).format("DD MM")}
          </span>
          <div className="actions position-absolute">
            <i
              className="fa fa-times text-danger"
              role="button"
              onClick={handleDeleteEvent}
            />
          </div>
        </div>
      </div>
      <h3 className="fw-lighter mt-4">{title}</h3>
    </div>
  );
}

EventItem.defaultProps = {
  onDeletedEvent: () => {},
};

export default EventItem;
