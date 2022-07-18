import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Dropdown = ({ state, setState, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
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
        {options.map((option, i) => (
          <div
            key={`dropdown-option-${i}`}
            className={`option ${option === state && "selected"}`}
            onClick={() => setState(option)}
            tabIndex={0}
          >
            {option}
          </div>
        ))}
      </div>
    </button>
  );
};

export default Dropdown;
