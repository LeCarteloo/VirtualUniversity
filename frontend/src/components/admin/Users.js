import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AdminTable from "./AdminTable";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/modal.scss";

const Users = () => {
  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const [addModal, setAddModal] = useState();
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    album: "",
    role: "",
    course: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    album: "",
    role: "",
    course: "",
  });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const headers = ["Name", "Surname", "Email", "Album"];

  const inputs = [
    {
      label: "Name",
      regex: /^[a-zA-Z]+$/,
      error: "Name should contain only letters",
    },
    {
      label: "Surname",
      regex: /^[a-zA-Z]+$/,
      error: "Surname should contain only letters",
    },
    {
      label: "Email",
      type: "email",
      autoComplete: "new-password",
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: "Email should be a valid email adress",
    },
    {
      label: "Password",
      type: "password",
      autoComplete: "new-password",
      regex:
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      error:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
    },
  ];

  const roles = [
    { _id: "1", name: "Student" },
    { _id: "2", name: "Teacher" },
    { _id: "3", name: "Admin" },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/courses");
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    getCourses();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    inputs.forEach((input) => {
      const name = input.label.toLowerCase();
      const error = validate(name, user[name], input.regex, input.error);
      validateErrors[error.name] = error.msg;
    });

    if (user.role === "") {
      validateErrors["role"] = "Please choose one of the roles";
    }

    if (user.course === "") {
      validateErrors["course"] = "Please choose one of the courses";
    }

    setErrors({ ...errors, ...validateErrors });

    for (const error of Object.values(errors)) {
      if (error !== "") {
        return;
      }
    }

    try {
      const response = await axiosPrivate.post(
        "users/register",
        JSON.stringify({ ...user, course: user.course._id })
      );
    } catch (error) {
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        className: "toast",
      });
    }
  };

  const validate = (inputName, value, regex, error) => {
    if (value === "") {
      return {
        name: inputName,
        msg: `${inputName[0].toUpperCase() + inputName.slice(1)} is required`,
      };
    }

    if (!regex.test(value)) {
      return {
        name: inputName,
        msg: error,
      };
    }

    return {
      name: inputName,
      msg: "",
    };
  };

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <ToastContainer />
      <AdminTable
        title={"Users"}
        data={users}
        headers={headers}
        onAdd={() => setAddModal(true)}
      />
      <Modal
        title={"Add user"}
        show={addModal}
        onClose={() => setAddModal(!addModal)}
      >
        <form onSubmit={onSubmit}>
          {inputs.map((input, i) => (
            <Input
              key={`users-input-${i}`}
              {...input}
              name={input.label.toLowerCase()}
              value={user[input.label.toLowerCase()]}
              onChange={(e) => {
                const error = validate(
                  e.target.name,
                  e.target.value,
                  input.regex,
                  input.error
                );
                setErrors({ ...errors, [error.name]: error.msg });
                setUser({ ...user, [e.target.name]: e.target.value });
              }}
              error={errors[input.label.toLowerCase()]}
            />
          ))}
          <Dropdown
            state={user.role}
            setState={(role) => {
              setErrors({ ...errors, role: "" });
              setUser({ ...user, role: role.name });
            }}
            options={roles}
            error={errors.role}
          />
          <Dropdown
            state={user.course.name}
            setState={(course) => {
              setErrors({ ...errors, course: "" });
              setUser({ ...user, course: course });
            }}
            options={courses}
            error={errors.course}
          />
          <Button text="Add user"></Button>
        </form>
      </Modal>
    </section>
  );
};

export default Users;
