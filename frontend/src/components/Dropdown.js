import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "../styles/buttons.scss";

const Dropdown = ({ selected, setSelected, options, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        type="button"
        className={`dropdown-btn ${error && "error"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <div aria-hidden={true} className="dropdown-txt">
          {!selected ? "Choose one" : selected}
          <FontAwesomeIcon icon={faAngleUp} size="xl" />
        </div>
      </button>
      <div className={`options ${isOpen && "open"}`}>
        {options &&
          options.map((option) => (
            <button
              type="button"
              key={`dropdown-option-${option._id}`}
              className={`option ${option.name === selected && "selected"}`}
              onClick={() => {
                setSelected(option);
                setIsOpen(!isOpen);
              }}
              tabIndex={0}
            >
              {option.name}
            </button>
          ))}
      </div>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

Dropdown.propTypes = {
  state: PropTypes.string,
  setSelected: PropTypes.func,
  options: PropTypes.array,
  error: PropTypes.string,
};

export default Dropdown;
