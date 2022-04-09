import "../../styles/calendar.scss";
import { useState, useEffect } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import CalendarDay from "./CalendarDay";
import CalendarColumn from "./CalendarColumn";

const Calendar = () => {
  const [width, setWidth] = useState(window.innerWidth);

  let currentDate = new Date();
  const [changeWeek, setChangeWeek] = useState(
    new Date(
      currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
    )
  );

  // This whoel
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      if (width > 790) {
        setChangeWeek(
          new Date(
            changeWeek.setDate(changeWeek.getDate() - changeWeek.getDay() + 1)
          )
        );
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, changeWeek]);

  const columns = width > 790 ? 5 : 1;
  const week = width > 790 ? 7 : 1;

  // For tests
  const startDate = new Date();
  const endDate = new Date();
  endDate.setHours(endDate.getHours() + 1);
  endDate.setMinutes(endDate.getMinutes() + 30);

  // First day of weekend starting at Monday
  let currentWeek = [];
  let tempWeek = new Date(changeWeek);
  for (let i = 0; i < columns; i++) {
    currentWeek.push({
      number: tempWeek.getDate(),
      name: tempWeek.toLocaleDateString("en-US", { weekday: "long" }),
      month: tempWeek.toLocaleDateString("en-US", { month: "long" }),
      isToday: tempWeek.toDateString() === new Date().toDateString(),
    });
    tempWeek.setDate(tempWeek.getDate() + 1);
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
          onClick={() => {
            const prevWeek = changeWeek.getDay() <= 1 ? 7 : week;
            setChangeWeek(
              new Date(changeWeek.setDate(changeWeek.getDate() - prevWeek))
            );
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            const nextWeek = changeWeek.getDay() >= 5 ? 3 : week;
            console.log(changeWeek);
            setChangeWeek(
              new Date(changeWeek.setDate(changeWeek.getDate() + nextWeek))
            );
          }}
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
          {[...Array(columns)].map((e, i) => (
            <CalendarColumn key={i} events={events} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
