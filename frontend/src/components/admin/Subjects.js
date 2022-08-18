import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { validate } from "../../utility/validate";
import { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import Modal from "../Modal";
import Input from "../Input";
import Dropdown from "../Dropdown";
import Button from "../Button";
import { errorToast, successToast } from "../../utility/toast";

const initialSubject = {
  name: "",
  type: "",
  hours: "",
  ects: "",
  credit: "",
  lecturer: "",
};

const Subjects = () => {
  const [subjects, setSubjects] = useState();
  const [lecturers, setLecturers] = useState();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [subject, setSubject] = useState({ ...initialSubject });
  const [errors, setErrors] = useState({ ...initialSubject });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const headers = ["Name", "Type", "Credit", "ECTS"];

  const creditOptions = [
    { _id: "1", name: "Non-graded credit" },
    { _id: "2", name: "Graded credit" },
    { _id: "3", name: "Exam" },
  ];

  const typeOptions = [
    { _id: "1", name: "Labolatory" },
    { _id: "2", name: "Exercise" },
    { _id: "3", name: "Lecture" },
    { _id: "4", name: "Other" },
  ];

  const inputs = [
    {
      label: "Name",
      regex: /^[a-zA-Z\s]+$/,
      error: "Name should contain only letters",
    },
    {
      label: "Hours",
      regex: /^[0-9]+$/,
      error: "Hours should be numeric",
      type: "number",
    },
    {
      label: "ECTS",
      regex: /^[0-9]+$/,
      error: "ECTS should be numeric",
      type: "number",
    },
  ];

  // Adding event on subbmiting form inside modal
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

    if (subject.type === "") {
      validateErrors["type"] = "Please choose one of the types";
    }

    setErrors({ ...errors, ...validateErrors });

    // Check if there is any error
    for (const error of Object.values(validateErrors)) {
      if (error !== "") {
        return;
      }
    }

    try {
      setAddModal(false);
      const response = await axiosPrivate.post(
        "/subjects",
        JSON.stringify({ ...subject, lecturer: subject.lecturer._id })
      );
      setSubjects([...subjects, subject]);
      setSubject({ ...initialSubject });
      successToast("Successfully added subject");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  // Updating event on subbmiting form inside modal
  const onEditSubject = async (e) => {
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
      setEditModal(!editModal);

      const response = await axiosPrivate.put(
        `/subjects/${subject._id}`,
        JSON.stringify(subject)
      );

      const newState = subjects.map((obj) =>
        obj._id === subject._id ? { ...obj, ...subject } : obj
      );

      setSubjects(newState);
      setSubject({ ...initialSubject });
      successToast("Successfully edited subject");
    } catch (error) {
      errorToast(error?.response?.message?.data);
    }
  };

  // Removing event on action
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

  const editSubjectModal = async (id) => {
    const foundSubject = subjects.find((obj) => obj._id === id);
    setSubject({ ...subject, ...foundSubject });
    setEditModal(!editModal);
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
        onEdit={editSubjectModal}
        onAdd={() => setAddModal(!addModal)}
        onRemove={onRemoveSubject}
      />
      {/* Add subject modal */}
      <Modal
        show={addModal}
        title={"Add subject"}
        onClose={() => {
          setAddModal(!addModal);
          setSubject({ ...initialSubject });
          setErrors({ ...initialSubject });
        }}
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
            selected={subject.type}
            setSelected={(type) => {
              setErrors({ ...errors, type: "" });
              setSubject({ ...subject, type: type.name });
            }}
            options={typeOptions}
            error={errors.type}
          />
          <Dropdown
            selected={subject.lecturer.name}
            setSelected={(lecturer) => {
              setErrors({ ...errors, lecturer: "" });
              setSubject({ ...subject, lecturer });
            }}
            options={
              lecturers &&
              lecturers.map((lecturer) => {
                return {
                  _id: lecturer._id,
                  name: `${lecturer.name}  ${lecturer.surname}`,
                };
              })
            }
            error={errors.lecturer}
          />
          <Dropdown
            selected={subject.credit}
            setSelected={(credit) => {
              setErrors({ ...errors, credit: "" });
              setSubject({ ...subject, credit: credit.name });
            }}
            options={creditOptions}
            error={errors.credit}
          />
          <Button text={"Add subject"} />
        </form>
      </Modal>
      {/* Edit subject modal */}
      <Modal
        title={"Edit modal"}
        show={editModal}
        onClose={() => {
          setEditModal(!editModal);
          setSubject({ ...initialSubject });
          setErrors({ ...initialSubject });
        }}
      >
        <form onSubmit={onEditSubject}>
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
            selected={subject.type}
            setSelected={(type) => {
              setErrors({ ...errors, type: "" });
              setSubject({ ...subject, type: type.name });
            }}
            options={typeOptions}
            error={errors.type}
          />
          <Dropdown
            selected={
              subject.lecturer.name
                ? subject.lecturer.name
                : subject.lecturerName
            }
            setSelected={(lecturer) => {
              setErrors({ ...errors, lecturer: "" });
              setSubject({ ...subject, lecturer });
            }}
            options={lecturers}
            error={errors.lecturer}
          />
          <Dropdown
            selected={subject.credit}
            setSelected={(credit) => {
              setErrors({ ...errors, credit: "" });
              setSubject({ ...subject, credit: credit.name });
            }}
            options={creditOptions}
            error={errors.credit}
          />
          <Button text={"Edit subject"} />
        </form>
      </Modal>
    </section>
  );
};

export default Subjects;
