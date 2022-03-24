import { useState } from "react";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

import "../styles/navBar.scss";
import Logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const navState = !nav ? "hidden" : "";

  // const studiesSubLinks = ["Sub1", "Sub2", "Sub3"];
  const studiesSubLinks = [
    "Sub1",
    "Sub2",
    "Sub3",
    "Sub4",
    "Sub5",
    "Sub6",
    "Sub7",
    "Sub8",
  ];
  const filesSubLinks = ["Declaration", "Guidelines"];

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

      <div className="wrapper">
        <ul className="nav-items">
          <NavItem name="Dashboard" nav={nav} icon={faFolder} />
          <NavItem name="Timetable" nav={nav} icon={faFolder} />
          <NavItem name="Grades" nav={nav} icon={faFolder} />
          <NavItem
            name="Your studies"
            nav={nav}
            icon={faFolder}
            subLinks={studiesSubLinks}
          />
          <NavItem name="Payments" nav={nav} icon={faFolder} />
          <NavItem name="Shared drive" nav={nav} icon={faFolder} />
          <NavItem
            name="Files"
            nav={nav}
            icon={faFolder}
            subLinks={filesSubLinks}
          />
          <NavItem name="Groups" nav={nav} icon={faFolder} />
        </ul>
        <div className="user-info">
          <Link to="/">
            <FontAwesomeIcon
              icon={faArrowRightFromBracket}
              size="xl"
              className="logout-icon"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
