import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/auth.scss";

import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

import { animated, useSpring } from "react-spring";

import Button from "./Button";
import TextInput from "./TextInput";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const anim = [
    "M143.106-7.574s2.2,610.439,0,608.234,0,472.5,0,472.5h1920.01L2063.093-7.574",
    "M895.043-7.574s-72.186,438.929,406.056,596S1582.035,1073,1582.035,1073l481.081.16L2063.093-7.574",
  ];

  const animationProps = useSpring({
    anim: anim,
  });

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
            <Link to="/home/dashboard">
              <Button text="Login in" />
            </Link>
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1171.954"
        height="1080.738"
        viewBox="0 0 1171.954 1080.738"
        className="transition-svg"
      >
        <g transform="translate(-748.162 0.574)">
          <animated.path
            class="a"
            d="M895.043-7.574s-72.186,438.929,406.056,596S1582.035,1073,1582.035,1073l481.081.16L2063.093-7.574"
            transform="translate(-143 7)"
          />
        </g>
      </svg>
    </section>
  );
};

export default Login;
