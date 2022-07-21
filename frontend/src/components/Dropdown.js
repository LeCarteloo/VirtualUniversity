import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import "../styles/buttons.scss";

const Dropdown = ({ state, setState, options, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="dropdown-btn"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <div className="dropdown-txt">
          {!state ? "Choose one" : state}
          <FontAwesomeIcon icon={faAngleUp} size="xl" />
        </div>
        <div className={`options ${isOpen && "open"}`}>
          {options &&
            options.map((option) => (
              <div
                key={`dropdown-option-${option._id}`}
                className={`option ${option.name === state && "selected"}`}
                onClick={() => setState(option)}
                tabIndex={0}
              >
                {option.name}
              </div>
            ))}
        </div>
      </button>
      <p className="error-msg">{error}</p>
    </>
  );
};

export default Dropdown;
