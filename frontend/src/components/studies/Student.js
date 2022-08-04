import "../../styles/student.scss";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import Modal from "../Modal";
import Button from "../Button";
import Input from "../Input";
import GroupTable from "../GroupTable";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation, useNavigate } from "react-router-dom";
import { errorToast } from "../../utility/toast";

const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [t] = useTranslation("translation");
  const [user, setUser] = useState();
  const [course, setCourse] = useState();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMyData = async () => {
      try {
        const response = await axiosPrivate.get("/users/data/me");
        setUser(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    const getMyCourse = async () => {
      try {
        const response = await axiosPrivate.get("/users/course/me");
        setCourse(response.data);
      } catch (error) {
        errorToast(error?.response?.data?.message);
        navigate("/", { state: { from: location }, replace: true });
      }
    };
    getMyData();
    getMyCourse();
  }, []);

  const data = {
    headers: [
      t("student.albumNumber"),
      t("student.placeOfBirth"),
      t("student.id"),
      t("student.telephone"),
      "Email",
    ],
    rows: [
      [
        user?.album,
        user?.placeOfBirth,
        user?.idDoc,
        user?.telephone,
        user?.email,
      ],
    ],
  };

  const data1 = {
    headers: ["Name", "Year", "Semester", "Department", "Degree", "Type"],
    rows: [
      [
        course?.name,
        course?.year,
        course?.semester,
        course?.department,
        course?.degree,
        course?.type,
      ],
    ],
  };

  const data11 = {
    headers: ["Za semestr", "Za rok", "Za studia", "Za poprzedni semestr"],
    rows: [["-", "-", "-", "-"]],
  };

  return (
    <section className="student-section">
      <Modal
        title={"Change your data"}
        show={showModal}
        onClose={() => setShowModal(!showModal)}
      >
        <form>
          <Input label={"Email"} />
          <Input label={"Telephone number"} />
          <Button text={"Change data"} />
        </form>
      </Modal>
      <div className="left-column">
        <GroupTable
          title={t("student.studentData")}
          object={data}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
          actionIcon={faPenToSquare}
          onAction={(e) => {
            e.stopPropagation();
            setShowModal(!showModal);
          }}
        />
        <GroupTable
          title={"Grades average data"}
          object={data11}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
        />
      </div>
      <div className="right-column">
        <GroupTable
          title={"Course data"}
          object={data1}
          isCollapsed={false}
          tabOrient={"vertical-tb"}
        />
      </div>
    </section>
  );
};

export default Student;
