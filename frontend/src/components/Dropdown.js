import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import "../styles/buttons.scss";

const Dropdown = ({ selected, setSelected, options, error, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`dropdown-btn ${error && "error"}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <div className="dropdown-txt">
          {!selected ? placeholder : selected}
          <FontAwesomeIcon icon={faAngleUp} size="xl" />
        </div>
      </button>
      <ul className={`options ${isOpen && "open"}`} tabIndex={-1}>
        <li>
          {options &&
            options.map((option) => (
              <button
                type="button"
                role="option"
                aria-selected={option.name === selected}
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
        </li>
      </ul>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

Dropdown.propTypes = {
  state: PropTypes.string,
  setSelected: PropTypes.func,
  options: PropTypes.array,
  error: PropTypes.string,
  placeholder: PropTypes.string,
};

Dropdown.defaultProps = {
  placeholder: "Choose one",
};

export default Dropdown;
