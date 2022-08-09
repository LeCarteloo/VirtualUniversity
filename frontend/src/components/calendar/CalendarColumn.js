import EventItem from "./EventItem";

const CalendarColumn = ({ events, day }) => {
  console.log(day);
  console.log(events);

  return (
    <div className="calendar-column">
      {[...Array(30)].map((e, i) => (
        <div className="calendar-row" key={"row-" + i}></div>
      ))}
      <div className="event-list">
        {events ? (
          events.map((event) => {
            return (
              new Date(event.startDate).getDate() === day && (
                <EventItem key={event.startDate} {...event} />
              )
            );
          })
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
