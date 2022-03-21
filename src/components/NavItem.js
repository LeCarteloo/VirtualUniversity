import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "../styles/navItem.scss";

const NavItem = ({ icon, name, nav }) => {
  const navState = !nav ? "hidden" : "";

  return (
    <li className="nav-item">
      <a href="/" className={navState}>
        <FontAwesomeIcon icon={faTimes} className="nav-icon" />
        <span className={`nav-name ${navState}`}> {name} </span>
      </a>
    </li>
  );
};

export default NavItem;
