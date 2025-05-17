import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../Dashboard/AdminDashboard";
import { useEffect } from "react";
import { getAllEvents } from "../../Store/AdminSlice/ThunkActions";
import EventList from "../EventList/EventList";
import Heading from "../../Utils/Heading";
import CloneEvents from "../../Utils/CloneEvents";

import "./Main.css";

import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
function Main() {
  const user = useSelector((state) => state.auth.user);
  const allEvents = useSelector((state) => state.admin.events);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch, user]);

  return (
    <Loading isLoading={loading}>
      <Error error={error}>
        <Heading>All Events</Heading>
        <div className="main">
          <CloneEvents
            events={allEvents}
            renderEvent={(items) => (
              <EventList key={items.id} item={items} user={true} />
            )}
          />
        </div>
      </Error>
    </Loading>
  );
}

export default Main;
