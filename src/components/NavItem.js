import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import "../styles/navItem.scss";

const NavItem = ({ icon, name, nav, path }) => {
  const navState = !nav ? "hidden" : "";

  return (
    <li className="nav-item">
      <NavLink to="/dashboard" className="nav-link">
        <FontAwesomeIcon icon={icon} size="xl" className="nav-icon" />
        <span className={`nav-name ${navState}`}> {name} </span>
      </NavLink>
    </li>
  );
};

export default NavItem;
