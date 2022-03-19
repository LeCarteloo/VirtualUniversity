import "../styles/authBox.css";
import LoginPeople from "../assets/login_people.svg";

import TextInput from "./TextInput";
import Button from "./Button";

const AuthBox = () => {
  return (
    <section className="auth-section">
      <div className="auth-container">
        <div className="auth-inputs">
          <h2>Sign in</h2>
          <TextInput label="Email" />
          <TextInput label="Password" />
          <Button text="Login" />
        </div>
        <div className="auth-route">
          Routes
          <img src={LoginPeople} alt="People" />
        </div>
      </div>
    </section>
  );
};

export default AuthBox;
