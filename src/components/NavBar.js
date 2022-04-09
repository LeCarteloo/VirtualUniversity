import { useState } from "react";
import { Link } from "react-router-dom";

import NavItem from "./NavItem";

import "../styles/navBar.scss";
import Logo from "../assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faCalendarDays,
  faLayerGroup,
  faFileArrowDown,
  faGraduationCap,
  // faHouse,
  faMoneyCheckDollar,
  fa5,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const navState = !nav ? "hidden" : "";

  // Navbar navigation items
  const navItems = [
    {
      name: "Articles",
      nav: nav,
      icon: faNewspaper,
      path: "articles",
    },
    {
      name: "Calendar",
      icon: faCalendarDays,
      path: "calendar",
    },
    {
      name: "Grades",
      icon: fa5,
      path: "grades",
    },
    {
      name: "Your studies",
      icon: faGraduationCap,
      subLinks: [
        { name: "Course of study", path: "course" },
        { name: "Insurance", path: "insurance" },
        { name: "Optional subjects", path: "optional_subjects" },
        { name: "Graduation work", path: "graduation_work" },
      ],
    },
    {
      name: "Payments",
      icon: faMoneyCheckDollar,
      path: "payments",
    },
    {
      name: "Shared drive",
      icon: faFolder,
      path: "drive",
    },
    {
      name: "Files",
      icon: faFileArrowDown,
      path: "files",
    },
    {
      name: "Groups",
      icon: faLayerGroup,
      path: "groups",
    },
  ];

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
          {navItems.map((navItem) => (
            <NavItem
              key={navItem.name}
              {...navItem}
              nav={nav}
              onClose={() => setNav(false)}
            />
          ))}
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
