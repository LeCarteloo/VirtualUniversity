import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.scss";
import useAuth from "../hooks/useAuth";

// Svgs
import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

// Components
import Button from "./Button";
import Input from "./Input";
import axios from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onSubmit = async (e) => {
    // Preventing refreshing
    e.preventDefault();

    if (!login) {
      setLoginError(`Login cannot be empty!`);
    }
    if (!password) {
      setPasswordError(`Password cannot be empty!`);
    }
    try {
      const response = await axios.post(
        "/users/login",
        JSON.stringify({ email: login, password }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { role, token } = response.data;
      const from =
        location.state?.from?.pathname || role === "admin"
          ? "/admin/users"
          : "/student/articles";

      setAuth({ role, token });
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        console.log("No server response");
      } else if (error.response?.status === 400) {
        console.log("Wrong name or password");
      } else {
        console.log("Login Failed");
      }
    }
  };

  return (
    <section className="auth-section">
      <img src={BgAuth} alt="Background blob" className="auth-blob login" />
      <div className="auth-container">
        <div className="auth-inputs">
          <h2>Remind password</h2>
          <form className="auth-form" onSubmit={onSubmit}>
            <Input
              label="Login"
              labelBg={"#1c1c2c"}
              error={loginError}
              onChange={(e) => {
                setLogin(e.target.value);
              }}
              value={login}
            />
            <Input
              type="password"
              label="Password"
              labelBg={"#1c1c2c"}
              error={passwordError}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <Button text="Login in" />
            {/* Admin shorcut for development */}
            <Link to="/admin/test">
              <Button text="Admin shortcut" />
            </Link>
            {/* User shorcut for development */}
            <Link to="/home/articles">
              <Button text="User shortcut" />
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
    </section>
  );
};

export default Login;
