import PropTypes from "prop-types";

const Checkbox = ({ value, onChange, label }) => {
  return (
    <label className="checkbox-label">
      <input type="checkbox" onChange={() => onChange(!value)} />
      <svg
        className={`checkbox ${value ? "checked" : ""}`}
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke={value ? "#2f3142" : "none"}
        />
      </svg>
      {label}
    </label>
  );
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
};

export default Checkbox;
