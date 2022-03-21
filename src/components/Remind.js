import { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/auth.scss";

import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

import Button from "./Button";
import TextInput from "./TextInput";

const Remind = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");

  const [loginError, setLoginError] = useState("");
  const [emailError, setEmailError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!login) {
      setLoginError(`Login cannot be empty!`);
    }
    if (!email) {
      setEmailError(`Email cannot be empty!`);
    }
  };

  return (
    <section className="auth-section">
      <img src={BgAuth} alt="Background blob" className="auth-blob remind" />
      <div className="auth-container">
        <div className="auth-inputs remind">
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
              label="Email"
              error={emailError}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button text="Remind password" />
          </form>
        </div>
        <div className="auth-remind remind">
          <div className="remind-text">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Exercitationem, molestiae.
            </p>
            <Link to="/">
              <Button text="Sign in" bgColor={"#1164aa"} />
            </Link>
          </div>
          <img src={LoginPeople} alt="People" />
        </div>
      </div>
    </section>
  );
};

export default Remind;
