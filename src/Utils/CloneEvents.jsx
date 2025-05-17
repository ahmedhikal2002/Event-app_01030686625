import React from "react";
import Heading from "./Heading";

function CloneEvents({ events, renderEvent }) {
  const eventList =
    events.length > 0 ? (
      events.map((event) => renderEvent(event))
    ) : (
      <h3 className="text-primary-dark dark:text-Primary-light px-5 md:px-0">
        No events were found
      </h3>
    );

  return <>{eventList}</>;
}

export default CloneEvents;
