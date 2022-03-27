import "../styles/grades.scss";
import Subject from "./Subject";

const Grades = () => {
  return (
    <section className="grades-section">
      <Subject title="Artificial Intelligence" type="Lecture" />
      <Subject title="Artificial Intelligence" type="Laboratory" />
      <Subject title="Artificial Intelligence" type="Exercises" />
    </section>
  );
};

export default Grades;
