import "../../styles/graduationWork.scss";
import GroupTable from "../GroupTable";

const GraduationWork = () => {
  const data = {
    headers: ["Title", "Status", "Obtained degree"],
    rows: [["-", "-", "-"]],
  };

  const thesis = {
    headers: [
      "Date of final examination",
      "Hour thesis defence",
      "Hall of thesis defence",
      "Diploma no.",
    ],
    rows: [["-", "-", "-", "-"]],
  };

  const board = {
    headers: [
      "Supervisor",
      "Reviewer",
      "Second supervisor",
      "Commision Member",
    ],
    rows: [["-", "-", "-", "-"]],
  };

  const grade = {
    headers: [
      "Grade from supervisor",
      "Grade from reviewer",
      "Thesis grade",
      "Diploma exam grade",
      "Final avarage grade",
      "Final university grade",
    ],
    rows: [["-", "-", "-", "-", "-", "-"]],
  };

  return (
    <section className="graduation-section">
      <div className="graduation-grid">
        <GroupTable
          title={"Data on the diploma"}
          object={data}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
        />
        <GroupTable
          title={"Board of Examiners"}
          object={board}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
        />
        <GroupTable
          title={"Thesis defence"}
          object={thesis}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
        />
        <GroupTable
          title={"Grades"}
          object={grade}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
        />
      </div>
    </section>
  );
};

export default GraduationWork;
