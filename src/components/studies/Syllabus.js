import GroupTable from "../GroupTable";

const Syllabus = () => {
  const sylla = {
    headers: [
      "Subject",
      "Lecturer",
      "Class type",
      "Hours",
      "ECTS points",
      "Zaliczenie",
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
