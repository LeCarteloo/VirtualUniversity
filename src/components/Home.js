import "../styles/home.scss";
import { Routes, Route } from "react-router-dom";

import NavBar from "./NavBar";
import Dashboard from "./Dashboard";
import Grades from "./Grades";
import Notifications from "./Notifications";

const Home = () => {
  return (
    <section className="home-section">
      <Notifications />
      <NavBar />
      <section className="content-section">
        <Routes>
          <Route index path="dashboard" exact element={<Dashboard />} />
          <Route path="grades" exact element={<Grades />} />
        </Routes>
      </section>
    </section>
  );
};

export default Home;
