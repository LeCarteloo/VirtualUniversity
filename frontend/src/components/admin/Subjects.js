import AdminTable from "./AdminTable";
import axios from "axios";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";

const Subjects = () => {
  const [subjects, setSubjects] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getSubjects = async () => {
      try {
        const response = await axiosPrivate.get("/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
        // navigate("/", { state: { from: location }, replace: true });
      }
    };
    getSubjects();
  }, []);

  const headers = ["Name", "Type", "Credit"];

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable title={"Subjects"} data={subjects} headers={headers} />
    </section>
  );
};

export default Subjects;
