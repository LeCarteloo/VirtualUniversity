import { useState } from "react";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

import "../styles/navBar.scss";
import Logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { fa5 } from "@fortawesome/free-solid-svg-icons";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const navState = !nav ? "hidden" : "";

  // const studiesSubLinks = ["Sub1", "Sub2", "Sub3"];
  const studiesSubLinks = [
    "Course of study",
    "Insurance",
    "Optional subjects",
    "Graduation work",
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
          <NavItem
            name="Dashboard"
            nav={nav}
            icon={faHouse}
            path="/dashboard"
          />
          <NavItem
            name="Timetable"
            nav={nav}
            icon={faCalendarDays}
            path="/timetable"
          />
          <NavItem name="Grades" nav={nav} icon={fa5} path="/grades" />
          <NavItem
            name="Your studies"
            nav={nav}
            icon={faGraduationCap}
            subLinks={studiesSubLinks}
          />
          <NavItem
            name="Payments"
            nav={nav}
            icon={faMoneyCheckDollar}
            path="/payments"
          />
          <NavItem
            name="Shared drive"
            nav={nav}
            icon={faFolder}
            path="/drive"
          />
          <NavItem
            name="Files"
            nav={nav}
            icon={faFileArrowDown}
            subLinks={filesSubLinks}
          />
          <NavItem name="Groups" nav={nav} icon={faLayerGroup} path="/groups" />
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
