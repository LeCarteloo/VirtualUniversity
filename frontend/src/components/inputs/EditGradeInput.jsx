import { faPen, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const EditGradeInput = ({ value, setValue, isChanged }) => {
  return (
    <div className="grade-input">
      <form onSubmit={(e) => e.preventDefault()}>
        <input type="text" value={value} onChange={setValue} />
        <button className={`grade-button ${isChanged ? "changed" : ""}`}>
          <FontAwesomeIcon icon={isChanged ? faCheckCircle : faPen} />
        </button>
      </form>
    </div>
  );
};

EditGradeInput.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  isChanged: PropTypes.bool,
};

export default EditGradeInput;
