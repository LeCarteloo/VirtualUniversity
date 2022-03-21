import { useState } from "react";

import NavItem from "./NavItem";

import "../styles/navBar.scss";
import Logo from "../assets/logo.png";

const NavBar = () => {
  const [nav, setNav] = useState(false);

  const navState = !nav ? "hidden" : "";

  return (
    <nav className={`nav-bar ${navState}`}>
      <div className="top-content">
        <div className="nav-logo"></div>
        <div
          className="nav-hamburger"
          onClick={() => {
            setNav(!nav);
            console.log("YO");
          }}
        ></div>
        {/* <img src={Logo} alt="Logo" /> */}
      </div>
      <ul className="nav-items">
        <NavItem name="First Item" nav={nav} />
        <NavItem name="Second Item" nav={nav} />
        <NavItem name="Third Item" nav={nav} />
      </ul>
    </nav>
  );
};

export default NavBar;
