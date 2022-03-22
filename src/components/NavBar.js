import { useState } from "react";

import NavItem from "./NavItem";

import "../styles/navBar.scss";
import Logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const navState = !nav ? "hidden" : "";

  return (
    <nav className={`nav-bar ${navState}`}>
      <div className="nav-header">
        <div className={`nav-logo ${navState}`}>Placeholder</div>
        <div className="nav-hamburger" onClick={() => setNav(!nav)}>
          <div className={`hamburger-line ${nav ? "active" : ""}`}></div>
          <div className={`hamburger-line ${nav ? "active" : ""}`}></div>
          <div className={`hamburger-line ${nav ? "active" : ""}`}></div>
        </div>
      </div>

      <ul className="nav-items">
        <NavItem name="Dashboard" nav={nav} icon={faFolder} />
        <NavItem name="Timetable" nav={nav} icon={faFolder} />
        <NavItem name="Grades" nav={nav} icon={faFolder} />
        <NavItem name="Your studies" nav={nav} icon={faFolder} />
        <NavItem name="Payments" nav={nav} icon={faFolder} />
        <NavItem name="Shared drive" nav={nav} icon={faFolder} />
        <NavItem name="Files" nav={nav} icon={faFolder} />
        <NavItem name="Groups" nav={nav} icon={faFolder} />
      </ul>

      <div className="user-info">
        <a href="/">
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            size="xl"
            className="logout-icon"
          />
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
