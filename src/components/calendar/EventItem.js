import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphonesSimple,
  faScroll,
} from "@fortawesome/free-solid-svg-icons";

const EventItem = ({
  title,
  author,
  startTime,
  length,
  isCanceled,
  isOnline,
  extra,
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
    </div>
  );
};

export default EventItem;
