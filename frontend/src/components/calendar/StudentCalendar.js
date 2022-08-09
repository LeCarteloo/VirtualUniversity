import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Input from "../Input";
import Modal from "../Modal";
import Calendar from "./Calendar";

const StudentCalendar = () => {
  const [events, setEvents] = useState();
  const [eventModal, setEventModal] = useState({ show: false, data: {} });
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
    setEventModal({
      show: true,
      data: {
        startDate: day,
        endDate: new Date(day.getTime() + 1 * 60 * 60 * 1000),
      },
    });
  };

  return (
    <section style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Calendar events={events} onHourClick={onAddEvent} />
      <Modal
        title="Add event"
        show={eventModal.show}
        onClose={() => setEventModal({ show: false, data: {} })}
      >
        <Input
          label={"Start date"}
          value={eventModal.data.startDate}
          readOnly
        />
        <Input label={"End date"} value={eventModal.data.endDate} readOnly />
      </Modal>
    </section>
  );
};

export default StudentCalendar;
