import { useState, useEffect } from "react";
import AdminTable from "./AdminTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useRefreshToken from "../../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const refresh = useRefreshToken();

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
      <button onClick={() => refresh()}>REFRESH</button>
      <AdminTable title={"Users"} users={users} />
    </section>
  );
};

export default Users;
