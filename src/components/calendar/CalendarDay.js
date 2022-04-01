const CalendarDay = ({ number, name }) => {
  return (
    <div className="calendar-day">
      <h3 className="day-number">{number}</h3>
      <span className="day-name">{name}</span>
    </div>
  );
};

export default CalendarDay;
