import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useState } from "react";
import AdminTable from "./AdminTable";
import Modal from "../Modal";
import Input from "../Input";
import { validate } from "../../utility/validate";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [addModal, setAddModal] = useState(false);
  const [subject, setSubject] = useState({
    name: "",
    type: "",
    hours: "",
    ects: "",
    lecturer: "",
    credit: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    hours: "",
    ects: "",
    lecturer: "",
    credit: "",
  });

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

  const headers = ["Name", "Type", "Credit", "ECTS"];

  const inputs = [
    {
      label: "Name",
      regex: /^[a-zA-Z]+$/,
      error: "Name should contain only letters",
    },
  ];

  return (
    <section
      className="users-section"
      style={{ width: "100%", height: "100%" }}
    >
      <AdminTable
        title={"Subjects"}
        data={subjects}
        headers={headers}
        onAdd={() => setAddModal(!addModal)}
      />
      <Modal
        show={addModal}
        title={"Add subject"}
        onClose={() => setAddModal(!addModal)}
      >
        {inputs.map((input, i) => (
          <Input
            key={`subjects-input-${i}`}
            {...input}
            name={input.label.toLowerCase()}
            value={subject[input.label.toLowerCase()]}
            onChange={(e) => {
              const error = validate(
                e.target.name,
                e.target.value,
                input.regex,
                input.error
              );
              setErrors({ ...errors, [error.name]: error.msg });
              setSubject({ ...subject, [e.target.name]: e.target.value });
            }}
            error={errors[input.label.toLowerCase()]}
          />
        ))}
      </Modal>
    </section>
  );
};

export default Subjects;
