import EventItem from "./EventItem";

const CalendarColumn = ({ events, columnDay, onHourClick }) => {
  return (
    <div className="calendar-column">
      {[...Array(30)].map((e, i) => (
        <div
          className={`calendar-row ${onHourClick ? "clickable" : ""}`}
          key={"row-" + i}
          onClick={() => onHourClick(columnDay, i)}
        ></div>
      ))}
      <div className="event-list">
        {events && events.length !== 0 ? (
          events.map((event) => <EventItem key={event.startDate} {...event} />)
        ) : (
          <p className="no-events">No Events</p>
        )}
      </div>
    </div>
  );
};

export default CalendarColumn;
