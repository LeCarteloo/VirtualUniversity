import TextInput from "./TextInput";
import Button from "./Button";

import { useState } from "react";

const Form = ({ type, values }) => {
  const [firstInput, setFirst] = useState("");
  const [firstError, setFirstError] = useState("");

  const [secondInput, setSecond] = useState("");
  const [secondError, setSecondError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!firstInput) {
      setFirstError(`${values.firstInput} cannot be empty!`);
    }
    if (!secondInput) {
      setSecondError(`${values.secondInput} cannot be empty!`);
    }
  };

  return (
    <div>
      <form className="auth-form" onSubmit={onSubmit}>
        <TextInput
          label={values.firstInput}
          error={firstError}
          onChange={(e) => {
            setFirst(e.target.value);
          }}
        />
        <TextInput
          type={type === "login" ? "password" : ""}
          error={secondError}
          label={values.secondInput}
          onChange={(e) => {
            setSecond(e.target.value);
          }}
        />
        <Button text={values.actionText} />
      </form>
    </div>
  );
};

export default Form;
