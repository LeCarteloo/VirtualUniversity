import { useEffect, useState } from "react";

const Switch = () => {
  const [switchBtn, setSwitchBtn] = useState(
    localStorage.getItem("mode") === "dark" && true
  );

  console.log(switchBtn);

  useEffect(() => {
    const item = localStorage.getItem("mode");
    if (item === "dark") {
      setSwitchBtn(true);
    }
  }, []);

  return (
    <button
      className={`switch ${switchBtn ? "turned" : ""}`}
      onClick={() => {
        setSwitchBtn(!switchBtn);
        localStorage.setItem("mode", switchBtn ? "light" : "dark");
      }}
    ></button>
  );
};

export default Switch;
