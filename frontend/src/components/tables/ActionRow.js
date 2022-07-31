import Input from "../Input";
import "../../styles/table.scss";

const ActionRow = ({ inputs, onEdit, onRemove }) => {
  return (
    <div className="deletable-row">
      <div className="inputs-wrapper">
        <div className="inputs-container">
          <Input label={"Hey1"} labelBg={"#2f3142"} />
          <Input label={"Hey2"} labelBg={"#2f3142"} />
          <Input label={"Hey3"} labelBg={"#2f3142"} />
          <Input label={"Hey3"} labelBg={"#2f3142"} />
        </div>
      </div>
      <div className="action-container">
        <button>EDIT</button>
        <button>REMOVE</button>
      </div>
    </div>
  );
};

export default ActionRow;
