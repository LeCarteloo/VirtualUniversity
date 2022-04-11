import "../../styles/payments.scss";
import PayItem from "./PayItem";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const Payments = () => {
  return (
    <section className="payments-section">
      <div className="accounts">
        <div className="header">Your bank accounts</div>
        <div className="content">No bank accounts to display</div>
      </div>

      <div className="charges">
        <div className="header">
          Your charges
          <FontAwesomeIcon icon={faInfoCircle} size="lg" />
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
