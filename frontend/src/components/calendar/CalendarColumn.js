import EventItem from "./EventItem";

const CalendarColumn = ({ events }) => {
  return (
    <div className="calendar-column">
      {[...Array(30)].map((e, i) => (
        <div className="calendar-row" key={"row-" + i}></div>
      ))}
      <div className="event-list">
        {events && events.length !== 0 ? (
          events.map((event) => <EventItem key={event.startDate} {...event} />)
        ) : (
          <p style={{ textAlign: "center", margin: "0.75em 1em 0 0 " }}>
            No Events
          </p>
        )}
      </div>
    </div>
  );
};

export default CalendarColumn;
