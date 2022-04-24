import "../../styles/graduationWork.scss";
import GroupTable from "../GroupTable";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import TextInput from "../TextInput";
import Button from "../Button";
import Modal from "../Modal";

const GraduationWork = () => {
  const [showModal, setShowModal] = useState(false);

  const data = {
    headers: ["Status", "Obtained degree"],
    rows: [["-", "-"]],
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

  const add = {
    headers: ["Title", "Language", "Synopsis", "Keywords"],
    rows: [["-", "-", "-", "-"]],
  };

  return (
    <section className="graduation-section">
      <Modal
        title={"Add diploma information"}
        show={showModal}
        onClose={() => setShowModal(!showModal)}
      >
        <form>
          <TextInput label={"Title"} />
          <TextInput label={"Language"} />
          <TextInput label={"Synopsis"} />
          <TextInput label={"Keywords"} />
          <Button text={"Add information"} />
        </form>
      </Modal>
      <GroupTable
        title={"Diploma information"}
        object={add}
        actionIcon={faEdit}
        onAction={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
        isCollapsed={false}
        tabOrient={"vertical-tb"}
      />
      <div className="graduation-grid">
        <GroupTable
          title={"Status of the diploma"}
          object={data}
          isCollapsed={false}
          tabOrient={"vertical-tb"}
        />
        <GroupTable
          title={"Board of Examiners"}
          object={board}
          isCollapsed={false}
          tabOrient={"vertical-tb"}
        />
        <GroupTable
          title={"Thesis defence"}
          object={thesis}
          isCollapsed={false}
          tabOrient={"vertical-tb"}
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
