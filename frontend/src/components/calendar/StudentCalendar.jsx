import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Calendar from "./Calendar";

const StudentCalendar = () => {
  const [events, setEvents] = useState();
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

  return (
    <section style={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Calendar events={events} />
    </section>
  );
};

export default StudentCalendar;
