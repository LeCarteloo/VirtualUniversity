import PropTypes from "react";
import "../styles/buttons.scss";

const Button = ({ text, bgColor, fontColor, onClick }) => {
  return (
    <button
      type="submit"
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
