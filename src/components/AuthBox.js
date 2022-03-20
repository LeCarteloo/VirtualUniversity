import { Link } from "react-router-dom";

import "../styles/authBox.css";

import LoginPeople from "../assets/login_people.svg";
import BgAuth from "../assets/bg-auth.svg";

import TextInput from "./TextInput";
import Button from "./Button";

const AuthBox = ({ type, path, values }) => {
  return (
    <section className="auth-section">
      <img src={BgAuth} alt="Background blob" className={`auth-blob ${type}`} />
      <div className="auth-container">
        <div className={`auth-inputs ${type}`}>
          {/* Later add Form */}
          <h2>{values.title}</h2>
          <TextInput label={values.firstInput} />
          <TextInput label={values.secondInput} />
          <Button text={values.actionText} />
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
