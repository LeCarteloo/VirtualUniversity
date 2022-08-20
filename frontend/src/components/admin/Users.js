import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { validate } from "../../utility/validate";
import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import "../../styles/modal.scss";
import { errorToast, successToast } from "../../utility/toast";

const initialUser = {
  name: "",
  surname: "",
  email: "",
  password: "",
  placeOfBirth: "",
  idDoc: "",
  role: "",
  course: "",
};

const Users = () => {
  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const [modal, setModal] = useState();
  const [user, setUser] = useState({ ...initialUser });
  const [errors, setErrors] = useState({ ...initialUser });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        setUsers(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/courses");
        setCourses(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    getUsers();
    getCourses();
  }, []);

  const headers = ["Name", "Surname", "Email", "Album"];

  const inputs = [
    {
      label: "Name",
      name: "name",
      regex: /^[a-zA-Z]+$/,
      error: "Name should contain only letters",
    },
    {
      label: "Surname",
      name: "surname",
      regex: /^[a-zA-Z]+$/,
      error: "Surname should contain only letters",
    },
    {
      label: "Email",
      name: "email",
      type: "email",
      autoComplete: "new-password",
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: "Email should be a valid email adress",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      autoComplete: "new-password",
      regex:
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
      error:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
    },
    {
      label: "Place of birth",
      name: "placeOfBirth",
      regex: /^[a-zA-z\s]+$/,
      error: "Place of birth should contain only letters",
    },
    {
      label: "ID number",
      name: "idDoc",
      regex: /^[a-zA-Z]{3}[0-9]{6}$/,
      error: "ID number should be valid number (e.g. ABC123456)",
    },
  ];

  const roles = [
    { _id: "1", name: "Student" },
    { _id: "2", name: "Lecturer" },
    { _id: "3", name: "Admin" },
  ];

  const validateOnSubmit = () => {
    let validateErrors = {};

    // Validating all inputs and dropdowns
    inputs.forEach((input) => {
      const error = validate(
        input.label,
        input.name,
        user[input.name],
        input.regex,
        input.error
      );

      if (error.msg !== "") {
        validateErrors[error.name] = error.msg;
      }
    });

    if (user.role === "") {
      validateErrors["role"] = "Please choose one of the roles";
    }

    if (user.role === "Student" && user.course === "") {
      validateErrors["course"] = "Please choose one of the courses";
    }

    /* If there is at least one error, update 
    errors state and prevent submitting */
    if (Object.keys(validateErrors).length !== 0) {
      setErrors({ ...errors, ...validateErrors });
      return false;
    }

    return true;
  };

  const onAddUser = async (e) => {
    e.preventDefault();

    if (!validateOnSubmit()) {
      return;
    }

    try {
      const response = await axiosPrivate.post(
        "users/register",
        JSON.stringify({ ...user, course: user.course._id })
      );
      console.log(response.data);
      setUsers([...users, response.data]);
      setUser({ ...initialUser });
      setModal();
      successToast("Successfully added user");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const onEditUser = async (e) => {
    e.preventDefault();

    if (!validateOnSubmit()) {
      return;
    }
  };

  const onRemoveUser = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/users/${id.toString()}`);
      setUsers(users.filter((user) => user._id !== response.data._id));
      successToast("Successfully removed user");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable
        title={"Users"}
        data={users}
        headers={headers}
        onAdd={() => setModal("add")}
        onEdit={(id) => {
          setModal("edit");
          setUser(users.find((obj) => obj._id === id));
        }}
        onRemove={onRemoveUser}
      />
      {/* Add user modal */}
      <Modal
        title={"Add user"}
        show={modal === "add"}
        onClose={() => {
          setModal();
          setUser({ ...initialUser });
          setErrors({ ...initialUser });
        }}
      >
        <form onSubmit={onAddUser}>
          <Dropdown
            selected={user.role}
            setSelected={(role) => {
              setErrors({ ...errors, role: "" });
              setUser({ ...user, role: role.name });
            }}
            options={roles}
            error={errors.role}
          />
          {user.role === "Student" && (
            <Dropdown
              selected={user.course.name}
              setSelected={(course) => {
                setErrors({ ...errors, course: "" });
                setUser({ ...user, course: course });
              }}
              options={courses}
              error={errors.course}
            />
          )}
          {inputs.map((input, i) => (
            <Input
              key={`users-input-${i}`}
              {...input}
              value={user[input.name]}
              onChange={(e) => {
                const error = validate(
                  input.label,
                  input.name,
                  e.target.value,
                  input.regex,
                  input.error
                );
                setErrors({ ...errors, [error.name]: error.msg });
                setUser({ ...user, [e.target.name]: e.target.value });
              }}
              error={errors[input.name]}
            />
          ))}

          <Button text="Add user"></Button>
        </form>
      </Modal>
      {/* Edit user modal */}
      <Modal
        title={"Edit user"}
        show={modal === "edit"}
        onClose={() => {
          setModal();
          setUser({ ...initialUser });
          setErrors({ ...initialUser });
        }}
      >
        <form onSubmit={onEditUser}>
          {inputs.map((input, i) => (
            <Input
              key={`users-input-${i}`}
              {...input}
              value={user[input.name]}
              onChange={(e) => {
                const error = validate(
                  input.label,
                  input.name,
                  e.target.value,
                  input.regex,
                  input.error
                );
                setErrors({ ...errors, [error.name]: error.msg });
                setUser({ ...user, [e.target.name]: e.target.value });
              }}
              error={errors[input.name]}
            />
          ))}
          <Button text="Edit user"></Button>
        </form>
      </Modal>
    </section>
  );
};

export default Users;
