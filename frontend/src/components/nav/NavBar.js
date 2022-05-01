import "../../styles/navBar.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faCalendarDays,
  faLayerGroup,
  faFileArrowDown,
  faGraduationCap,
  faIdCard,
  faListCheck,
  faBook,
  faTimeline,
  faBriefcaseMedical,
  faMoneyCheckDollar,
  fa5,
  faNewspaper,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import NavItem from "./NavItem";
import Language from "./Language";
import Switch from "./Switch";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const navState = !nav ? "hidden" : "";
  const [t] = useTranslation("translation");

  // Navbar navigation items
  const navItems = [
    {
      name: t("navbar.articles"),
      nav: nav,
      icon: faNewspaper,
      path: "articles",
    },
    {
      name: t("navbar.calendar"),
      icon: faCalendarDays,
      path: "calendar",
    },
    {
      name: t("navbar.grades"),
      icon: fa5,
      path: "grades",
    },
    {
      name: t("navbar.yourstudies"),
      icon: faGraduationCap,
      subLinks: [
        { name: t("navbar.studentdata"), path: "student", icon: faIdCard },
        { name: t("navbar.syllabus"), path: "syllabus", icon: faTimeline },
        {
          name: t("navbar.insurance"),
          path: "insurance",
          icon: faBriefcaseMedical,
        },
        {
          name: t("navbar.choices"),
          path: "choices",
          icon: faListCheck,
        },
        {
          name: t("navbar.graduationwork"),
          path: "graduation_work",
          icon: faBook,
        },
      ],
    },
    {
      name: t("navbar.payments"),
      icon: faMoneyCheckDollar,
      path: "payments",
    },
    {
      name: t("navbar.shareddrive"),
      icon: faFolder,
      path: "drive",
    },
    {
      name: t("navbar.files"),
      icon: faFileArrowDown,
      path: "files",
    },
    {
      name: t("navbar.groups"),
      icon: faLayerGroup,
      path: "groups",
    },
  ];

  return (
    <nav className={`nav-bar ${navState}`}>
      <div className="nav-header">
        <div className={`nav-logo ${navState}`}>Placeholder</div>
        <button
          tabIndex={0}
          className="nav-hamburger"
          onClick={() => setNav(!nav)}
        >
          <div className={`hamburger-line ${nav ? "active" : ""}`}></div>
          <div className={`hamburger-line ${nav ? "active" : ""}`}></div>
          <div className={`hamburger-line ${nav ? "active" : ""}`}></div>
        </button>
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
          <Language />
          <Switch />
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
