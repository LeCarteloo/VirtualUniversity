import "../../styles/student.scss";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

// Hooks
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Components
import Modal from "../Modal";
import Button from "../Button";
import TextInput from "../TextInput";
import GroupTable from "../GroupTable";

const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [t] = useTranslation("translation");

  const data = {
    headers: [
      t("student.albumNumber"),
      t("student.placeOfBirth"),
      t("student.id"),
      t("student.telephone"),
      "Email",
    ],
    rows: [["-", "-", "-", "-", "test@gmail.com"]],
  };

  const data1 = {
    headers: [
      "Start date",
      "Status",
      "Rok studiów",
      "Semestr",
      "Kierunek Studiów",
      "Kolegium",
      "Rodzaj studiów",
      "Typ studiów",
      "Profil kształcenia",
      "Status kierunku",
    ],
    rows: [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]],
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
          {/* onClick={(e) => e.preventDefault()} */}
          <TextInput label={"Email"} />
          <TextInput label={"Telephone number"} />
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
