import { useState } from "react";
import GroupTable from "../GroupTable";
import Button from "../Button";

const ChoiceItem = ({ title, choices }) => {
  const [selected, setSelected] = useState(null);

  const toggleCheckbox = (e) => {
    if (selected === e.target.value) {
      setSelected(null);
    } else {
      setSelected(e.target.value);
    }
    // console.log(e.target.id, e.target.value, e.target.value === selected);
  };

  return (
    <GroupTable title={title}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#2f3142",
          padding: "1em",
          borderRadius: "10px",
        }}
      >
        {choices.options.map((option) => (
          <div
            className="choices"
            key={option.id}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <label htmlFor={option.id}>{option.name}</label>
            <span>{option.person}</span>
            <input
              type="checkbox"
              id={option.id}
              value={option.name}
              checked={option.name === selected}
              onChange={toggleCheckbox}
            />
          </div>
        ))}
        <Button text={"Choice subject"} onClick={() => console.log(selected)} />
      </div>
    </GroupTable>
  );
};

export default ChoiceItem;
