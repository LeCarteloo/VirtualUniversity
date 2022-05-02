import "../../styles/notifications.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import NotificationItem from "./NotificationItem";

const Notifications = ({ notifs }) => {
  const [notif, setNotif] = useState(false);
  const [t] = useTranslation("translation");

  return (
    <div className="notifications">
      <button onClick={() => setNotif(!notif)}>
        <FontAwesomeIcon icon={faBell} size="2xl" className="notif-icon" />
      </button>
      <span className="notif-amount show">{notifs.length}</span>
      <div className={`notif-tooltip ${notif && "open"}`}>
        <div className="tooltip-header">{t("notif.notifications")}</div>
        <div className="tooltip-wrapper">
          <div className="tooltip-content">
            {notifs.map((notif) => (
              <NotificationItem key={notif.id} {...notif} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
