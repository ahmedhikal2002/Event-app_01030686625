import React from "react";
import Heading from "../../Utils/Heading";
import InputFrom from "../../Utils/InputFrom";
import FromikError from "../../Utils/FromikError";
import { useSelector } from "react-redux";
import UseFormikAddEvent from "../../hooks/UseFormikAddEvent";
import UseFormikUpdateEvent from "../../hooks/UseFormikUpdateEvent";
import "./create-event.css";
import ThemeMode from "../../Utils/ThemeMode";
function CreateEvent({ update, item, toggleModelState }) {
  const loading = useSelector((state) => state.admin.loading);

  const formik = !item
    ? UseFormikAddEvent()
    : UseFormikUpdateEvent(item, toggleModelState);
  return (
    <>
      <div className="flex-bet px-5 md:px-0">
        <h3 className="text-primary-dark dark:text-Primary-light my-8">
          {update ? "Update" : "Add"} Event
        </h3>
        {!update && <ThemeMode />}
      </div>
      <div className="flex-column ">
        <form className="from" onSubmit={formik.handleSubmit}>
          <div className="flex-gap flex-wrap">
            <div className="flex-1">
              <InputFrom
                label="Event Name"
                type="text"
                placeholder="Event Name"
                formik={formik}
                id="event name"
                name="eventName"
              />
            </div>
            <div className="flex-1">
              <InputFrom
                label="Category"
                type="text"
                placeholder="Event Category"
                formik={formik}
                id="category"
                name="eventCategory"
              />
            </div>
          </div>
          <div className="flex-gap flex-wrap">
            <div className="flex-1">
              <InputFrom
                label="Event Date"
                type="date"
                placeholder="Event Date"
                formik={formik}
                id="event-date"
                name="eventDate"
              />
            </div>
            <div className="flex-1">
              <InputFrom
                label="Venue"
                type="text"
                placeholder="Event Venue"
                formik={formik}
                id="venue"
                name="eventVenue"
              />
            </div>
          </div>
          <div className="flex-gap flex-wrap">
            <div className="flex-1">
              <InputFrom
                label="Event Price"
                type="text"
                placeholder="Event Price"
                formik={formik}
                id="event price"
                name="eventPrice"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="img">Event Image</label>
              <input
                type="file"
                id="img"
                name="eventImg"
                accept="image/*"
                onChange={(e) => {
                  formik.setFieldValue("eventImg", e.target.files[0]);
                }}
                onBlur={formik.handleBlur}
              />
              <FromikError formik={formik} inputName="eventImg" />
            </div>
          </div>
          <label htmlFor="description">Description</label>
          <textarea
            placeholder="enter event description"
            id="description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${
              formik.errors.description && formik.touched.description
                ? "input-err"
                : "form-filed "
            }`}
          ></textarea>
          <FromikError formik={formik} inputName="description" />

          <button type="submit" className="btn" disabled={loading}>
            {loading ? (
              <p>loading...</p>
            ) : (
              <p>{update ? "Update" : "Add"} Event</p>
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;
