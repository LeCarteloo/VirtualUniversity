import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphonesSimple,
  faScroll,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const EventItem = ({
  title,
  author,
  startTime,
  length,
  isCanceled,
  isOnline,
  desc,
  room,
  code,
}) => {
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
          <span>01 mar 2022 16:30 - 18:00</span>
          <h4 className="tooltip-title">
            {isCanceled && "Canceled: "}
            {title}
          </h4>
          <p>{desc}</p>
          <p>Room: {room}</p>
          <p>Code: {code}</p>
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
