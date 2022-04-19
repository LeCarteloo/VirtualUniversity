import Subject from "./Subject";

const Grades = () => {
  return (
    <section
      className="grades-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Subject title="Artificial Intelligence" type="Lecture" />
      <Subject title="Artificial Intelligence" type="Laboratory" />
      <Subject title="Artificial Intelligence" type="Exercises" />
    </section>
  );
};

export default Grades;
