import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const DataPicker = () => {
  const [symbols, setSymbols] = useState();
  const [months, setMonths] = useState();
  const [currDate, setCurrDate] = useState(new Date()); // 2022, 9, 0
  // const [days, setDays] = useState();

  useEffect(() => {
    const getWeekDays = (locale) => {
      const date = new Date();
      const firstDay = new Date(
        date.setDate(date.getDate() - date.getDay() + 1)
      );

      let weekDays = [];
      for (let i = 0; i < 7; i++) {
        weekDays.push(firstDay.toLocaleString(locale, { weekday: "narrow" }));
        firstDay.setDate(firstDay.getDate() + 1);
      }

      return weekDays;
    };

    const getMonthNames = (locale) => {
      const firstMonth = new Date(2022, 0, 1);

      let months = [];

      for (let i = 0; i < 12; i++) {
        months.push(firstMonth.toLocaleString(locale, { month: "long" }));
        firstMonth.setMonth(firstMonth.getMonth() + 1);
      }

      return months;
    };

    // const locale = "en-US";
    const locale = "pl-PL";
    setMonths(getMonthNames(locale));
    setSymbols(getWeekDays(locale));
  }, []);

  const getCalendarDays = () => {
    let days = [];

    const now = new Date();

    // Last day of previous month
    const prevMonthLast = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      0
    );
    // Last day of current month
    const currMonthLast = new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      0
    );
    // First day of current month
    const currMonthFirst = new Date(
      currDate.getFullYear(),
      currDate.getMonth(),
      1
    );
    // First day of next month
    const nextMonthFirst = new Date(
      currDate.getFullYear(),
      currDate.getMonth() + 1,
      1
    );

    // Getting all days from previous day until first day of current month
    for (let i = currMonthFirst.getDay() - 1; i > 0; i--) {
      const number = prevMonthLast.getDate() - (i - 1);
      days.push({
        number: number,
        style: "other",
        date: new Date(
          prevMonthLast.getFullYear(),
          prevMonthLast.getMonth(),
          number
        ),
      });
    }

    // Getting all days from current month
    for (let i = 1; i <= currMonthLast.getDate(); i++) {
      days.push({
        number: i,
        ...(now.getDate() === i &&
          now.getMonth() === currMonthLast.getMonth() &&
          now.getFullYear() === currMonthLast.getFullYear() && {
            style: "today",
          }),
        date: new Date(
          currMonthLast.getFullYear(),
          currMonthLast.getMonth(),
          i
        ),
      });
    }

    // Getting all days from next month (to fill up left spaces)
    for (let i = 0; i <= 7 - nextMonthFirst.getDay(); i++) {
      days.push({
        number: i + 1,
        style: "other",
        date: new Date(
          nextMonthFirst.getFullYear(),
          nextMonthFirst.getMonth(),
          i + 1
        ),
      });
    }

    return days;
  };

  let days = getCalendarDays();

  const onDayClick = (date) => {
    console.log(date);
  };

  const previousMonth = () => {
    setCurrDate(
      new Date(
        currDate.getFullYear(),
        currDate.getMonth() - 1,
        currDate.getDate()
      )
    );
  };

  const nextMonth = () => {
    setCurrDate(
      new Date(
        currDate.getFullYear(),
        currDate.getMonth() + 1,
        currDate.getDate()
      )
    );
  };

  return (
    <div className="data-picker">
      <button className="name">DATA PICKER</button>
      <div className="data-calendar">
        <div className="data-calendar-header">
          <button onClick={() => previousMonth()}>
            <FontAwesomeIcon icon={faAngleLeft} size="xl" />
          </button>
          <span>{`${
            months?.[currDate.getMonth()]
          }, ${currDate.getFullYear()} `}</span>
          <button onClick={() => nextMonth()}>
            <FontAwesomeIcon icon={faAngleRight} size="xl" />
          </button>
        </div>
        <div className="data-calendar-content">
          <table>
            <thead>
              <tr>
                {symbols &&
                  symbols.map((symbol, i) => (
                    <th key={`day-${i}`}>{symbol}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((tr, i) => (
                <tr key={`day-row-${i}`}>
                  {[...Array(7)].map((td, j) => {
                    const dayNumber = j + i * 7;
                    return (
                      <td
                        className={days[dayNumber]?.style}
                        key={`day-${dayNumber}`}
                      >
                        <button
                          onClick={() => onDayClick(days[dayNumber]?.date)}
                        >
                          {days[dayNumber]?.number}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPicker;
