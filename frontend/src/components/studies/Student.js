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
import { errorToast, successToast } from "../../utility/toast";
import { validate } from "../../utility/validate";
import { clear } from "../../utility/clear";

const Student = () => {
  const [showModal, setShowModal] = useState(false);
  const [t] = useTranslation("translation");
  const [student, setStudent] = useState();
  const [course, setCourse] = useState();
  const [contact, setContact] = useState({ email: "", telephone: "" });
  const [errors, setErrors] = useState({ email: "", telephone: "" });

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getMyData = async () => {
      try {
        const response = await axiosPrivate.get("/users/data/me");
        setStudent(response.data);
        setContact({
          email: response.data.secEmail ? response.data.secEmail : "",
          telephone: response.data.telephone ? response.data.telephone : "",
        });
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

  const studentData = {
    headers: [
      t("student.albumNumber"),
      t("student.placeOfBirth"),
      t("student.id"),
      t("student.telephone"),
      "Email",
      "Secondary email",
    ],
    data: [
      student?.album,
      student?.placeOfBirth,
      student?.idDoc,
      student?.telephone,
      student?.email,
      student?.secEmail,
    ],
  };

  const courseData = {
    headers: ["Name", "Year", "Semester", "Department", "Degree", "Type"],
    data: [
      course?.name,
      course?.year,
      course?.semester,
      course?.department,
      course?.degree,
      course?.type,
    ],
  };

  const gradeData = {
    headers: [
      "For previous semester",
      "For semester",
      "For year",
      "For studies",
    ],
    data: ["-", "-", "-", "-"],
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      type: "email",
      autoComplete: "new-password",
      regex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      error: "Email should be a valid email adress",
    },
    {
      label: "Telephone number",
      name: "telephone",
      type: "tel",
      regex: /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/,
      error: "Telephone number should be in valid format",
    },
  ];

  const onEditInfo = async (e) => {
    e.preventDefault();

    let validateErrors = {};

    // Validating all inputs and dropdowns
    inputs.forEach((input) => {
      const error = validate(
        input.name,
        contact[input.name],
        input.regex,
        input.error
      );
      validateErrors[error.name] = error.msg;
    });

    setErrors({ ...errors, ...validateErrors });

    // Check if there is any error
    for (const error of Object.values(validateErrors)) {
      if (error !== "") {
        console.log("SIEMA");
        return;
      }
    }

    try {
      const response = await axiosPrivate.put(
        "/users/contact",
        JSON.stringify({
          secEmail: contact.email,
          telephone: contact.telephone,
        })
      );
      setStudent({ ...student, ...response.data });
      setErrors(clear(errors));
      successToast("Successfully updated contact information");
    } catch (error) {
      errorToast(error?.response?.message?.data);
    }

    console.log(contact);
  };

  return (
    <section className="student-section">
      <Modal
        title={"Update contact"}
        show={showModal}
        onClose={() => setShowModal(!showModal)}
      >
        <form onSubmit={onEditInfo}>
          {inputs.map((input, i) => (
            <Input
              key={`contact-input-${i}`}
              {...input}
              label={input.label}
              name={input.name}
              value={contact[input.name]}
              onChange={(e) => {
                const error = validate(
                  e.target.name,
                  e.target.value,
                  input.regex,
                  input.error
                );
                setErrors({ ...errors, [e.target.name]: error.msg });
                setContact({ ...contact, [e.target.name]: e.target.value });
              }}
              error={errors[input.name]}
            />
          ))}
          <Button text={"Update contact"} />
        </form>
      </Modal>
      <div className="left-column">
        <GroupTable
          title={t("student.studentData")}
          tableData={student && studentData.data}
          tableHeaders={studentData.headers}
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
          tableData={gradeData.data}
          tableHeaders={gradeData.headers}
          isCollapsed={false}
          tabOrient={"vertical-rl"}
        />
      </div>
      <div className="right-column">
        <GroupTable
          title={"Course data"}
          tableData={course && courseData.data}
          tableHeaders={courseData.headers}
          isCollapsed={false}
          tabOrient={"vertical-tb"}
        />
      </div>
    </section>
  );
};

export default Student;
