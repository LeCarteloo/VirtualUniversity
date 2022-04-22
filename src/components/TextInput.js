import "../styles/inputs.scss";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const TextInput = ({ type, label, value, error, onChange }) => {
  return (
    <div className="input-container">
      <div className="input">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className={error && "error"}
          placeholder=" "
        />
        <label> {label} </label>
        {error && (
          <p className="display-error">
            <FontAwesomeIcon icon={faTimes} style={{ paddingRight: "0.5em" }} />
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

TextInput.defaultProps = {
  type: "text",
};

TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;
