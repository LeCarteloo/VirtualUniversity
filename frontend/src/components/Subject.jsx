import "../styles/subject.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faBookBookmark } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";

// Components
import Table from "./Table";

const Subject = ({
  icon,
  name,
  type,
  firstTerm,
  secondTerm,
  conditional,
  promotion,
  committe,
}) => {
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
            <span className="subject-name"> {name} </span>
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
            rows={[firstTerm, secondTerm, conditional, promotion, committe]}
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
  firstTerm: "-",
  secondTerm: "-",
  conditional: "-",
  promotion: "-",
  committe: "-",
};

export default Subject;
