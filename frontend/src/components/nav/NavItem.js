import "../../styles/navItem.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { NavLink } from "react-router-dom";
import { useState } from "react";

import ConditionalWrapper from "./ConditionalWrapper";

const NavItem = ({ icon, name, nav, path, subLinks, onClose }) => {
  const navState = !nav ? "hidden" : "";
  const [item, setItem] = useState(false);

  //TODO: CoditionalWrapper needs some tweeks

  return (
    <li
      className={`nav-item ${item ? "open" : ""}`}
      {...(subLinks && { onClick: () => setItem(!item) })}
    >
      <ConditionalWrapper
        item={item}
        condition={!subLinks}
        wrapper={(children) => (
          <NavLink
            to={path ? path : ""}
            className={`nav-link ${item ? "open" : ""}`}
            onClick={onClose}
          >
            {children}
          </NavLink>
        )}
      >
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={icon} size="xl" className="nav-icon" />
        </div>
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
      </ConditionalWrapper>
      {subLinks && (
        <div className={`sub-links ${item ? "open" : ""}`}>
          {subLinks &&
            subLinks.map((subLink) => (
              <NavLink
                to={subLink.path}
                key={subLink.name}
                className="nav-link"
                onClick={onClose}
              >
                <FontAwesomeIcon
                  icon={subLink.icon}
                  size="xl"
                  className="nav-icon sub-icon"
                />
                <span className={`nav-name sub-name ${navState} `}>
                  {subLink.name}
                </span>
              </NavLink>
            ))}
        </div>
      )}
    </li>
  );
};

export default NavItem;
