import { useState, React } from "react";
import moment from "moment"
import { v4 as uuid } from "uuid"
import EventItem from "../event-item/EventItem";


const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = "Title is requires"
    } else if (value.length < 3) {
      message = "Title needs at least 3 chars "
    }
    return message
  },
  date: (value) => {
    let message
    if (!value) {
      message = "Date is required"
    } else if (moment(value).endOf("day").isBefore(moment.now())) {
      message = "Date can't be in the past Mr. Peabody"
    }
    return message
  },
  poster: (value) => {
    let message
    if (!value) {
      message = "Image URL is required"
    } else {
      try {
        new URL(value)
      } catch (error) {
        message = "Invalid Url"
      }
    }
    return message
  }
}

const initialState = {
  event: {
    title: "",
    date: "",
    poster: "",
  },
  errors: {
    title: validations.title(""),
    date: validations.date(""),
    poster: validations.poster("")
  },
  touch: {
    title: false,
    date: false,
    poster: false
  }
}

 
function EventForm({ className, onCreateEvent }) {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((state) => ({
      ...state,
      event: {
        ...state.event,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target
    setState((state) => ({
      ...state,
      touch:{
        ...state.touch,
        [name]: true
      }
    }))
  }

  const isValid = () => !Object.keys(state.errors).some(error => state.errors[error])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid()) {
      onCreateEvent({...event, id: uuid()})
      setState(initialState)
    }
  }

  const { event, errors, touch } = state;
  
  return (
    <>
      <EventItem {...state.event}/>
      <form className={className} onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className={`fa fa-fw fa-grav ${touch.title && errors.title && "text-danger fa-spin"} ${touch.title && !errors.title && "text-success"} `}></i>
          </span>
          <input
            type="text"
            className={`form-control ${touch.title && errors.title ? "is-invalid" : ""}`}
            placeholder="Event name"
            name="title"
            value={event.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touch.title && errors.title && (<div className="invalid-feedback">{errors.title}</div>)}
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">
            <i className={`fa fa-fw fa-calendar ${touch.date && errors.date && "text-danger fa-spin"} ${touch.date && !errors.date && "text-success"} `}></i>
          </span>
          <input
            type="date"
            className={`form-control ${touch.date && errors.date ? "is-invalid" : ""}`}
            placeholder="Event date"
            name="date"
            value={event.date}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touch.date && errors.date && (<div className="invalid-feedback">{errors.date}</div>)}
        </div>

         <div className="input-group mb-3">
          <span className="input-group-text">
            <i className={`fa fa-fw fa-camera ${touch.poster && errors.poster && "text-danger fa-spin"} ${touch.poster && !errors.poster && "text-success"} `}></i>
          </span>
          <input
            type="text"
            className={`form-control ${touch.poster && errors.poster ? "is-invalid" : ""}`}
            placeholder="Event poster url"
            name="poster"
            value={event.poster}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button className="btn btn-outline-secondary" type="submit" disabled={!isValid()}>Create event</button>
          {touch.poster && errors.poster && (<div className="invalid-feedback">{errors.poster}</div>)}
          
        </div>
      </form>
    </>
  );
}

EventForm.defaultProps = {
  className: "",
};

export default EventForm;
