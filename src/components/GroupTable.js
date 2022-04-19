import Table from "./Table";
import "../styles/groupTable.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const GroupTable = ({ title, icon, object, isCollapsed, tabOrient }) => {
  const [collapse, setCollapse] = useState(isCollapsed);
  return (
    <div className={`table-group ${!collapse && "open"}`}>
      <div className="header" onClick={() => setCollapse(!collapse)}>
        <span> {title} </span>
        <div className="icon-group">
          {icon && (
            <FontAwesomeIcon
              style={{ marginRight: "0.5em" }}
              icon={icon}
              size="lg"
            />
          )}
          <FontAwesomeIcon
            className="group-accor"
            icon={faAngleDown}
            size="lg"
          />
        </div>
      </div>
      <div className="content">
        {object.rows.length > 0
          ? object.rows.map((row, i) => (
              <Table
                key={i}
                headers={object.headers}
                rows={row}
                orientation={tabOrient}
              />
            ))
          : "No data to display"}
      </div>
    </div>
  );
};

GroupTable.defaultProps = {
  isCollapsed: true,
};

export default GroupTable;