// Stylesheet
import "./App.css";

// React stuff
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing Components
import Login from "./components/Login";
import Remind from "./components/Remind";
import Home from "./components/Home";
// Download toastify later and fontawensome
// Choose colors for app

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/remind" exact element={<Remind />} />
          <Route path="/home" exact element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
