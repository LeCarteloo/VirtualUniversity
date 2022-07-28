import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { validate } from "../../utility/validate";
import { clear } from "../../utility/clear";
import { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import Modal from "../Modal";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { errorToast, successToast } from "../../utility/toast";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [subject, setSubject] = useState({
    name: "",
    type: "",
    hours: "",
    ects: "",
    lecturer: "",
    credit: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    hours: "",
    ects: "",
    lecturer: "",
    credit: "",
  });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const headers = ["Name", "Type", "Credit", "ECTS"];

  const credits = [
    { _id: "1", name: "Non-graded credit" },
    { _id: "2", name: "Graded credit" },
    { _id: "3", name: "Exam" },
  ];

  const inputs = [
    {
      label: "Name",
      regex: /^[a-zA-Z\s]+$/,
      error: "Name should contain only letters",
    },
    {
      label: "Type",
      regex: /^[a-zA-Z]+$/,
      error: "Type should contain only letters",
    },
    {
      label: "Hours",
      regex: /^[0-9]+$/,
      error: "Hours should be numeric",
    },
    {
      label: "ECTS",
      regex: /^[0-9]+$/,
      error: "ECTS should be numeric",
    },
  ];

  const onAddSubject = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    // Validating all inputs and dropdowns
    inputs.forEach((input) => {
      const name = input.label.toLowerCase();
      const error = validate(name, subject[name], input.regex, input.error);
      validateErrors[error.name] = error.msg;
    });

    if (subject.credit === "") {
      validateErrors["credit"] = "Please choose one of the credits";
    }

    if (subject.lecturer === "") {
      validateErrors["lecturer"] = "Please choose one of the lecturers";
    }

    setErrors({ ...errors, ...validateErrors });

    // Check if there is any error
    for (const error of Object.values(validateErrors)) {
      if (error !== "") {
        return;
      }
    }

    try {
      const response = await axiosPrivate.post(
        "/subjects",
        JSON.stringify({ ...subject, lecturer: subject.lecturer._id })
      );
      setSubjects([...subjects, response.data]);
      setSubject(clear(subject));
      successToast("Successfully added subject");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const onRemoveSubject = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/subjects/${id}`);
      successToast("Successfully removed subject");
      setSubjects(
        subjects.filter((subject) => subject._id !== response.data._id)
      );
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await axiosPrivate.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    const getLecturers = async () => {
      try {
        const response = await axiosPrivate.get("/users/role/lecturer");
        setLecturers(response.data);
      } catch (error) {
        console.error(error);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    getSubjects();
    getLecturers();
  }, []);

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable
        title={"Subjects"}
        data={subjects}
        headers={headers}
        onAdd={() => setAddModal(!addModal)}
        onRemove={onRemoveSubject}
      />
      <Modal
        show={addModal}
        title={"Add subject"}
        onClose={() => setAddModal(!addModal)}
      >
        <form onSubmit={onAddSubject}>
          {inputs.map((input, i) => (
            <Input
              key={`subjects-input-${i}`}
              {...input}
              name={input.label.toLowerCase()}
              value={subject[input.label.toLowerCase()]}
              onChange={(e) => {
                const error = validate(
                  e.target.name,
                  e.target.value,
                  input.regex,
                  input.error
                );
                setErrors({ ...errors, [error.name]: error.msg });
                setSubject({ ...subject, [e.target.name]: e.target.value });
              }}
              error={errors[input.label.toLowerCase()]}
            />
          ))}
          <Dropdown
            state={subject.lecturer.name}
            setState={(lecturer) => {
              setErrors({ ...errors, lecturer: "" });
              setSubject({ ...subject, lecturer });
            }}
            options={lecturers}
            error={errors.lecturer}
          />
          <Dropdown
            state={subject.credit}
            setState={(credit) => {
              setErrors({ ...errors, credit: "" });
              setSubject({ ...subject, credit: credit.name });
            }}
            options={credits}
            error={errors.credit}
          />
          <Button text={"Add subject"} />
        </form>
      </Modal>
    </section>
  );
};

export default Subjects;
