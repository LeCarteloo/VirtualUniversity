import "../styles/inputs.css";
import PropTypes from "prop-types";
import { useState } from "react";

const TextInput = ({ label, value, error }) => {
  const [text, setText] = useState("");

  return (
    <div className="input-container">
      <label> {label} </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setText(e.target.value);
          //   console.log(text);
        }}
      />
      <p className="input-error"> {error} </p>
    </div>
  );
};

TextInput.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
};

export default TextInput;
