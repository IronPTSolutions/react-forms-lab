import { useState } from "react";
import { v4 as uuid } from "uuid";
import moment from "moment";

const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = "Event title is required";
    }
    return message;
  },
  date: (value) => {
    let message;
    if (!value) {
      message = "Event date is required";
    } else if (moment(value).endOf("day").isBefore(moment.now())) {
      message = "Date can not be in the past";
    }
    return message;
  },
  poster: (value) => {
    let message;
    if (!value) {
      message = "Event poster is required";
    } else {
      try {
        new URL(value);
      } catch (error) {
        message = "Invalid url";
      }
    }
    return message;
  },
};

const initialState = {
  event: {
    id: "",
    title: "",
    date: "",
    poster: "",
  },
  errors: {
    title: validations.title(""),
    date: validations.date(""),
    poster: validations.poster(""),
  },
  touch: {
    title: false,
    date: false,
    poster: false,
  },
};

function EventForm({ onCreatedEvent }) {
  const [state, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((state) => {
      return {
        ...state,
        event: {
          ...state.event,
          [name]: value,
        },
        errors: {
          ...state.errors,
          [name]: validations[name] && validations[name](value),
        },
      };
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setState((state) => {
      return {
        ...state,
        touch: {
          ...state.touch,
          [name]: true,
        },
      };
    });
  };

  const isValid = () =>
    !Object.keys(state.errors).some((error) => state.errors[error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      const { event } = state;
      onCreatedEvent({ ...event, id: uuid() });
      setState(initialState);
    }
  };

  const { event, touch, errors } = state;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fa fa-tag fa-fw"></i>
          </span>
          <input
            type="text"
            name="title"
            value={event.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${
              errors.title && touch.title ? "is-invalid" : ""
            }`}
            placeholder="Event title"
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fa fa-calendar fa-fw"></i>
          </span>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${
              errors.date && touch.date ? "is-invalid" : ""
            }`}
            placeholder="Event date"
          />
          {errors.date && <div className="invalid-feedback">{errors.date}</div>}
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <i className="fa fa-picture-o fa-fw"></i>
          </span>
          <input
            type="text"
            name="poster"
            value={event.poster}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${
              errors.poster && touch.poster ? "is-invalid" : ""
            }`}
            placeholder="Event poster"
          />
          <button className="btn btn-outline-primary btn-fw" type="submit">
            Create event
          </button>
          {errors.poster && (
            <div className="invalid-feedback">{errors.poster}</div>
          )}
        </div>
      </form>
    </>
  );
}

export default EventForm;
