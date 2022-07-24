const clear = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    return { ...acc, [key]: "" };
  }, {});
};

export { clear };
