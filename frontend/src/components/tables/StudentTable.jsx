import PropTypes from "prop-types";
import StudentTableRow from "./StudentTableRow";

const StudentTable = ({ students, subjectId, courseId }) => {
  return (
    <div className="students-table-wrapper">
      <div className="students-table-slider">
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
                const course = student?.courses.find(
                  (course) => course._id === courseId
                );
                const subject = course?.subjects.find(
                  (subject) => subject.subjectId === subjectId
                );

                return (
                  <StudentTableRow
                    key={student._id}
                    student={student}
                    subject={subject}
                  />
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

StudentTable.propTypes = {
  students: PropTypes.array,
  subjectId: PropTypes.string,
  courseId: PropTypes.string,
};

export default StudentTable;
