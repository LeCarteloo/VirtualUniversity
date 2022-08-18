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
import { errorToast, successToast } from "../../utility/toast";

const initialNewEvent = {
  startDate: undefined,
  endDate: undefined,
  room: "",
  code: "",
  isCanceled: false,
  isOnline: false,
  subject: "",
  course: "",
};

const AdminCalendar = () => {
  const [course, setCourse] = useState();
  const [courses, setCourses] = useState();
  const [events, setEvents] = useState();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ ...initialNewEvent });
  const axiosPrivate = useAxiosPrivate();

  // Loading all courses
  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await axiosPrivate.get("/courses/");
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

  // Loading all events for specific course
  useEffect(() => {
    const getEvents = async () => {
      try {
        const response = await axiosPrivate.get(
          `events/62ebdbe09addf7645adfbca0`
        );
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getEvents();
  }, [course]);

  /* Fn when user clicks div in calendar,
  it will open modal with date which user clicked*/
  const onHourClick = (day, hour) => {
    day.setHours(hour / 2 + 8, (hour % 2) * 30, 0);
    setAddModal(!addModal);
    setNewEvent({
      ...newEvent,
      startDate: day,
      endDate: new Date(day.getTime() + 1 * 60 * 60 * 1000),
    });
  };

  // Opening modal and setting data
  const onEventClick = (event) => {
    setEditModal(!editModal);
    setNewEvent({ ...newEvent, ...event });
  };

  // Adding event on submiting form inside modal
  const onAddEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.post(
        "/events",
        JSON.stringify({
          ...newEvent,
          subjectId: newEvent.subject._id,
          courseId: newEvent.course._id,
        })
      );

      setEvents([
        ...events,
        {
          ...newEvent,
          title: newEvent.subject.name,
          author: newEvent.subject.extra,
        },
      ]);
      setAddModal(false);
      setNewEvent({ ...initialNewEvent });
      successToast("Successfully added event");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  // Updating event on submiting form inside modal
  const onEditEvent = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosPrivate.put(
        `/events/${newEvent._id}`,
        JSON.stringify({
          ...newEvent,
          subjectId: newEvent.subject._id,
          courseId: newEvent.course._id,
        })
      );

      // Updating the state with edited event
      const newState = events.map((obj) =>
        obj._id === newEvent._id ? { ...obj, ...newEvent } : obj
      );

      setEvents(newState);
      setEditModal(false);
      setNewEvent({ ...initialNewEvent });
      successToast("Successfully updated event");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
  };

  // Removing event with given id
  const onRemoveEvent = async (e) => {
    try {
      const response = await axiosPrivate.delete(`/events/${newEvent._id}`);
      setEvents(events.filter((event) => event._id !== response.data._id));
      setNewEvent({ ...initialNewEvent });
      setEditModal(false);
      successToast("Successfully removed event");
    } catch (error) {
      errorToast(error?.response?.data?.message);
    }
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

  return (
    <section style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <div style={{ marginTop: "-1.3em", marginBottom: "0.2em" }}>
        <Dropdown
          selected={course?.name}
          setSelected={setCourse}
          options={
            courses &&
            courses.map((course) => {
              return {
                _id: course._id,
                name: `${course.name} ${course.year} ${course.semester}`,
              };
            })
          }
        />
      </div>
      <div style={{ height: "90%", overflow: "hidden" }}>
        <Calendar
          events={events}
          onHourClick={onHourClick}
          onEventClick={onEventClick}
        />
      </div>
      {/* Add modal */}
      <Modal
        title="Add event"
        show={addModal}
        onClose={() => {
          setAddModal(!addModal);
          setNewEvent({ ...initialNewEvent });
        }}
      >
        <form onSubmit={onAddEvent}>
          <DBSearchInput
            label={"Search subject"}
            value={newEvent.subject?.name}
            onClick={(item) => setNewEvent({ ...newEvent, subject: item })}
            route="/subjects/search"
          />
          <DBSearchInput
            label={"Search course"}
            value={newEvent.course?.name}
            onClick={(item) => setNewEvent({ ...newEvent, course: item })}
            route="/courses/search"
          />
          <div style={{ display: "flex", gap: "1em" }}>
            <Input
              label={"Room"}
              value={newEvent.room}
              onChange={(e) =>
                setNewEvent({ ...newEvent, room: e.target.value })
              }
            />
            <Input
              label={"Code"}
              value={newEvent.code}
              onChange={(e) =>
                setNewEvent({ ...newEvent, code: e.target.value })
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
                selected={newEvent.startDate?.toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                setSelected={(time) =>
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
                selected={newEvent.endDate?.toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                setSelected={(time) =>
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
          <Button text={"Add event"} />
        </form>
      </Modal>
      {/* Edit Modal */}
      <Modal
        title="Edit modal"
        show={editModal}
        onClose={() => {
          setEditModal(!editModal);
          setNewEvent({ ...initialNewEvent });
        }}
      >
        <form onSubmit={onEditEvent}>
          <DBSearchInput
            label={"Search subject"}
            value={newEvent.subject?.name}
            onClick={(item) => setNewEvent({ ...newEvent, subject: item })}
            route="/subjects/search"
          />
          <DBSearchInput
            label={"Search course"}
            value={newEvent.course?.name}
            onClick={(item) => setNewEvent({ ...newEvent, course: item })}
            route="/courses/search"
          />
          <div style={{ display: "flex", gap: "1em" }}>
            <Input
              label={"Room"}
              value={newEvent.room}
              onChange={(e) =>
                setNewEvent({ ...newEvent, room: e.target.value })
              }
            />
            <Input
              label={"Code"}
              value={newEvent.code}
              onChange={(e) =>
                setNewEvent({ ...newEvent, code: e.target.value })
              }
            />
          </div>
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
                selected={newEvent.startDate?.toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                setSelected={(time) =>
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
                selected={newEvent.endDate?.toLocaleTimeString(
                  navigator.language,
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                setSelected={(time) =>
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
          <Button text={"Edit event"} />
        </form>
        <Button
          text={"Remove event"}
          bgColor={"#2f3142"}
          onClick={onRemoveEvent}
        />
      </Modal>
    </section>
  );
};

export default AdminCalendar;
