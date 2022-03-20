import PropTypes from "react";
import "../styles/buttons.css";

const Button = ({ text, bgColor, fontColor, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: fontColor,
      }}
      className="btn"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  bgColor: "#339fcd",
  fontColor: "#FFF",
};

export default Button;
