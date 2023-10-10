import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faGear, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ActionButton = ({ onSee, onEdit, onRemove }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {onSee && (
        <button
          className="btn-action"
          onClick={() => {
            onSee();
            setOpen(!open);
          }}
        >
          {/* <span>See more</span> */}
          <FontAwesomeIcon icon={faEye} size="lg" />
        </button>
      )}
      {onEdit && (
        <button
          className="btn-action"
          onClick={() => {
            onEdit();
            setOpen(!open);
          }}
        >
          {/* <span>Edit row</span> */}
          <FontAwesomeIcon icon={faGear} size="lg" />
        </button>
      )}
      {onRemove && (
        <button
          className="btn-action"
          onClick={() => {
            onRemove();
            setOpen(!open);
          }}
        >
          {/* <span>Remove row</span> */}
          <FontAwesomeIcon icon={faTrash} size="lg" />
        </button>
      )}
    </>
  );
};

export default ActionButton;
