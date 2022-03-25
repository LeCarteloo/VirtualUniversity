import "../styles/dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

import NavBlock from "./NavBlock";

const Dashboard = () => {
  // Array with future announcements
  const anns = [];
  // const anns = [
  //   {
  //     title: "Test Announcement",
  //     date: "25.03.2022",
  //     desc:
  //       "Lorem, ipsum dolor sit amet consectetur adipisicing " +
  //       "elit. Doloremque fugit aliquid alias nihil mollitia " +
  //       "sed libero id impedit labore fuga!",
  //   },
  // ];

  return (
    <section className="dashboard-section">
      <div className="announcements">
        <h1 className="title">Announcements</h1>
        <hr />
        {anns.length > 0
          ? "Future announcements"
          : "No announcements to display"}
      </div>
      <div className="blocks-wrapper">
        <div className="nav-blocks">
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
          <NavBlock />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
