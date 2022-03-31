import "../styles/calendar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import DayColumn from "./DayColumn";

const Calendar = () => {
  //   const month = date.toLocaleString("default", { month: "long" });
  //   const month = date.toLocaleString("en-us", { month: "long" });
  //   date.setDate(date.getDate() + 3);
  //   console.log(date);

  const getDays = () => {
    // 2022, 2 for tests
    const date = new Date(2022, 2);
    const currMonth = date.getMonth();
    let days = [];
    while (date.getMonth() === currMonth) {
      days.push(date.getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const days = getDays();

  return (
    <section className="calendar-section">
      <div className="calendar">
        <FontAwesomeIcon
          icon={faAngleLeft}
          size="xl"
          className="calendar-arrow"
        />
        <div className="calendar-days">
          {days.map((day) => (
            <div className={`day ${day === 10 && "today"}`}>{day}</div>
          ))}
        </div>
        <FontAwesomeIcon
          icon={faAngleRight}
          size="xl"
          className="calendar-arrow"
        />
      </div>
      <div className="calendar-table">
        <div className="calendar-hours">
          {[...Array(15)].map((e, i) => (
            <div className="hour">{i + 8}:00</div>
          ))}
        </div>
        <div className="calendar-day">
          <h2 className="day-number">05</h2>
          <span className="day-name">Monday</span>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
