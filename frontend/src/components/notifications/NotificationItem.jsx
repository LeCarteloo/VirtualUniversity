import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "../../styles/notifications.scss";

const NotificationItem = ({ topic, text }) => {
  return (
    <div className="notification">
      <FontAwesomeIcon icon={faEnvelope} size="2xl" />
      <p className="notification-text">
        {text}
        <span style={{ fontWeight: "800" }}> {topic} </span>
      </p>
    </div>
  );
};

export default NotificationItem;
