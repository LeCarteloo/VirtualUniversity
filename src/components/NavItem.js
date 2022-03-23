import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "../styles/navItem.scss";
import { useState } from "react";
const NavItem = ({ icon, name, nav, path, subLinks }) => {
  const navState = !nav ? "hidden" : "";
  const [item, setItem] = useState(false);
  return (
    <li className="nav-item" onClick={() => setItem(!item)}>
      <div className="nav-link">
        <FontAwesomeIcon icon={icon} size="xl" className="nav-icon" />
        <span className={`nav-name ${navState}`}> {name} </span>
      </div>
      {subLinks && (
        <div className={`extra-info ${item ? "open" : ""}`}>
          {subLinks &&
            subLinks.map((subLink) => (
              <div key={subLink} className="nav-link">
                <FontAwesomeIcon
                  icon={icon}
                  size="xl"
                  className="nav-icon sub-nav"
                />
                <span className={`nav-name sub-nav ${navState} `}>
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
