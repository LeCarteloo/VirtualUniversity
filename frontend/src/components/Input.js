import "../styles/inputs.scss";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Input = ({ type, label, labelBg, value, leadIcon, error, onChange }) => {
  return (
    <div className="input-container">
      <div className="input-wrapper">
        {leadIcon && (
          <FontAwesomeIcon icon={faUser} size="xl" className="leading-icon" />
        )}
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={`${error && "error"} ${leadIcon && "hasLeadIcn"}`}
          placeholder=" "
          autoComplete="off"
        />
        <label
          className={leadIcon && "hasLeadIcn"}
          style={{ backgroundColor: labelBg }}
        >
          {label}
        </label>
        {error && (
          <FontAwesomeIcon
            icon={faCircleExclamation}
            size="xl"
            className="error-icon"
          />
        )}
      </div>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

Input.defaultProps = {
  type: "text",
  labelBg: "#242434",
};

Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
