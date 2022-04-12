import "../../styles/payments.scss";
import PayItem from "./PayItem";
import AccountItem from "./AccountItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faPlusCircle,
  faAngleDown,
  faAngleUp,
} from "@fortawesome/free-solid-svg-icons";

const Payments = () => {
  return (
    <section className="payments-section">
      <div className="finanse-info">
        <div className="header">
          <span>University information</span>
          <FontAwesomeIcon icon={faAngleDown} size="lg" />
        </div>
        <div className="content">No bank accounts to display</div>
      </div>

      <div className="accounts">
        <div className="header">
          <span>Your bank accounts</span>
          <div className="icon-group">
            <FontAwesomeIcon
              icon={faPlusCircle}
              size="lg"
              style={{ marginRight: "0.5em" }}
            />
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          </div>
        </div>
        <div className="content">
          {/* No bank accounts to display */}
          <AccountItem />
        </div>
      </div>

      <div className="charges">
        <div className="header">
          Your charges
          <div className="icon-group">
            <FontAwesomeIcon
              icon={faInfoCircle}
              size="lg"
              style={{ marginRight: "0.5em" }}
            />
            <FontAwesomeIcon icon={faAngleDown} size="lg" />
          </div>
        </div>
        <div className="content">
          {/* No charges to display */}
          <PayItem />
          <PayItem />
        </div>
      </div>
    </section>
  );
};

export default Payments;
