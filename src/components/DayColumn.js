import "../styles/calendar.scss";

const DayColumn = ({ month, day }) => {
  return (
    <div className="day-column">
      <div className="day-info">
        <h2 className="day-number">05</h2>
        <span className="day-name">Monday</span>
      </div>
    </div>
  );
};

export default DayColumn;
