import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookedEvents } from "../../Store/UserSlice/ThunkActions";
import CloneEvents from "../../Utils/CloneEvents";
import EventList from "../../Components/EventList/EventList";
import "./user-evrnts.css";
import Heading from "../../Utils/Heading";
function UserEvents() {
  const bookedEvents = useSelector((state) => state.user.bookedEvents);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getBookedEvents());
    }
  }, [dispatch, user]);

  return (
    <>
      <Heading>My list</Heading>
      <div className="user-event ">
        <CloneEvents
          events={bookedEvents}
          renderEvent={(item) => {
            return <EventList key={item.id} item={item} user={true} />;
          }}
        />
      </div>
    </>
  );
}

export default UserEvents;
