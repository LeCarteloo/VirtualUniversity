import ChoiceItem from "./ChoiceItem";

const Choices = () => {
  const choices = {
    options: [
      {
        id: 1,
        name: "Subject1",
      },
      {
        id: 2,
        name: "Subject2",
      },
      {
        id: 3,
        name: "Subject3",
      },
    ],
  };

  const choices1 = {
    options: [
      {
        id: 1,
        name: "Spec1",
      },
      {
        id: 2,
        name: "Spec2",
      },
      {
        id: 3,
        name: "Spec3",
      },
    ],
  };

  const choices2 = {
    options: [
      {
        id: 1,
        name: "Spec1",
      },
      {
        id: 2,
        name: "Spec2",
      },
      {
        id: 3,
        name: "Spec3",
      },
    ],
  };

  return (
    <section
      className="choices-section"
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <ChoiceItem title={"Subject choice"} choices={choices} />
      <ChoiceItem title={"Speciality choice"} choices={choices1} />
      <ChoiceItem title={"Thesis supervisor"} choices={choices2} />
    </section>
  );
};

export default Choices;
