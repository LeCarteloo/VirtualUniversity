import "../styles/home.scss";

import NavBar from "./NavBar";
import Dashboard from "./Dashboard";

const Home = () => {
  return (
    <section className="home-section">
      <NavBar />
      <section className="content-section">
        <Dashboard />
      </section>
    </section>
  );
};

export default Home;
