import "../styles/home.scss";
import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Articles from "./articles/Articles";
import Article from "./articles/Article";
import Grades from "./Grades";
import Calendar from "./calendar/Calendar";
import Notifications from "./notifications/Notifications";
import Files from "./files/Files";

const Home = () => {
  return (
    <section className="home-section">
      <Notifications />
      <NavBar />
      <section className="content-section">
        <Routes>
          <Route index path="articles" exact element={<Articles />} />
          <Route path="articles/:id" exact element={<Article />} />
          <Route path="grades" exact element={<Grades />} />
          <Route path="calendar" exact element={<Calendar />} />
          <Route path="files" exact element={<Files />} />
        </Routes>
      </section>
    </section>
  );
};

export default Home;
