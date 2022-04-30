import "../styles/subject.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBookBookmark } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";

// Components
import Table from "./Table";

const Subject = ({ icon, title, type, grades }) => {
  const [subjectItem, setSubjectItem] = useState(false);
  const [t] = useTranslation("translation");

  return (
    <div
      className={`subject-item ${subjectItem ? "open" : ""}`}
      onClick={() => setSubjectItem(!subjectItem)}
    >
      <div className="subject-icon">
        <FontAwesomeIcon icon={icon} size="3x" />
      </div>
      <div className="subject-text">
        <div className="subject-header">
          <div className="subject-info">
            <span className="subject-name"> {title} </span>
            <span className="subject-type"> {type} </span>
          </div>
          <FontAwesomeIcon
            icon={faAngleDown}
            size="2x"
            className={`accor-icon ${subjectItem ? "open" : ""}`}
          />
        </div>
        <div className="subject-grades">
          <Table
            headers={[
              t("grades.firstTerm"),
              t("grades.secondTerm"),
              t("grades.conditional"),
              t("grades.promotion"),
              t("grades.committe"),
            ]}
            rows={[
              grades.first,
              grades.second,
              grades.cond,
              grades.promo,
              grades.comit,
            ]}
            bg="transparent"
            padd={"0.3em 0.3em 0.3em 0"}
          />
        </div>
      </div>
    </div>
  );
};

Subject.defaultProps = {
  icon: faBookBookmark,
  grades: {
    first: "-",
    second: "-",
    cond: "-",
    promo: "-",
    comit: "-",
  },
};

export default Subject;
