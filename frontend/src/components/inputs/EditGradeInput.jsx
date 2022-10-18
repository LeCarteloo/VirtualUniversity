import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditGradeInput = ({ value, setValue }) => {
  return (
    <div>
      <input
        type="number"
        step="0.5"
        min={2}
        max={5}
        value={value}
        onChange={(e) => setValue(e.target.valueAsNumber)}
      />
      <FontAwesomeIcon icon={faPen} />
    </div>
  );
};

export default EditGradeInput;
