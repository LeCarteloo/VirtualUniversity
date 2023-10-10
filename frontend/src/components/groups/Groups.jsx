import GroupTable from "../GroupTable";
import { useTranslation } from "react-i18next";

const Groups = () => {
  const [t] = useTranslation("translation");

  const groups = {
    headers: [t("groups.groupName"), t("groups.type"), t("groups.uniTeacher")],
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
      <GroupTable title={t("groups.groups")} object={groups} />
    </section>
  );
};

export default Groups;
