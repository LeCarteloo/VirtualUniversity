const ConditionalWrapper = ({ condition, item, wrapper, children }) => {
  return condition ? (
    wrapper(children)
  ) : (
    <div className={`nav-link ${item === true ? "open" : ""}`}>{children}</div>
  );
};

export default ConditionalWrapper;
