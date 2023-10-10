import "../../styles/navBar.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff, faGear } from "@fortawesome/free-solid-svg-icons";

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

const NavBar = ({navItems}) => {
  const [nav, setNav] = useState(false);
  const [t] = useTranslation("translation");
  const [showModal, setShowModal] = useState(false);

  const navState = !nav ? "hidden" : "";

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
