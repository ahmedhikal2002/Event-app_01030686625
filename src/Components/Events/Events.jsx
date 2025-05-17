import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookEvent,
  getBookedEvents,
  getEventById,
} from "../../Store/UserSlice/ThunkActions";
import { useNavigate, useParams } from "react-router-dom";
import Venue from "../../assets/location-pin-2965.png";
import Date from "../../assets/red-calendar-11016.png";
import "./Events.css";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { toast } from "sonner";
import Heading from "../../Utils/Heading";

function Events() {
  const dispatch = useDispatch();
  const params = useParams();
  const event = useSelector((state) => state.user.event);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const bookedEvents = useSelector((state) => state.user.bookedEvents);
  const user = useSelector((state) => state.auth.user);
  const booked = bookedEvents.some((e) => e.id === params.id);

  const navigate = useNavigate();
  const handleBookEvent = () => {
    if (user) {
      dispatch(bookEvent({ item: { ...event, id: params.id } }))
        .unwrap()
        .then(() => navigate(`/congratulations`))
        .catech(() =>
          toast.error("Some thing went wrong please try again later")
        );
    } else {
      toast.warning("you must login to complete this action");
    }
  };

  useEffect(() => {
    dispatch(getEventById(params.id));
    if (user) dispatch(getBookedEvents());
  }, [dispatch, params, user]);
  return (
    <>
      <Heading>About this Event</Heading>
      <Error error={error}>
        {Object.values(event).length > 0 ? (
          <div className="events">
            <div className="w-[300px] h-[250px] ">
              {!event.img ? (
                <div className="w-full h-full bg-gray-400 rounded-lg animate-pulse " />
              ) : (
                <img
                  src={event.img}
                  alt={event.name}
                  className="w-[300px] h-[250px] rounded-lg"
                />
              )}
            </div>

            <div className="event-detail">
              <h3>{event.name}</h3>
              <span className="category">{event.category}</span>
              <strong className="price">
                {Number(event.price).toFixed(2)} EGP
              </strong>
              <p>{event.description}</p>
              <div className="event-more-info">
                <div className="flex items-center">
                  <img src={Venue} alt="venue" className="w-6" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex-gap items-center ">
                  <img src={Date} alt="date" className="w-6" />
                  <span>{event.date}</span>
                </div>
              </div>
              <Loading isLoading={loading}>
                <button
                  className=" btn btn-user "
                  onClick={handleBookEvent}
                  disabled={booked}
                >
                  {booked ? "Booked" : " Book Now"}
                </button>
              </Loading>
            </div>
          </div>
        ) : (
          <h3>No Events Were Found</h3>
        )}
      </Error>
    </>
  );
}

export default Events;
