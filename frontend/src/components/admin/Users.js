import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import Dropdown from "../Dropdown";

const Users = () => {
  const [users, setUsers] = useState();
  const [courses, setCourses] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  // const [selected, setSelected] = useState("Choose value");
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    album: "",
    role: "",
    course: "",
  });

  const headers = ["Name", "Surname", "Email", "Album"];

  const inputs = [
    {
      label: "Name",
      error: "Name should contain only letters",
      pattern: "[a-zA-Z]+",
    },
    {
      label: "Surname",
      error: "Surname should contain only letters",
      pattern: "[a-zA-Z]+",
    },
    {
      label: "Email",
      type: "email",
      error: "Email should be a valid email adress",
      // pattern: "/\\S+@\\S+\\.\\S+/", // Not working
    },
    {
      label: "Password",
      type: "password",
      error:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
      pattern:
        "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
    },
    { label: "Album", error: "It will be auto-generated later" },
  ];

  const roles = ["Student", "Teacher", "Admin"];

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        // console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/courses");
        let nameArray = [];
        response.data.forEach((element) => {
          nameArray.push(element.name);
        });
        setCourses(nameArray);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
    getCourses();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post("/register", {});
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable title={"Users"} data={users} headers={headers} />
      <Modal title={"Add user"} show={true}>
        <form onSubmit={onSubmit}>
          {inputs.map((input, i) => (
            <Input
              key={`users-input-${i}`}
              {...input}
              name={input.label.toLowerCase()}
              value={user[input.label.toLowerCase()]}
              onChange={onChange}
            />
          ))}
          <Dropdown
            state={user.role}
            setState={(role) => setUser({ ...user, role: role })}
            options={roles}
          />
          <Dropdown
            state={user.course}
            setState={(course) => setUser({ ...user, course: course })}
            options={courses}
          />
          <Button text="Add user"></Button>
        </form>
      </Modal>
    </section>
  );
};

export default Users;
