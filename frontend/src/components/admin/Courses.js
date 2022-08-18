import { useEffect, useState } from "react";
import SelectionTable from "../SelectionTable";
import SearchInput from "../SearchInput";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorToast } from "../../utility/toast";
import AdminTable from "./AdminTable";
import Modal from "../Modal";
import Input from "../Input";

const initialNewCourse = {
  name: "",
  degree: "",
  year: new Date().getFullYear(),
  semester: "",
  type: "",
  department: "",
  subjects: [],
};

const initialErrors = {
  name: "",
  degree: "",
  year: "",
  semester: "",
  type: "",
  department: "",
  subjects: "",
};

const Courses = () => {
  const [courses, setCourses] = useState();
  const [subjects, setSubjects] = useState();
  const [addModal, setAddModal] = useState(false);
  const [course, setCourse] = useState({ ...initialNewCourse });
  const [errors, setErrors] = useState({ ...initialErrors });

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

  const headers = ["Name", "Year", "Semester", "Degree", "Type"];

  const inputs = [
    {
      label: "Name",
      name: "name",
      regex: /^[a-zA-Z\s]+$/,
      error: "Name should contain only letters",
    },
    {
      label: "Year",
      name: "year",
      type: "number",
      regex: /^(20[0-4]\d|2050)$/,
      error: "Year should be in range 2000 - 2050",
    },
    {
      label: "Department",
      name: "department",
      regex: /^[a-zA-Z\s]+$/,
      error: "Department should contain only letters",
    },
  ];

  const degreeOptions = [
    { _id: 1, name: "Engineer" },
    { _id: 2, name: "Master" },
    { _id: 3, name: "Doctoral" },
  ];

  const semesterOptions = [
    { _id: 1, name: "Summer" },
    { _id: 2, name: "Winter" },
  ];

  const typeOptions = [
    { _id: 1, name: "Full-time" },
    { _id: 2, name: "Part-time" },
  ];

  return (
    <section className="courses-section">
      <AdminTable
        title="Courses"
        data={courses}
        headers={headers}
        onAdd={() => setAddModal(!addModal)}
      />
      <Modal
        title="Add course"
        show={addModal}
        onClose={() => setAddModal(!addModal)}
      >
        {inputs.map((input, i) => (
          <Input key={`courses-input-${i}`} {...input} />
        ))}
      </Modal>
    </section>
  );
};

{
  /* <details>
      <summary>Pick subjects...</summary>
      <SearchInput placeholder={"Search..."} />
      <div className="option-test">
        <SelectionTable data={subjects} headers={["Name", "Type", "Hours"]} />
      </div>
  </details> */
}

export default Courses;
