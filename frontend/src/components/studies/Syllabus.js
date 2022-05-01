import { useTranslation } from "react-i18next";

import GroupTable from "../GroupTable";

const Syllabus = () => {
  const [t] = useTranslation("translation");

  const sylla = {
    headers: [
      t("student.subject"),
      t("student.lecturer"),
      t("student.classType"),
      t("student.hours"),
      t("student.ects"),
      t("student.credit"),
    ],
    rows: [
      [
        "Artifical Intelligence",
        "prof. John Doe",
        "Labolatory",
        "30",
        "15",
        "Exam",
      ],
      [
        "Artifical Intelligence",
        "prof. John Doe",
        "Labolatory",
        "30",
        "15",
        "Exam",
      ],
      [
        "Artifical Intelligence",
        "prof. John Doe",
        "Labolatory",
        "30",
        "15",
        "Exam",
      ],
    ],
  };

  return (
    <section
      className="syllabus-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <GroupTable title={"Syllabus - summer 2021/2022"} object={sylla} />
    </section>
  );
};

export default Syllabus;
