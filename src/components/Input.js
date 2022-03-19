import "../styles/inputs.css";

const Input = ({ name }) => {
  return (
    <div className="input-container">
      <h3> {name} </h3>
      <input type="text" />
    </div>
  );
};

export default Input;
