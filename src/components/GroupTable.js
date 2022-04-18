import Table from "./Table";
import "../styles/groupTable.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const GroupTable = ({ title, icon, object }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className={`table-group ${collapse && "open"}`}>
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
              <Table key={i} headers={object.headers} rows={row} />
            ))
          : "No data to display"}
      </div>
    </div>
  );
};

export default GroupTable;
