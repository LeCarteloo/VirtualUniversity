import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <p>{users.toString()}</p>
      <AdminTable title={"Users"} />
    </section>
  );
};

export default Users;
