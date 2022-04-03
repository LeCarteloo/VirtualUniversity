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
          startTime={8}
          length={2}
          isCanceled={true}
        />
        <EventItem
          title={"Cloud Computing"}
          author={"John Smith"}
          startTime={10.5}
          length={2}
          isOnline={true}
        />
        <EventItem
          title={"Cloud Computing"}
          author={"John Smith"}
          startTime={13}
          length={0.5}
        />
      </div>
    </div>
  );
};

export default CalendarColumn;
