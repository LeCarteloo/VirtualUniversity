import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { faBrain } from "@fortawesome/free-solid-svg-icons";

import "../styles/subject.scss";

const Subject = () => {
  return (
    <div className="subject-item">
      <FontAwesomeIcon icon={faBrain} size="3x" className="subject-icon" />
      <div className="subject-content">
        <div className="subject-info">
          <span className="subject-name">Artificial Intelligence</span>
          <span className="subject-type">laboratory</span>
          <FontAwesomeIcon icon={faAngleDown} className="subject-accordion" />
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
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subject;
