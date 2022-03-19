import "../styles/authBox.css";
import Input from "./Input";

// Download toastify later and fontawensome

const AuthBox = () => {
  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="auth-inputs">
          Inputs
          <Input name="Login" />
        </div>
        <div className="auth-route">Routes</div>
      </div>
    </section>
  );
};

export default AuthBox;
