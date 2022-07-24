import { useEffect, useState } from "react";
import Subject from "./Subject";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Grades = () => {
  const [grades, setGrades] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getMyGrades = async () => {
      try {
        const response = await axiosPrivate.get("/users/grades/me");
        setGrades(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getMyGrades();
  }, []);

  return (
    <section
      className="grades-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      {grades &&
        grades.map((grade, i) => <Subject key={`subject-${i}`} {...grade} />)}
    </section>
  );
};

export default Grades;
