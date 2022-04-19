import GroupTable from "../GroupTable";
import "../../styles/student.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const Student = () => {
  const data = {
    headers: [
      "Album number",
      "Place of birth",
      "Identity card",
      "Telephone number",
      "Email",
    ],
    rows: [
      [
        "-",
        "-",
        "-",
        "-",
        <p>
          test@gmail.com <FontAwesomeIcon icon={faPenToSquare} />
        </p>,
      ],
    ],
  };

  const data1 = {
    headers: [
      "Start date",
      "Status",
      "Rok studiów",
      "Semestr",
      "Kierunek Studiów",
      "Średnia za semestr",
      "Średnia za rok",
      "Średnia za studia",
      "Kolegium",
      "Rodzaj studiów",
      "Typ studiów",
      "Profil kształcenia",
      "Status kierunku",
    ],
    rows: [["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]],
  };

  return (
    <section className="student-section">
      <div className="left-column">
        <GroupTable
          title={"Student Data"}
          object={data}
          isCollapsed={false}
          tabOrient={"vertical"}
        />
        <GroupTable title={"Student Data"} object={data} isCollapsed={false} />
      </div>
      <div className="right-column">
        <GroupTable
          title={"Course data"}
          object={data1}
          isCollapsed={false}
          tabOrient={"vertical"}
        />
      </div>
    </section>
  );
};

export default Student;
