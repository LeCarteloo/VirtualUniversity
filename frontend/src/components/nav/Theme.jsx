import Switch from "./Switch";

const Theme = () => {
  return (
    <div style={{ display: "flex", width: "100%", gap: "1em" }}>
      <button className="theme dark active">
        <div className="theme-header">
          <h2>Dark theme</h2>
          <div className="theme-switch">
            <Switch />
          </div>
        </div>
        <div className="theme-footer">
          <div className="theme-circle"></div>
        </div>
      </button>
      <button className="theme light">
        <div className="theme-header">
          <h2>Light theme</h2>
          <div className="theme-switch">
            <Switch />
          </div>
        </div>
        <div className="theme-footer">
          <div className="theme-circle"></div>
        </div>
      </button>
    </div>
  );
};

export default Theme;
