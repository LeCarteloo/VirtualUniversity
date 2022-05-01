import FlagPL from "../../assets/flag-pl.svg";
import FlagEN from "../../assets/flag-en.svg";
import i18n from "i18next";

import { useEffect, useState } from "react";

const Language = () => {
  const [open, setOpen] = useState(false);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpen(false);
  };

  useEffect(() => {
    const item = localStorage.getItem("language");
    if (item) {
      changeLanguage(item);
    }
  }, []);

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
        <li onClick={() => changeLanguage("en")}>
          <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
          English
        </li>
        <li onClick={() => changeLanguage("pl")}>
          <img src={FlagPL} alt="PL Flag" width={"30px"} height={"30px"} />
          Polish
        </li>
      </ul>
    </div>
  );
};

export default Language;
