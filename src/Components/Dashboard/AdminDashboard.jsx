import Container from "../../Utils/Container";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../Store/AdminSlice/ThunkActions";
import CloneEvents from "../../Utils/CloneEvents";
import EventList from "../EventList/EventList";
import Heading from "../../Utils/Heading";
import Loading from "../../Utils/Loading";
import Error from "../../Utils/Error";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const events = useSelector((state) => state.admin.events);
  const loading = useSelector((state) => state.admin.loading);
  const error = useSelector((state) => state.admin.error);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      if (user?.role === "user") {
        navigate("/");
      }
    }
    dispatch(getAllEvents());
  }, [dispatch, navigate, user]);
  return (
    <>
      <Heading>All Events</Heading>
      <Loading isLoading={loading}>
        <Error error={error}>
          <div className="">
            <CloneEvents
              events={events}
              renderEvent={(items) => <EventList key={items.id} item={items} />}
            />
          </div>
        </Error>
      </Loading>
    </>
  );
};

export default AdminDashboard;
