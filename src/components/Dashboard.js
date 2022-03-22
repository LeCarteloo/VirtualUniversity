import "../styles/dashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  // Object with future announcements
  const anns = {};
  return (
    <section className="dashboard-section">
      <div className="announcements">
        <h1 className="title">Announcements</h1>
        <hr />
        {anns.length > 0
          ? "Future announcements"
          : "No announcements to display"}
      </div>
      <div className="nav-blocks">
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
        <div className="nav-block">
          <FontAwesomeIcon icon={faFolder} size="5x" className="block-icon" />
          <span className="block-name">Shared drive</span>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
