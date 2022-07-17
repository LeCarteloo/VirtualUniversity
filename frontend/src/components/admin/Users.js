import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";
import { fa3 } from "@fortawesome/free-solid-svg-icons";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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
    { label: "Name", error: "Name should contain only letters" },
    { label: "Surname", error: "Surname should contain only letters" },
    { label: "Email", error: "Email should be a valid email adress" },
    {
      label: "Password",
      type: "password",
      error:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character",
    },
    { label: "Album", error: "It will be auto-generated later" },
    { label: "Role", error: "Pick a role" },
    { label: "Course", error: "Pick a course" },
  ];

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
    getUsers();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
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
              label={input.label}
              error={input.error}
              leadIcon={fa3}
              pattern={"elo"}
              name={input.label.toLowerCase()}
              value={user[input.label.toLowerCase()]}
              onChange={onChange}
            />
          ))}
          <Button text="Add user"></Button>
        </form>
      </Modal>
    </section>
  );
};

export default Users;
