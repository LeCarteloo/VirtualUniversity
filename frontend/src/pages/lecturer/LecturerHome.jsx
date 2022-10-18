import { faPlaneLock } from "@fortawesome/free-solid-svg-icons";
import NavBar from "../components/nav/NavBar";
import StudentTable from "../components/tables/StudentTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useState } from "react";
import { useEffect } from "react";

const LecturerHome = () => {
  const [students, setStudents] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  // Navbar navigation items
  const navItems = [
    {
      name: "test",
      icon: faPlaneLock,
      path: "test",
    },
  ];

  useEffect(() => {
    const getStudents = async () => {
      try {
        const response = await axiosPrivate.get("/users");
        setStudents(response.data);
      } catch (err) {
        errorToast(err?.response?.data?.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };

    getStudents();
  }, []);

  return (
    <section className="home-section">
      <NavBar navItems={navItems} />
      <section className="content-section">
        <StudentTable
          students={students}
          subjectId={"631ca15f876ca2d75293c62c"}
          courseId={"62ebdbe09addf7645adfbca0"}
        />
      </section>
    </section>
  );
};

export default LecturerHome;
