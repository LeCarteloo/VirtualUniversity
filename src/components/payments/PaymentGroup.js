import Table from "../Table";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const PaymentGroup = ({ title, icon, object }) => {
  const [collapse, setCollapse] = useState(false);

  return (
    <div
      className={`payment-group ${collapse && "open"}`}
      onClick={() => setCollapse(!collapse)}
    >
      <div className="header">
        <span> {title} </span>
        <div className="icon-group">
          {icon && (
            <FontAwesomeIcon
              style={{ marginRight: "0.5em" }}
              icon={icon}
              size="lg"
            />
          )}
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
      </div>
      <div className="content">
        {object.rows.length > 0
          ? object.rows.map((row) => (
              <Table headers={object.headers} rows={row} />
            ))
          : "No data to display"}
      </div>
    </div>
  );
};

export default PaymentGroup;
