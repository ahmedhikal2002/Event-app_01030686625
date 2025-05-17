import React from "react";
import "./UpdateEvent.css";
import CreateEvent from "../CrateEvent/CreateEvent";
import Close from "../../../src/assets/red-x-10333.png";
function UpdateEvent({ toggleModelState, item }) {
  return (
    <div className="model">
      <span className="close flex-cen" onClick={toggleModelState}>
        <img src={Close} alt="close" />
      </span>
      <CreateEvent
        update="Update"
        item={item}
        toggleModelState={toggleModelState}
      />
    </div>
  );
}

export default UpdateEvent;
