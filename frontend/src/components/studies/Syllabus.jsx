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

  // Headers of each mapped table (inside GroupTable)
  const syllabusHeaders = [
    t("student.subject"),
    t("student.lecturer"),
    t("student.classType"),
    t("student.hours"),
    t("student.ects"),
    t("student.credit"),
  ];

  // Keys for reading the response object (from /course/me route)
  const syllabusKeys = ["name", "lecturer", "type", "hours", "ects", "credit"];

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
            dataKeys={syllabusKeys}
            tableHeaders={syllabusHeaders}
          />
        ))}
    </section>
  );
};

export default Syllabus;
