import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "../styles/navItem.scss";

const NavItem = ({ icon, name, nav, path, subLinks }) => {
  const navState = !nav ? "hidden" : "";
  const [item, setItem] = useState(false);
  return (
    <li
      className={`nav-item ${item ? "open" : ""}`}
      {...(subLinks && { onClick: () => setItem(!item) })}
    >
      <div className={`nav-link ${item ? "open" : ""}`}>
        <FontAwesomeIcon icon={icon} size="xl" className="nav-icon" />
        <span className={`nav-name ${navState}`}>
          {name}
          {subLinks && (
            <FontAwesomeIcon
              icon={faAngleDown}
              size="lg"
              className={`nav-accor ${item ? "open" : ""}`}
            />
          )}
        </span>
      </div>
      {subLinks && (
        <div className={`sub-links ${item ? "open" : ""}`}>
          {subLinks &&
            subLinks.map((subLink) => (
              <div key={subLink} className="nav-link">
                <FontAwesomeIcon
                  icon={icon}
                  size="xl"
                  className="nav-icon sub-icon"
                />
                <span className={`nav-name sub-name ${navState} `}>
                  {subLink}
                </span>
              </div>
            ))}
        </div>
      )}
    </li>
  );
};

export default NavItem;
