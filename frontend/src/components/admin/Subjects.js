import AdminTable from "./AdminTable";
import axios from "axios";
import { useEffect, useState } from "react";

const Subjects = () => {
  const [subjects, setSubjects] = useState(null);

  const url = "http://localhost:5000/api/subjects";
  axios.get(url);
  useEffect(() => {
    const getSubjects = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyN2Q1MGRiNzIzODU4NWFmYTBjMWZiMiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY1NjU5NDA4MSwiZXhwIjoxNjU2ODUzMjgxfQ.36fDWD4hdH12wLZqCT8fKph9-IPNkvR9hZcLFGPdMWw";
        axios.defaults.headers.common = { Authorization: `bearer ${token}` };
        const url = "http://localhost:5000/api/subjects";
        const response = axios.get(url);
        if (response && response.data) {
          setSubjects(response.data);
        }
      } catch (error) {
        if (error.response) {
          // If not in the 200 response range
          //   console.log(error.response.data, error.response.status);
        } else {
          // Zero response from the server
          //   console.log(error.message);
        }
      }
    };
  }, []);

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable title={"Subjects"} />
    </section>
  );
};

export default Subjects;
