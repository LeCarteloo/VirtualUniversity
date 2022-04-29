import FlagPL from "../assets/flag-pl.svg";
import FlagEN from "../assets/flag-en.svg";
import { useState } from "react";
import i18n from "i18next";

const Language = () => {
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="lang-dropdown">
      <div className="selected-lang" onClick={() => setOpen(!open)}>
        <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
        English
      </div>
      <ul className={open ? "open" : ""}>
        <li onClick={changeLanguage("en")}>
          <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
          English
        </li>
        <li onClick={changeLanguage("pl")}>
          <img src={FlagPL} alt="PL Flag" width={"30px"} height={"30px"} />
          Polish
        </li>
      </ul>
    </div>
  );
};

export default Language;
