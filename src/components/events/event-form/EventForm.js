import React from "react";
import { useState } from "react";
const today = new Date();

console.log(today)
function compareImg (image) {
  try {
      new URL(image);
      return true;
      } catch (error) {
      return false;
      }
  }

const validations = {
  title: (value) => {
    let message;
    if (!value) {
      message = "Title is required";
    }
    return message;
  },
  date: (value) => {
    let message;
    let newdate = new Date(value)
    if (!value) {
      message = "Date is required";
    } else if (newdate < today){
      message = "Date have to be after today";
    }
    return message;
  },
  poster: (value)=> {
    let message;
    if (!value) {
      message = "Poster is required";
    } else if (value) {
      const result = compareImg(value)
      if (result) {
        message = ""
      }
      else message = 'Invalid IMG'
    }
    return message;
  },
};

const initialState = {
  event: {
    title: "",
    date: "",
    poster: ""
  },
  errors: {
    title: validations.title(""),
    date: validations.date(''),
    poster: validations.poster('')
  },
};

function EventForm() {
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
        [name]: validations[name] && validations[name](value),
      },
    }));
  };

  const { event, errors } = state;
  return (
    <div>
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            name="title"
            value={event.title}
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          {errors.title && (
            <div className="invalid-feedback">{errors.title}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className={`form-control ${errors.date ? "is-invalid" : ""}`}
            name="date"
            value={event.date}
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          {errors.date && (
            <div className="invalid-feedback">{errors.date}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Poster</label>
          <input
            type="text"
            className={`form-control ${errors.poster ? "is-invalid" : ""}`}
            name="poster"
            value={event.poster}
            aria-describedby="emailHelp"
            onChange={handleChange}
          />
          {errors.poster && (
            <div className="invalid-feedback">{errors.poster}</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default EventForm;
