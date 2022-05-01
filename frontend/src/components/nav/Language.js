import i18n from "i18next";

import FlagPL from "../../assets/flag-pl.svg";
import FlagEN from "../../assets/flag-en.svg";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageBlock = () => {
  const [lang, setLang] = useState("English");
  const [t] = useTranslation("translation");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    setLang(lang);
  };

  useEffect(() => {
    const item = localStorage.getItem("language");
    if (item) {
      changeLanguage(item);
    }
  }, []);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <button
        className={`language-block ${lang === "en" ? "active" : ""}`}
        onClick={() => {
          changeLanguage("en");
        }}
      >
        <img src={FlagEN} alt="PL Flag" width={"50px"} height={"50px"} />
        <h2>{t("navbar.english")}</h2>
      </button>
      <button
        className={`language-block ${lang === "pl" ? "active" : ""}`}
        onClick={() => {
          changeLanguage("pl");
        }}
      >
        <img src={FlagPL} alt="PL Flag" width={"50px"} height={"50px"} />
        <h2>{t("navbar.polish")}</h2>
      </button>
    </div>
  );
};

export default LanguageBlock;
