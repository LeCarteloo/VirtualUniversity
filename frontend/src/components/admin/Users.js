import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { validate } from "../../utility/validate";
import { clear } from "../../utility/clear";
import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Modal from "../Modal";
import Input from "../Input";
import "../../styles/modal.scss";
import { errorToast, successToast } from "../../utility/toast";

const Users = () => {
  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
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

  const editInputs = [
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
  ];

  const roles = [
    { _id: "1", name: "Student" },
    { _id: "2", name: "Lecturer" },
    { _id: "3", name: "Admin" },
  ];

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

  const submitAddForm = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    // Validating all inputs and dropdowns
    inputs.forEach((input) => {
      const name = input.label.toLowerCase();
      const error = validate(name, user[name], input.regex, input.error);
      validateErrors[error.name] = error.msg;
    });

    if (user.role === "") {
      validateErrors["role"] = "Please choose one of the roles";
    }

    if (user.role === "Student" && user.course === "") {
      validateErrors["course"] = "Please choose one of the courses";
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
        "users/register",
        JSON.stringify({ ...user, course: user.course._id })
      );
      setUsers([...users, response.data]);
      setUser(clear(user));
      successToast("Successfully added user");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  const submitEditForm = async (e) => {
    e.preventDefault();
  };

  const editUserModal = (id) => {
    const foundUser = users.find((obj) => obj._id === id);
    // console.log(foundUser);
    setUser({ ...user, ...foundUser });
    setEditModal(!editModal);
  };

  const removeUser = async (id) => {
    try {
      const response = await axiosPrivate.delete(`/users/${id.toString()}`);
      successToast("Successfully removed user");
      setUsers(users.filter((user) => user._id !== response.data._id));
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
        onAdd={() => setAddModal(true)}
        onEdit={editUserModal}
        onRemove={removeUser}
      />
      {/* Add user modal */}
      <Modal
        title={"Add user"}
        show={addModal}
        onClose={() => {
          setAddModal(!addModal);
          setUser(clear(user));
          setErrors(clear(errors));
        }}
      >
        <form onSubmit={submitAddForm}>
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
          {user.role === "Student" && (
            <Dropdown
              state={user.course.name}
              setState={(course) => {
                setErrors({ ...errors, course: "" });
                setUser({ ...user, course: course });
              }}
              options={courses}
              error={errors.course}
            />
          )}
          <Button text="Add user"></Button>
        </form>
      </Modal>
      {/* Edit user modal */}
      <Modal
        title={"Edit user"}
        show={editModal}
        onClose={() => {
          setEditModal(!editModal);
          setUser(clear(user));
          setErrors(clear(errors));
        }}
      >
        <form onSubmit={submitEditForm}>
          {editInputs.map((input, i) => (
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
          <Button text="Edit user"></Button>
        </form>
      </Modal>
    </section>
  );
};

export default Users;
