import React, { useState } from 'react';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import EventItem from '../event-item/EventItem';

const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = 'Title is required';
    }
    return message;
  },
  date: (value) => {
    let message;
    if (!value) {
      message = 'Date is required';
    } else if (moment(value).endOf('day').isBefore(moment.now())) {
      message = 'Date can not be in the past';
    }
    return message;
  },
  poster: (value) => {
    let message;
    if (!value) {
      message = 'Poster image url is required';
    } else {
      try {
        new URL(value);
      } catch (error) {
        message = 'Invalid url';
      }
    }
    return message;
  }
}

const initialState = {
  event: {
    title: '',
    date: '',
    poster: ''
  },
  errors: {
    title: validations.title(''),
    date: validations.date(''),
    poster: validations.poster('')
  },
  touch: {}
}

function EventForm({ className, onCreatedEvent }) {
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((state) => ({
      ...state,
      event: {
        ...state.event,
        [name]: value
      },
      errors: {
        ...state.errors,
        [name]: validations[name] && validations[name](value)
      }
    }))
  }

  const handleBlur = (event) => {
    const { name } = event.target;
    setState((state) => ({
      ...state,
      touch: {
        ...state.touch,
        [name]: true
      }
    }))
  }

  const isValid = () => !Object.keys(state.errors).some(key => state.errors[key])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValid()) {
      onCreatedEvent({ ...event, id: uuid() });
      setState(initialState);
    }
  }

  const { event, errors, touch} = state;
  return (
    <div className='row'>
      <div className="col-12 col-sm-6 col-md-4 col-lg-3">
        <EventItem {...state.event} />
      </div>
      
      <form className={`col-12 col-sm-6 col-md-8 col-lg-9 ${className}`} onSubmit={handleSubmit}>
        
        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-tag fa-fw"/></span>
          <input type="text" className={`form-control ${errors.title && touch.title ? 'is-invalid' : ''}`} placeholder="Even title"
            name="title"
            onChange={handleChange}
            onBlur={handleBlur}
            value={event.title}
          />
          {errors.title && touch.title && <div className="invalid-feedback">{errors.title}</div> }
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-calendar fa-fw" /></span>
          <input type="date" className={`form-control ${errors.date && touch.date ? 'is-invalid' : ''}`} placeholder="Even Date"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={event.date}
          />
          {errors.date && touch.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>

        <div className="input-group mb-1">
          <span className="input-group-text"><i className="fa fa-picture-o fa-fw" /></span>
          <input type="text" className={`form-control ${errors.poster && touch.poster ? 'is-invalid' : ''}`} placeholder="Even Image url"
            name="poster"
            onChange={handleChange}
            onBlur={handleBlur}
            value={event.poster}
          />
          <button className="btn btn-outline-primary" type="submit" disabled={!isValid()}>Create Event</button>
          {errors.poster && touch.poster && <div className="invalid-feedback">{errors.poster}</div>}
        </div>

      </form>
    </div>
  )
}

EventForm.defaultProps = {
  className: '',
  onCreatedEvent: () => {}
}

export default EventForm;
