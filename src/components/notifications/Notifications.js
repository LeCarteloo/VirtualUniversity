import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import NotificationItem from "./NotificationItem";

import "../../styles/notifications.scss";

const Notifications = () => {
  return (
    <div className="notifications">
      <FontAwesomeIcon icon={faBell} size="xl" className="notif-icon" />
      <span className="notif-amount show">1</span>
      <div className="notif-tooltip">
        <div className="tooltip-header">Notifications</div>
        <div className="tooltip-content">
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
          <NotificationItem />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
