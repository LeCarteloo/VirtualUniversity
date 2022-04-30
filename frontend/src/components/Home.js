import "../styles/home.scss";
import { Routes, Route } from "react-router-dom";

import NavBar from "./nav/NavBar";
import Articles from "./articles/Articles";
import Article from "./articles/Article";
import Grades from "./Grades";
import Payments from "./payments/Payments";
import Calendar from "./calendar/Calendar";
import Notifications from "./notifications/Notifications";
import Files from "./files/Files";
import Groups from "./groups/Groups";
import GraduationWork from "./studies/GraduationWork";
import Syllabus from "./studies/Syllabus";
import Student from "./studies/Student";
import Choices from "./studies/Choices";

const Home = () => {
  const notifs = [
    {
      id: 1,
      text: "You got a new grade in",
      topic: "Artifical Inteligence",
    },
    {
      id: 2,
      text: "You got a new grade in",
      topic: "Artifical Inteligence",
    },
    {
      id: 3,
      text: "You got a new grade in",
      topic: "Artifical Inteligence",
    },
    {
      id: 4,
      text: "You got a new grade in",
      topic: "Artifical Inteligence",
    },
  ];

  return (
    <section className="home-section">
      <Notifications notifs={notifs} />
      <NavBar />
      <section className="content-section">
        <Routes>
          <Route index path="articles" exact element={<Articles />} />
          <Route path="articles/:id" exact element={<Article />} />
          <Route path="grades" exact element={<Grades />} />
          {/* Your studies */}
          <Route path="student" exact element={<Student />} />
          <Route path="graduation_work" exact element={<GraduationWork />} />
          <Route path="syllabus" exact element={<Syllabus />} />
          <Route path="choices" exact element={<Choices />} />
          {/* Your studies */}
          <Route path="payments" exact element={<Payments />} />
          <Route path="calendar" exact element={<Calendar />} />
          <Route path="files" exact element={<Files />} />
          <Route path="groups" exact element={<Groups />} />
        </Routes>
      </section>
    </section>
  );
};

export default Home;
