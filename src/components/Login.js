import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/authBox.css";

import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

import Button from "./Button";
import TextInput from "./TextInput";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!login) {
      setLoginError(`Login cannot be empty!`);
    }
    if (!password) {
      setPasswordError(`Password cannot be empty!`);
    }
  };

  return (
    <section className="auth-section">
      <img src={BgAuth} alt="Background blob" className="auth-blob login" />
      <div className="auth-container">
        <div className="auth-inputs">
          <h2>Remind password</h2>
          <form className="auth-form" onSubmit={onSubmit}>
            <TextInput
              label="Login"
              error={loginError}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
            />
            <TextInput
              type="password"
              label="Password"
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Button text="Login in" />
          </form>
        </div>
        <div className="auth-remind">
          <div className="remind-text">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, molestiae.
            </p>
            <Link to="/remind">
              <Button text="Remind password" bgColor={"#1164aa"} />
            </Link>
          </div>
          <img src={LoginPeople} alt="People" />
        </div>
      </div>
    </section>
  );
};

export default Login;
