import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Input from "../Input";
import Modal from "../Modal";
import Calendar from "../calendar/Calendar";
// import DataPicker from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import DataPicker from "../inputs/DataPicker";
import Dropdown from "../Dropdown";

const AdminCalendar = () => {
  const [events, setEvents] = useState();
  const [eventModal, setEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    startDate: undefined,
    endDate: undefined,
    room: "",
    code: "",
    isCanceled: "",
    isOnline: "",
    onRepeat: "",
    subjectId: "",
    courseId: "",
  });
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axiosPrivate.get(
          `events/62ebdbe09addf7645adfbca0`
        );
        setEvents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEvents();
  }, []);

  const onAddEvent = (day, hour) => {
    day.setHours(hour / 2 + 8, (hour % 2) * 30, 0);
    setEventModal(!eventModal);
    setNewEvent({
      ...newEvent,
      startDate: day,
      endDate: new Date(day.getTime() + 1 * 60 * 60 * 1000),
    });
  };

  const onDayClick = (date) => {
    console.log(date);
  };

  let timeOptions = [];

  for (let i = 0; i < 29; i++) {
    let date = new Date(2022, 0, 1, Math.floor(i / 2) + 8, (i * 30) % 60);
    timeOptions.push({
      _id: i,
      name: date.toLocaleTimeString(navigator.language, {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: date,
    });
  }

  return (
    <section style={{ width: "100%", height: "90%", overflow: "hidden" }}>
      <Calendar events={events} onHourClick={onAddEvent} />
      <Modal
        title="Add event"
        show={eventModal}
        onClose={() => setEventModal(!eventModal)}
      >
        <div
          style={{
            display: "flex",
            gap: "0.4em",
          }}
        >
          <div>
            <DataPicker
              label={"Start date"}
              onDayClick={(date) =>
                setNewEvent({ ...newEvent, startDate: date })
              }
              value={newEvent.startDate?.toLocaleDateString()}
            />
            <Dropdown
              state={newEvent.startDate?.toLocaleTimeString(
                navigator.language,
                {
                  hour: "2-digit",
                  minute: "2-digit",
                }
              )}
              setState={(time) =>
                setNewEvent({
                  ...newEvent,
                  startDate: new Date(
                    newEvent.startDate.getFullYear(),
                    newEvent.startDate.getMonth(),
                    newEvent.startDate.getDate(),
                    time.date.getHours(),
                    time.date.getMinutes()
                  ),
                })
              }
              options={timeOptions}
            />
          </div>
          <div>
            <DataPicker
              label={"End date"}
              onDayClick={(date) => setNewEvent({ ...newEvent, endDate: date })}
              value={newEvent.endDate?.toLocaleDateString()}
            />

            <Dropdown
              state={newEvent.endDate?.toLocaleTimeString(navigator.language, {
                hour: "2-digit",
                minute: "2-digit",
              })}
              setState={(time) =>
                setNewEvent({
                  ...newEvent,
                  endDate: new Date(
                    newEvent.endDate.getFullYear(),
                    newEvent.endDate.getMonth(),
                    newEvent.endDate.getDate(),
                    time.date.getHours(),
                    time.date.getMinutes()
                  ),
                })
              }
              options={timeOptions}
            />
          </div>
        </div>

        {/* <Input label={"Start date"} value={newEvent.startDate} readOnly /> */}
        {/* <Input label={"End date"} value={newEvent.endDate} readOnly /> */}
      </Modal>
    </section>
  );
};

export default AdminCalendar;
