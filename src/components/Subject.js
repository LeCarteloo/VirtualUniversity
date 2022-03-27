import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faBookBookmark } from "@fortawesome/free-solid-svg-icons";

import "../styles/subject.scss";

const Subject = ({ icon, title, type, grades }) => {
  const [subjectItem, setSubjectItem] = useState(false);

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
          <table>
            <tbody>
              <tr>
                <th>First term</th>
                <th>Second term</th>
                <th>Conditional</th>
                <th>Promotion</th>
                <th>Committee</th>
              </tr>
              <tr>
                <td> {grades.first} </td>
                <td> {grades.second} </td>
                <td> {grades.cond} </td>
                <td> {grades.promo} </td>
                <td> {grades.comit} </td>
              </tr>
            </tbody>
          </table>
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
