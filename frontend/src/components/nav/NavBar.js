import "../../styles/navBar.scss";
import { Link } from "react-router-dom";
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
  faPowerOff,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

// Images
import Logo from "../../assets/logo.png";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import Language from "./Language";
import NavItem from "./NavItem";
import Theme from "./Theme";
import Modal from "../Modal";

const NavBar = () => {
  const [nav, setNav] = useState(false);
  const [t] = useTranslation("translation");
  const [showModal, setShowModal] = useState(false);

  const navState = !nav ? "hidden" : "";

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
          <Modal
            title={t("navbar.options")}
            show={showModal}
            onClose={() => setShowModal(false)}
          >
            <h3 style={{ margin: "1em 0em 0.5em" }}>{t("navbar.language")}</h3>
            <Language />
            <h3 style={{ margin: "1em 0em 0.5em" }}>{t("navbar.theme")}</h3>
            <Theme />
            {/* <Switch /> */}
          </Modal>
          <button onClick={() => setShowModal(!showModal)}>
            <FontAwesomeIcon icon={faGear} size="2xl" className="icon" />
          </button>
          <Link to="/">
            <FontAwesomeIcon icon={faPowerOff} size="xl" className="icon" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
