import PropTypes from "prop-types";
import EditGradeInput from "../inputs/EditGradeInput";

const StudentTable = ({ students, subjectId, courseId }) => {
  return (
    <div className="students-table-wrapper">
      <table className="students-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>First term</th>
            <th>Second term</th>
            <th>Conditional</th>
            <th>Promotion</th>
            <th>Comitte</th>
          </tr>
        </thead>
        <tbody>
          {students &&
            students.map((student) => {
              // console.log(student);

              const course = student?.courses.find(
                (course) => course._id === courseId
              );
              // console.log(course);
              const subject = course?.subjects.find(
                (subject) => subject.subjectId === subjectId
              );

              console.log(course);
              return (
                <tr>
                  <td>{`${student.name} ${student.surname}, ${student.album}`}</td>
                  <td>
                    <EditGradeInput />
                  </td>
                  <td>{subject?.secondTerm}</td>
                  <td>{subject?.conditional}</td>
                  <td>{subject?.promotion}</td>
                  <td>{subject?.comittee}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

StudentTable.propTypes = {
  students: PropTypes.array,
};

export default StudentTable;
