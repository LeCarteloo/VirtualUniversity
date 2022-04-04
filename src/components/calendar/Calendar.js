import "../../styles/calendar.scss";
import { useState } from "react";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import CalendarDay from "./CalendarDay";
import CalendarColumn from "./CalendarColumn";

const Calendar = () => {
  const [changeWeek, setChangeWeek] = useState(new Date());

  // For tests
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 1);
  endDate.setMinutes(endDate.getMinutes() + 30);

  // Current week
  const currentDate = changeWeek;
  let firstDate = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
  );

  // First day of weekend starting at Monday
  let currentWeek = [];
  for (let i = 0; i < 5; i++) {
    currentWeek.push({
      number: firstDate.getDate(),
      name: firstDate.toLocaleDateString("en-US", { weekday: "long" }),
      isToday: firstDate.toDateString() === new Date().toDateString(),
    });
    firstDate.setDate(firstDate.getDate() + 1);
  }

  // Object will contain future API call
  const events = [
    {
      title: "Artificial Intelligence",
      author: "John Doe",
      startDate: startDate,
      endDate: endDate,
      isOnline: true,
    },
  ];

  return (
    <section className="calendar-section">
      <div className="calendar">
        <button
          onClick={() =>
            setChangeWeek(
              new Date(changeWeek.setDate(changeWeek.getDate() - 7))
            )
          }
        >
          Prev
        </button>
        <button
          onClick={() =>
            setChangeWeek(
              new Date(changeWeek.setDate(changeWeek.getDate() + 7))
            )
          }
        >
          Next
        </button>
        <div className="calendar-header">
          <div className="calendar-corner"></div>
          <div className="calendar-days">
            {currentWeek.map((weekDay) => (
              <CalendarDay key={weekDay.name} {...weekDay} />
            ))}
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
          <CalendarColumn events={events} />
          <CalendarColumn />
          <CalendarColumn />
          <CalendarColumn />
          <CalendarColumn />
        </div>
      </div>
    </section>
  );
};

export default Calendar;
