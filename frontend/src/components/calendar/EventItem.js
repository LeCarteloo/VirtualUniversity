import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphonesSimple,
  faScroll,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
// import { useState } from "react";

const EventItem = ({
  title,
  author,
  startDate,
  endDate,
  isCanceled,
  isOnline,
  desc,
  room,
  code,
}) => {
  // console.log("S", startDate);
  // console.log("E", endDate);

  startDate = new Date(startDate);
  endDate = new Date(endDate);

  // console.log(new Date());
  // console.log(startDate.getUTCHours());

  // Event start time
  const startTime = startDate.getUTCHours() + startDate.getUTCMinutes() / 60;

  // Counting the length of event
  const datesDiff = (endDate - startDate) / 1000;

  const hours = Math.floor(datesDiff / 3600) % 24;
  const minutes = Math.floor(datesDiff / 60) % 60;
  const length = hours + minutes / 60;

  // Date display in tooltip
  const date =
    startDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }) +
    " - " +
    endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div
      style={{
        height: length * 102 + "px",
        top: (startTime - 8) * 102 + "px",
      }}
      className={`event-item ${isCanceled && "canceled"}`}
    >
      <div className="event-marker"></div>
      <div className="event-content">
        <div>
          <span className="event-title"> {title} </span>
          {length > 0.5 && <span className="event-author"> {author} </span>}
        </div>
        {isOnline && length > 0.7 && (
          <div>
            <FontAwesomeIcon icon={faHeadphonesSimple} />
            <span className="event-type">ONLINE</span>
          </div>
        )}
      </div>
      <FontAwesomeIcon className="event-info" icon={faScroll} />
      <span className="event-tooltip">
        <div className="tooltip-wrapper">
          <span> {date} </span>
          <h4 className="tooltip-title">
            {isCanceled && "Canceled: "}
            {title}
          </h4>
          <p>{desc}</p>
          <p>Room: {room} </p>
          <p>Code: {code} </p>
          <hr style={{ margin: "1em 0em 1em 0em" }} />
          <footer>
            <div>
              <FontAwesomeIcon icon={faUser} className="tooltip-icon" />
              <span className="event-author"> {author} </span>
            </div>
            {isOnline && (
              <div>
                <FontAwesomeIcon
                  icon={faHeadphonesSimple}
                  className="tooltip-icon"
                />
                <span className="event-type">Online</span>
              </div>
            )}
          </footer>
        </div>
      </span>
    </div>
  );
};

EventItem.defaultProps = {
  room: "-",
  code: "-",
};

export default EventItem;
