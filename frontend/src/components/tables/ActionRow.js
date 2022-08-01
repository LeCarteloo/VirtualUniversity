import Input from "../Input";
import "../../styles/table.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faTrash } from "@fortawesome/free-solid-svg-icons";

const ActionRow = ({ data, onChange, onEdit, onRemove }) => {
  console.log(data);

  return (
    <div className="row-action">
      <div className="inputs-wrapper">
        <div className="inputs-container">
          {data.map((dat) =>
            Object.keys(dat).map((key) => (
              <Input label={key} value={dat[key]} labelBg={"#2f3142"} />
            ))
          )}
        </div>
      </div>
      <div className="action-container">
        <button>
          <FontAwesomeIcon icon={faGear} size="xl" />
        </button>
        <button>
          <FontAwesomeIcon icon={faTrash} size="xl" />
        </button>
      </div>
    </div>
  );
};

export default ActionRow;
