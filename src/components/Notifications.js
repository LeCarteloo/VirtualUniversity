import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import "../styles/notifications.scss";

const Notifications = () => {
  return (
    <div className="notifications">
      <FontAwesomeIcon icon={faBell} size="xl" className="notif-icon" />
      <span className="notif-amount show">1</span>
    </div>
  );
};

export default Notifications;
