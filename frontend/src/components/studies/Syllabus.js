import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import GroupTable from "../GroupTable";

const Syllabus = () => {
  const [t] = useTranslation("translation");
  const [syllabus, setSyllabus] = useState();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getSyllabus = async () => {
      try {
        const response = await axiosPrivate.get("/courses/me");
        setSyllabus(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getSyllabus();
  }, []);

  const tableHeaders = [
    t("student.subject"),
    t("student.lecturer"),
    t("student.classType"),
    t("student.hours"),
    t("student.ects"),
    t("student.credit"),
  ];

  return (
    <section
      className="syllabus-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {syllabus &&
        syllabus.map((syll, i) => (
          <GroupTable
            key={`group-table-${i}`}
            title={`${syll.name} - ${syll.year} ${syll.semester}`}
            tableData={syll.subjects}
            tableKeys={["name", "lecturer", "type", "hours", "ects", "credit"]}
            tableHeaders={tableHeaders}
            isCollapsed={false}
          />
        ))}
    </section>
  );
};

export default Syllabus;
