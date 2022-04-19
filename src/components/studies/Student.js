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
      <span>
        Email <FontAwesomeIcon icon={faPenToSquare} />
      </span>,
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
      <div className="left-column">
        <GroupTable
          title={"Student data"}
          object={data}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
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
