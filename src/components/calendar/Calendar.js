import "../../styles/calendar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import CalendarDay from "./CalendarDay";
import EventItem from "./EventItem";

const Calendar = () => {
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

  const events = [{}];

  return (
    <section className="calendar-section">
      <div className="calendar">
        <div className="calendar-header">
          <div className="calendar-corner"></div>
          <div className="calendar-days">
            <CalendarDay number={"01"} name={"Monday"} />
            <CalendarDay number={"02"} name={"Tuesday"} />
            <CalendarDay number={"03"} name={"Wednesday"} />
            <CalendarDay number={"04"} name={"Thursday"} />
            <CalendarDay number={"05"} name={"Friday"} />
          </div>
        </div>
        <div className="calendar-content">
          <div className="calendar-hours">
            {[...Array(15)].map((e, i) => (
              <div className="hour" key={i}>
                {i + 8}:00
              </div>
            ))}
          </div>
          <div className="calendar-column">
            {[...Array(30)].map((e, i) => (
              <div className="calendar-row" key={"row-" + i}></div>
            ))}
            <EventItem height="100px" top="102px" bg="white" />
            <EventItem height="100px" top="202px" bg="white" />
          </div>
          <div className="calendar-column"></div>
          <div className="calendar-column"></div>
          <div className="calendar-column"></div>
          <div className="calendar-column"></div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
