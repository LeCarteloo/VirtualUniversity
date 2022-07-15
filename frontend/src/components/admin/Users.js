import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "../Modal";
import Input from "../Input";
import Button from "../Button";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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

  const headers = ["Name", "Surname", "Email", "Album"];

  const dispAddModal = (show, close) => {
    const [name, setName] = useState("");

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axiosPrivate.post(
          "/users/register",
          JSON.stringify({
            name: "name",
            surname: "surname",
            email: "email",
            password: "password",
            album: "13133",
            role: "role",
            course: "62d06933202063c9ede88a74",
          })
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <Modal
        title={"Add user"}
        show={show}
        onClose={close}
        // footer={<Button text={"Add user"}></Button>}
      >
        <form onSubmit={onSubmit}>
          <Input label={"Name"} />
          <Input label={"Surname"} />
          <Input label={"Email"} />
          <Input label={"Password"} />
          <Input label={"Album"} />
          <Input label={"Role"} />
          <Input label={"Course"} />
          <Button text={"Add user"}></Button>
        </form>
      </Modal>
    );
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
        dispAddModal={dispAddModal}
      />
    </section>
  );
};

export default Users;
