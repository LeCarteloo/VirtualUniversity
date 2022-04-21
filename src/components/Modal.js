import "../styles/modal.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ show, children, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Title</h2>
          <button className="modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} size="2xl" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">Footer</div>
      </div>
    </div>
  );
};

export default Modal;
