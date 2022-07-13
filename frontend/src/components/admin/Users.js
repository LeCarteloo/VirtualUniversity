import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

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
    getUsers();
  }, []);

  const headers = ["Name", "Surname", "Email", "Album"];

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable title={"Users"} data={users} headers={headers} />
    </section>
  );
};

export default Users;
