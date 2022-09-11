import React from "react";
import moment from "moment";
import "./EventItem.css";

function EventItem({ title, date, poster, onDeletedEvent, onLikedEvent, id, className, liked }) {

  const handleDeleteEvent = () => onDeletedEvent(id)

  const handleLikeEvent = () => onLikedEvent(id)

  return (
    <div className={`card ${className} position-relative`}>
          <img src={poster} className="card-img" alt={title} />
          <div className="card-img-overlay rounded">
            <span className="date badge text-bg-light">{moment(date).format("D MMM")}</span>
            <span className="delete-button"><i className="fa fa-times text-danger" role="button" onClick={handleDeleteEvent}/> </span>
            <span className="like-button hearth-button"><i className={` fa fa-heart like ${liked ? 'text-danger' : 'text-light'}`} role="button" onClick={handleLikeEvent}/></span>
          </div>
          <h6 className="text-center">{title}</h6>
        </div>
  );
}

EventItem.defaultProps = {
  onDeletedEvent: () => {},
  onLikedEvent: () => {},
  liked: false
}

export default EventItem;
