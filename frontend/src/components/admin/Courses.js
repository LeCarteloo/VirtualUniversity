import { useEffect, useState } from "react";
import SelectionTable from "../SelectionTable";
import SearchInput from "../SearchInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Courses = () => {
  const [subjects, setSubjects] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await axiosPrivate.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSubjects();
  }, []);

  return (
    <section className="courses-section">
      <details>
        <summary>Pick subjects...</summary>
        <SearchInput placeholder={"Search..."} />
        <div className="option-test">
          <SelectionTable data={subjects} headers={["Name", "Type", "Hours"]} />
        </div>
      </details>
    </section>
  );
};

export default Courses;
