const validate = (label, name, value, regex, error) => {
  if (value === "") {
    return {
      name: name,
      msg: `${label} is required`,
    };
  }

  if (!regex.test(value)) {
    return {
      name: name,
      msg: error,
    };
  }

  return {
    name: name,
    msg: "",
  };
};

export { validate };
