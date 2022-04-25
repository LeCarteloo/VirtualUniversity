import Table from "./Table";
import "../styles/groupTable.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const GroupTable = ({
  title,
  actionIcon,
  onAction,
  object,
  isCollapsed,
  tabOrient,
  children,
}) => {
  const [collapse, setCollapse] = useState(isCollapsed);
  return (
    <div className={`table-group ${!collapse && "open"}`}>
      <div className="header" onClick={() => setCollapse(!collapse)}>
        <span> {title} </span>
        <div className="icon-group">
          {actionIcon && (
            <button className="action-btn" onClick={onAction}>
              <FontAwesomeIcon
                style={{ marginRight: "0.5em" }}
                icon={actionIcon}
                size="xl"
              />
            </button>
          )}
          <FontAwesomeIcon
            className="group-accor"
            icon={faAngleDown}
            size="lg"
          />
        </div>
      </div>
      <div className="content">
        {object &&
          object.rows.length > 0 &&
          object.rows.map((row, i) => (
            <Table
              key={i}
              headers={object.headers}
              rows={row}
              orient={tabOrient}
            />
          ))}
        {!children && !object ? "No data to display" : children}
      </div>
    </div>
  );
};

GroupTable.defaultProps = {
  isCollapsed: true,
};

export default GroupTable;
