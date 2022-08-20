import { useEffect, useState } from "react";
import SelectionTable from "../SelectionTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { errorToast, successToast } from "../../utility/toast";
import AdminTable from "./AdminTable";
import Modal from "../Modal";
import Input from "../Input";
import { validate } from "../../utility/validate";
import Dropdown from "../Dropdown";
import Button from "../Button";

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
  const [course, setCourse] = useState({ ...initialNewCourse });
  const [errors, setErrors] = useState({ ...initialErrors });
  const [modal, setModal] = useState();

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

  const dropdowns = [
    {
      name: "degree",
      options: [
        { _id: 1, name: "Engineer" },
        { _id: 2, name: "Master" },
        { _id: 3, name: "Doctoral" },
      ],
      error: "Please choose one of the degrees",
    },
    {
      name: "semester",
      options: [
        { _id: 1, name: "Summer" },
        { _id: 2, name: "Winter" },
      ],
      error: "Please choose one of the semesters",
    },
    {
      name: "type",
      options: [
        { _id: 1, name: "Full-time" },
        { _id: 2, name: "Part-time" },
      ],
      error: "Please choose one of the types",
    },
  ];

  const validateOnSubmit = () => {
    let validateErrors = {};

    // Validating all inputs and dropdowns
    inputs.forEach((input) => {
      const error = validate(
        input.name,
        course[input.name],
        input.regex,
        input.error
      );

      if (error.msg !== "") {
        validateErrors[error.name] = error.msg;
      }
    });

    dropdowns.forEach((drop) => {
      if (course[drop.name] === "") {
        validateErrors[drop.name] = drop.error;
      }
    });

    /* If there is at least one error update 
    errors state and prevent submitting */
    if (Object.keys(validateErrors).length !== 0) {
      setErrors({ ...errors, ...validateErrors });
      return false;
    }

    return true;
  };

  const onAddCourse = async (e) => {
    e.preventDefault();

    if (!validateOnSubmit()) {
      return;
    }

    // If no errors send payload
    try {
      const response = await axiosPrivate.post(
        "/courses/",
        JSON.stringify({
          ...course,
          subjects: course.subjects.map((subject) => subject._id),
        })
      );
      setModal();
      setCourses([...courses, course]);
      setCourse({ ...initialNewCourse });
      successToast("Successfully added course");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const onEditCourse = async (e) => {
    e.preventDefault();

    if (!validateOnSubmit()) {
      return;
    }

    try {
      const response = await axiosPrivate.put(
        `/courses/${course._id}`,
        JSON.stringify(course)
      );
      const newState = courses.map((obj) =>
        obj._id === course._id ? { ...obj, ...course } : obj
      );

      setCourses(newState);
      setCourse({ ...initialNewCourse });
      setModal();
      successToast("Successfully updated course");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const onRemoveCourse = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/courses/${id}`);
      setCourses(courses.filter((course) => course._id !== id));
      successToast("Successfully removed course");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  return (
    <section className="courses-section">
      <AdminTable
        title="Courses"
        data={courses}
        headers={headers}
        onAdd={() => setModal("add")}
        onEdit={(id) => {
          setModal("edit");
          setCourse(courses.find((course) => course._id === id));
        }}
        onRemove={(id) => onRemoveCourse(id)}
      />
      {/* Add modal */}
      <Modal
        title={"Add course"}
        show={modal === "add"}
        onClose={() => {
          setModal();
          setCourse({ ...initialNewCourse });
          setErrors({ ...initialErrors });
        }}
      >
        <form onSubmit={onAddCourse}>
          {inputs.map((input, i) => (
            <Input
              key={`courses-input-${i}`}
              {...input}
              value={course[input.name]}
              onChange={(e) => {
                const error = validate(
                  input.name,
                  e.target.value,
                  input.regex,
                  input.error
                );

                setCourse({ ...course, [input.name]: e.target.value });
                setErrors({ ...errors, [error.name]: error.msg });
              }}
              error={errors[input.name]}
            />
          ))}
          {dropdowns.map((drop, i) => (
            <Dropdown
              key={`dropdown-${i}`}
              selected={course[drop.name]}
              setSelected={(state) => {
                setErrors({ ...errors, [drop.name]: "" });
                setCourse({ ...course, [drop.name]: state.name });
              }}
              options={drop.options}
              error={errors[drop.name]}
            />
          ))}
          <details>
            <summary>Pick subjects</summary>
            {/* <SearchInput placeholder={"Search..."} /> */}
            <div className="option-test">
              <SelectionTable
                selection={course.subjects}
                setSelection={(selection) =>
                  setCourse({ ...course, subjects: selection })
                }
                data={subjects}
                headers={["Name", "Type", "Hours"]}
              />
            </div>
          </details>
          <Button text="Add course" />
        </form>
      </Modal>
      {/* Edit modal */}
      <Modal
        title={"Edit course"}
        show={modal === "edit"}
        onClose={() => {
          setModal();
          setCourse({ ...initialNewCourse });
          setErrors({ ...initialErrors });
        }}
      >
        <form onSubmit={onEditCourse}>
          {inputs.map((input, i) => (
            <Input
              key={`courses-input-${i}`}
              {...input}
              value={course[input.name]}
              onChange={(e) => {
                const error = validate(
                  input.name,
                  e.target.value,
                  input.regex,
                  input.error
                );

                setCourse({ ...course, [input.name]: e.target.value });
                setErrors({ ...errors, [error.name]: error.msg });
              }}
              error={errors[input.name]}
            />
          ))}
          {dropdowns.map((drop, i) => (
            <Dropdown
              key={`dropdown-${i}`}
              selected={course[drop.name]}
              setSelected={(state) => {
                setErrors({ ...errors, [drop.name]: "" });
                setCourse({ ...course, [drop.name]: state.name });
              }}
              options={drop.options}
              error={errors[drop.name]}
            />
          ))}
          <details>
            <summary>Pick subjects</summary>
            {/* <SearchInput placeholder={"Search..."} /> */}
            <div className="option-test">
              <SelectionTable
                selection={course.subjects}
                setSelection={(selection) =>
                  setCourse({ ...course, subjects: selection })
                }
                data={subjects}
                headers={["Name", "Type", "Hours"]}
              />
            </div>
          </details>
          <Button text="Edit course" />
        </form>
      </Modal>
    </section>
  );
};

export default Courses;
