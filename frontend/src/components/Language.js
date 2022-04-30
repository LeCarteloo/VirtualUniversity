import FlagPL from "../assets/flag-pl.svg";
import FlagEN from "../assets/flag-en.svg";
import { useState } from "react";
import i18n from "i18next";

const Language = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lang-dropdown">
      <div className="selected-lang" onClick={() => setOpen(!open)}>
        {i18n.language === "en" ? (
          <div className="lang">
            <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
            <span>English</span>
          </div>
        ) : (
          <div className="lang">
            <img src={FlagPL} alt="PL Flag" width={"30px"} height={"30px"} />
            <span>Polish</span>
          </div>
        )}
      </div>
      <ul className={open ? "open" : ""}>
        <li
          onClick={() => {
            i18n.changeLanguage("en");
            setOpen(false);
          }}
        >
          <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
          English
        </li>
        <li
          onClick={() => {
            i18n.changeLanguage("pl");
            setOpen(false);
          }}
        >
          <img src={FlagPL} alt="PL Flag" width={"30px"} height={"30px"} />
          Polish
        </li>
      </ul>
    </div>
  );
};

export default Language;
