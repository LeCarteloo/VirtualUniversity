import "../styles/inputs.scss";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

const Input = (props) => {
  const { label, labelBg, leadIcon, error, onChange, ...inputProps } = props;

  return (
    <div className="input-container">
      <div className="input-wrapper">
        <input
          onChange={onChange}
          className={`${error && "error"} ${leadIcon && "hasLeadIcn"}`}
          placeholder=" "
          autoComplete="off"
          {...inputProps}
        />
        <label
          className={leadIcon && "hasLeadIcn"}
          style={{ backgroundColor: labelBg }}
        >
          {label}
        </label>
        {leadIcon && (
          <FontAwesomeIcon icon={faUser} size="xl" className="leading-icon" />
        )}
        <FontAwesomeIcon
          icon={faCircleExclamation}
          size="xl"
          className="error-icon"
        />
        <p className="error-msg">{error}</p>
      </div>
    </div>
  );
};

Input.defaultProps = {
  labelBg: "#242434",
};

Input.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
