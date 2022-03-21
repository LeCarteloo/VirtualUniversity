import "../styles/inputs.css";

import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const TextInput = ({ type, label, value, error, onChange }) => {
  return (
    <div className="input-container">
      <label> {label} </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={error && "error"}
      />
      {error && (
        <p className="display-error">
          <FontAwesomeIcon icon={faTimes} style={{ paddingRight: "0.5em" }} />
          {error}
        </p>
      )}
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
