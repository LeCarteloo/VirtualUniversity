const validate = (inputName, value, regex, error) => {
  if (value === "") {
    return {
      name: inputName,
      msg: `${inputName[0].toUpperCase() + inputName.slice(1)} is required`,
    };
  }

  if (!regex.test(value)) {
    return {
      name: inputName,
      msg: error,
    };
  }

  return {
    name: inputName,
    msg: "",
  };
};

export { validate };
