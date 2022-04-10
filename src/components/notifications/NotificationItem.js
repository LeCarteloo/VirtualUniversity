import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import "../../styles/notifications.scss";

const NotificationItem = () => {
  return (
    <div className="notification">
      <FontAwesomeIcon icon={faEnvelope} size="2xl" />
      <p className="notification-text">
        You got a new grade in
        <span style={{ fontWeight: "800" }}> Artifical Inteligence</span>
      </p>
    </div>
  );
};

export default NotificationItem;
