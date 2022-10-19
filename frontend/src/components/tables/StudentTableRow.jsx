import EditGradeInput from "components/inputs/EditGradeInput";
import PropTypes from "prop-types";
import { useState } from "react";

const StudentTableRow = ({ student, subject }) => {
  const [grades, setGrades] = useState({
    firstTerm: subject?.firstTerm?.$numberDecimal ?? "",
    secondTerm: subject?.secondTerm?.$numberDecimal ?? "",
    conditional: subject?.conditional?.$numberDecimal ?? "",
    promotion: subject?.promotion?.$numberDecimal ?? "",
    comittee: subject?.commite?.$numberDecimal ?? "",
  });

  console.log(grades);

  return (
    <tr>
      <td>{`${student.name} ${student.surname}, ${student.album}`}</td>
      {Object.keys(grades).map((gradeKey) => (
        <td key={`input-${gradeKey}`}>
          <EditGradeInput
            value={grades[gradeKey]}
            setValue={(e) =>
              setGrades({ ...grades, [gradeKey]: e.target.value })
            }
            isChanged={
              subject?.[gradeKey]?.$numberDecimal !== grades[gradeKey] &&
              grades[gradeKey] !== ""
            }
          />
        </td>
      ))}
    </tr>
  );
};

StudentTableRow.propTypes = {
  student: PropTypes.object,
  subject: PropTypes.object,
};

export default StudentTableRow;
