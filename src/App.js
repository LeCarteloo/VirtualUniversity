// Stylesheet
import "./App.css";

// React stuff
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Importing Components
import AuthBox from "./components/AuthBox";

// Download toastify later and fontawensome
// Choose colors for app

function App() {
  const loginValues = {
    title: "Sign in",
    firstInput: "Login",
    secondInput: "Password",
    actionText: "Login",
    routeText: "Remind password",
  };

  const remindValues = {
    title: "Remind password",
    firstInput: "Login",
    secondInput: "Email",
    actionText: "Remind",
    routeText: "Sign in",
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            exact
            element={
              <AuthBox type="login" path="/remind" values={loginValues} />
            }
          />
          <Route
            path="/remind"
            exact
            element={<AuthBox type="remind" path="/" values={remindValues} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
