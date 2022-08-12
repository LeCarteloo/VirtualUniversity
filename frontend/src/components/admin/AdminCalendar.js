import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Input from "../Input";
import Modal from "../Modal";
import Calendar from "../calendar/Calendar";
import DataPicker from "../inputs/DataPicker";
import Dropdown from "../Dropdown";
import Button from "../Button";
import Checkbox from "../inputs/Checkbox";
import DBSearchInput from "../inputs/DBSearchInput";

const AdminCalendar = () => {
  const [events, setEvents] = useState();
  const [eventModal, setEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    startDate: undefined,
    endDate: undefined,
    room: "",
    code: "",
    isCanceled: false,
    isOnline: false,
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

  const onHourClick = (day, hour) => {
    day.setHours(hour / 2 + 8, (hour % 2) * 30, 0);
    setEventModal(!eventModal);
    setNewEvent({
      ...newEvent,
      startDate: day,
      endDate: new Date(day.getTime() + 1 * 60 * 60 * 1000),
    });
  };

  const onAddEvent = (e) => {
    e.preventDefault();
  };

  //TODO: Should be changed
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

  const repeatOptions = [
    {
      _id: 1,
      name: "Does not repeat",
    },
    {
      _id: 2,
      name: "Every week",
    },
    {
      _id: 3,
      name: "Every second week",
    },
  ];

  return (
    <section style={{ width: "100%", height: "90%", overflow: "hidden" }}>
      <Calendar events={events} onHourClick={onHourClick} />
      <Modal
        title="Add event"
        show={eventModal}
        onClose={() => setEventModal(!eventModal)}
      >
        <DBSearchInput label={"Search subject"} />
        <DBSearchInput label={"Search course"} />

        <form onSubmit={onAddEvent}>
          <div style={{ display: "flex", gap: "2em" }}>
            <Input
              label={"Room number"}
              value={newEvent.room}
              onChange={(e) =>
                setNewEvent({ ...newEvent, room: e.target.value })
              }
            />
            <Input
              label={"Online code"}
              value={newEvent.code}
              onChange={(e) =>
                setNewEvent({ ...newEvent, code: e.target.value })
              }
            />
          </div>

          <Dropdown
            state={newEvent.onRepeat.name}
            setState={(repeat) =>
              setNewEvent({ ...newEvent, onRepeat: repeat })
            }
            options={repeatOptions}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <Checkbox
              label="Online"
              value={newEvent.isOnline}
              onChange={(value) =>
                setNewEvent({ ...newEvent, isOnline: value })
              }
            />
            <Checkbox
              label="Canceled"
              value={newEvent.isCanceled}
              onChange={(value) =>
                setNewEvent({ ...newEvent, isCanceled: value })
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: "0.4em",
            }}
          >
            <div style={{ width: "100%" }}>
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
            <div style={{ width: "100%" }}>
              <DataPicker
                label={"End date"}
                onDayClick={(date) =>
                  setNewEvent({ ...newEvent, endDate: date })
                }
                value={newEvent.endDate?.toLocaleDateString()}
              />
              <Dropdown
                state={newEvent.endDate?.toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
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

          <Button text={"Add event"} />
        </form>
      </Modal>
    </section>
  );
};

export default AdminCalendar;
