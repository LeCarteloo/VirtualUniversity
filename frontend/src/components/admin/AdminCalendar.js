import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Input from "../Input";
import Modal from "../Modal";
import Calendar from "../calendar/Calendar";
// import DataPicker from "react-calendar";
// import "react-calendar/dist/Calendar.css";
import DataPicker from "../inputs/DataPicker";

const AdminCalendar = () => {
  const [events, setEvents] = useState();
  const [eventModal, setEventModal] = useState({ show: false, data: {} });
  //   const [newEvent, setNewEvent] = useState({
  //   })
  const axiosPrivate = useAxiosPrivate();
  const [value, onChange] = useState(new Date());

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
    <section style={{ width: "100%", height: "90%", overflow: "hidden" }}>
      <DataPicker onChange={onChange} value={value} className="test" />
      {/* <Calendar events={events} onHourClick={onAddEvent} /> */}
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

export default AdminCalendar;
