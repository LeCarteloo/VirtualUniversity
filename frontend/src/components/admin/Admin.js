import NavBar from "../nav/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookBookmark,
  faCalendar,
  faCalendarDays,
  faRoad,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import Subjects from "./Subjects";
const Admin = () => {
  // Navbar navigation items
  const navItems = [
    {
      name: "Subjects",
      icon: faBookBookmark,
      path: "subjects",
    },
    {
      name: "Users",
      icon: faUser,
      path: "users",
    },
    {
      name: "Calendar",
      icon: faRoad,
      path: "events",
    },
  ];

  return (
    <section className="home-section">
      <NavBar navItems={navItems} />
      <section className="content-section">
        <Routes>
          <Route path="/users" exact element={<Users />} />
          <Route path="/subjects" exact element={<Subjects />} />
        </Routes>
      </section>
    </section>
  );
};

export default Admin;
