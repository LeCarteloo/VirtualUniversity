import { Link } from "react-router-dom";

import "../styles/authBox.css";

import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

import Button from "./Button";
import Form from "./Form";

const AuthBox = ({ type, path, values, onSubmit }) => {
  return (
    <section className="auth-section">
      <img src={BgAuth} alt="Background blob" className={`auth-blob ${type}`} />
      <div className="auth-container">
        <div className={`auth-inputs ${type}`}>
          <h2>{values.title}</h2>
          <Form key={type} values={values} type={type} onSubmit={onSubmit} />
        </div>
        <div className={`auth-remind ${type}`}>
          <div className="remind-text">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
              earum vero officiis voluptates, recusandae cum laboriosam
              blanditiis iusto veritatis eveniet ex reiciendis nobis voluptate
              quasi esse dignissimos ipsam facilis excepturi.
            </p>
            <Link to={path}>
              <Button text={values.routeText} bgColor={"#1164aa"} />
            </Link>
          </div>
          <img src={LoginPeople} alt="People" />
        </div>
      </div>
    </section>
  );
};

export default AuthBox;
