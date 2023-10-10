const CalendarDay = ({ dayNumber, name, isToday }) => {
  return (
    <div className={`calendar-day ${isToday && "today"}`}>
      <h3 className="day-number">{("0" + dayNumber).slice(-2)}</h3>
      <span className="day-name">{name}</span>
    </div>
  );
};

export default CalendarDay;
