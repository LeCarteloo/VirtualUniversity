import "../styles/modal.scss";

const Modal = () => {
  return (
    <dialog open>
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
  );
};

export default Modal;
