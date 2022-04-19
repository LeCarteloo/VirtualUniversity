import GroupTable from "../GroupTable";

const Groups = () => {
  const groups = {
    headers: ["Group name", "Type", "University teacher"],
    rows: [
      ["Group A", "Exercises", "prof. John Doe"],
      ["Group B", "Exercises", "prof. John Doe"],
      ["English A", "Exercises", "prof. John Doe"],
      ["English B", "Exercises", "prof. John Doe"],
      ["SO A", "Laboratory", "prof. John Doe"],
      ["SO B", "Laboratory", "prof. John Doe"],
    ],
  };

  return (
    <section
      className="groups-section"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <GroupTable title={"Groups"} object={groups} />
    </section>
  );
};

export default Groups;
