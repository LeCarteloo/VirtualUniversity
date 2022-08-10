import { useEffect, useState } from "react";

const DataPicker = () => {
  const [symbols, setSymbols] = useState();
  const [months, setMonths] = useState();
  // const [days, setDays] = useState();
  let days = [];

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

  const now = new Date(2022, 9, 0);

  const firstDay = new Date();

  const prevMonthLast = new Date(now.getFullYear(), now.getMonth(), 0);
  const thisMonthLast = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const thisMonthFirst = new Date(now.getFullYear(), now.getMonth(), 1);
  console.log("prevMonthLast", prevMonthLast.getDate());
  console.log("thisMonthLast", thisMonthLast.getDate());
  console.log("thisMonthFirst", thisMonthFirst.getDay());

  // firstDay.setDate(1);
  // console.log(firstDay.getDay());

  for (let i = thisMonthFirst.getDay(); i > 0; i--) {
    days.push({
      number: prevMonthLast.getDate() - i,
      // date: new Date()
    });
  }

  console.log(days);

  const nextMonth = () => {
    console.log("next");
  };

  const previousMonth = () => {
    console.log("prev");
  };

  return (
    <div className="data-picker">
      <button className="name">DATA PICKER</button>
      <div className="data-calendar">
        <div className="data-calendar-header">
          <span>{`${months?.[now.getMonth()]}, ${now.getFullYear()} `}</span>
          <div className="header-buttons">
            <button onClick={() => previousMonth()}> P </button>
            <button onClick={() => nextMonth()}> N </button>
          </div>
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
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>
              <tr>
                <td>8</td>
                <td>9</td>
                <td>10</td>
                <td>11</td>
                <td>12</td>
                <td>13</td>
                <td>14</td>
              </tr>
              <tr>
                <td>15</td>
                <td>16</td>
                <td>17</td>
                <td>18</td>
                <td>19</td>
                <td>20</td>
                <td>21</td>
              </tr>
              <tr>
                <td>22</td>
                <td>23</td>
                <td>24</td>
                <td>25</td>
                <td>26</td>
                <td>27</td>
                <td>28</td>
              </tr>
              <tr>
                <td>29</td>
                <td>30</td>
                <td>31</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataPicker;
