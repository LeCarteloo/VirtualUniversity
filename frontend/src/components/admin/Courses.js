import { useEffect, useState } from "react";
import SelectionTable from "../SelectionTable";
import SearchInput from "../SearchInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorToast } from "../../utility/toast";

const Courses = () => {
  const [courses, setCourses] = useState();
  const [subjects, setSubjects] = useState();

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/courses");
        setCourses(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
      }
    };
    const getSubjects = async () => {
      try {
        const response = await axiosPrivate.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
      }
    };
    getCourses();
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
