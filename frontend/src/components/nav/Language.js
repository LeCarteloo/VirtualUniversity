import FlagPL from "../../assets/flag-pl.svg";
import FlagEN from "../../assets/flag-en.svg";
import i18n from "i18next";

// Hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Language = () => {
  const [open, setOpen] = useState(false);
  const [t] = useTranslation("translation");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setOpen(false);
  };

  console.log("YO");

  // useEffect(() => {
  //   const item = localStorage.getItem("language");
  //   if (item) {
  //     changeLanguage(item);
  //   }
  // }, []);

  return (
    <div className="lang-dropdown">
      <div className="selected-lang" onClick={() => setOpen(!open)}>
        {i18n.language === "en" ? (
          <div className="lang">
            <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
            <span>{t("navbar.english")}</span>
          </div>
        ) : (
          <div className="lang">
            <img src={FlagPL} alt="PL Flag" width={"30px"} height={"30px"} />
            <span>{t("navbar.polish")}</span>
          </div>
        )}
      </div>
      <ul className={open ? "open" : ""}>
        <li onClick={() => changeLanguage("en")}>
          <img src={FlagEN} alt="EN Flag" width={"30px"} height={"30px"} />
          {t("navbar.english")}
        </li>
        <li onClick={() => changeLanguage("pl")}>
          <img src={FlagPL} alt="PL Flag" width={"30px"} height={"30px"} />
          {t("navbar.polish")}
        </li>
      </ul>
    </div>
  );
};

export default Language;
