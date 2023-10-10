import ChoiceItem from "./ChoiceItem";

const Choices = () => {
  const choices = {
    options: [
      {
        id: 1,
        name: "Subject1",
        person: "prof. John Doe",
      },
      {
        id: 2,
        name: "Subject2",
        person: "prof. John Doe",
      },
      {
        id: 3,
        name: "Subject3",
        person: "prof. John Doe",
      },
    ],
  };

  const choices1 = {
    options: [
      {
        id: 1,
        name: "Spec1",
        person: "prof. John Doe",
      },
      {
        id: 2,
        name: "Spec2",
        person: "prof. John Doe",
      },
      {
        id: 3,
        name: "Spec3",
        person: "prof. John Doe",
      },
    ],
  };

  const choices2 = {
    options: [
      {
        id: 1,
        name: "Spec1",
        person: "prof. John Doe",
      },
      {
        id: 2,
        name: "Spec2",
        person: "prof. John Doe",
      },
      {
        id: 3,
        name: "Spec3",
        person: "prof. John Doe",
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
      <ChoiceItem title={"Thesis supervisor choice"} choices={choices2} />
    </section>
  );
};

export default Choices;
