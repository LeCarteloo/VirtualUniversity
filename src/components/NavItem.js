import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/navItem.scss";

const NavItem = ({ icon, name, nav }) => {
  const navState = !nav ? "hidden" : "";

  return (
    <li className="nav-item">
      <a href="/" className={navState}>
        <FontAwesomeIcon icon={icon} size="xl" className="nav-icon" />
        <span className={`nav-name ${navState}`}> {name} </span>
      </a>
    </li>
  );
};

export default NavItem;
