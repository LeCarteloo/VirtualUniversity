import EventItem from "./EventItem";

const CalendarColumn = () => {
  return (
    <div className="calendar-column">
      {[...Array(30)].map((e, i) => (
        <div className="calendar-row" key={"row-" + i}></div>
      ))}
      <div className="event-list">
        <EventItem
          title={"Artificial Intelligence"}
          author={"John Doe"}
          startTime={9}
          length={2}
        />
        <EventItem
          title={"Cloud Computing"}
          author={"John Smith"}
          startTime={11.5}
          length={1}
        />
      </div>
    </div>
  );
};

export default CalendarColumn;
