import React, { useEffect, useState } from "react";
import "./eventList.css";
import Venue from "../../assets/location-pin-2965.png";
import Date from "../../assets/red-calendar-11016.png";
import Price from "../../assets/offer-9678.png";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../Store/AdminSlice/ThunkActions";
import UpdateEvent from "../UpdateModel/Updateevent";
import Loading from "../../Utils/Loading";
import { NavLink } from "react-router-dom";
import { cancelEvent } from "../../Store/UserSlice/ThunkActions";

function EventList({ item, user }) {
  const { name, category, venue, description, img, date, price } = item;
  const loading = useSelector((state) => state.user.loading);
  const adminLoad = useSelector((state) => state.admin.loading);
  const [openModel, setOpenModel] = useState(false);
  const toggleModelState = () => {
    setOpenModel((prev) => !prev);
  };

  useEffect(() => {
    if (openModel) {
      document.getElementById("root-model").classList.add("wrapper");
    } else {
      document.getElementById("root-model").classList.remove("wrapper");
    }
  }, [openModel]);
  const dispatch = useDispatch();
  return (
    <>
      <div className={`${!user ? "event-list" : "event-list-user "}`}>
        <div className={`${!user ? "event-details flex-gap" : "event-user"}`}>
          <div className="event-panner">
            <img src={img} alt={name} />
          </div>
          <div className="event-info">
            <h3 className="line-clamp-1">{name}</h3>
            {!user && (
              <>
                <span className="category">{category}</span>
                <p className="text-sm">{description}</p>
              </>
            )}
            <div className="more-info">
              <span className="flex gap-1 items-center ">
                <img src={Venue} alt="venue" /> <p>{venue}</p>
              </span>
              <span className="flex gap-2 items-center">
                <img src={Date} alt="date" /> <p>{date}</p>
              </span>
              {!user && (
                <span className="flex gap-2 items-center">
                  <img src={Price} alt="price" />
                  <p>{Number(price).toFixed(2)} </p>
                  EGP
                </span>
              )}
            </div>
          </div>
        </div>

        {!user ? (
          <div className="flex-gap">
            <button className=" btn-update btn" onClick={toggleModelState}>
              Update
            </button>
            <Loading isLoading={adminLoad}>
              <button
                className="btn btn-delete"
                onClick={() => dispatch(deleteEvent(item?.id))}
              >
                Delete
              </button>
            </Loading>
          </div>
        ) : (
          <div>
            <NavLink to={`/event-details/${item.id}`}>
              <Loading isLoading={loading}>
                <button className="btn btn-user">View Details</button>
              </Loading>
            </NavLink>

            <Loading isLoading={loading}>
              <button
                className="cancel-btn btn"
                onClick={() => dispatch(cancelEvent(item.id))}
              >
                Cancel Event
              </button>
            </Loading>
          </div>
        )}
      </div>
      {openModel && (
        <UpdateEvent toggleModelState={toggleModelState} item={item} />
      )}
    </>
  );
}

export default EventList;
