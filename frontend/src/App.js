// Stylesheet
import "./App.scss";

// React stuff
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Suspense } from "react";

// Importing Components
import Login from "./components/Login";
import Remind from "./components/Remind";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import RequireAuth from "./context/RequireAuth";

// Languages
import en_US from "./languages/en/app.json";
import pl_PL from "./languages/pl/app.json";
import Unauthorized from "./components/Unauthorized";

// Initializing i18n with tranlsation files
i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en_US },
    pl: { translation: pl_PL },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  const lang = localStorage.getItem("language");
  i18n.changeLanguage(lang);

  return (
    <Suspense fallback="Loading...">
      <Router>
        <div className="container">
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="remind" exact element={<Remind />} />
            {/* Protected routes */}
            <Route
              path="home/*"
              exact
              element={
                <RequireAuth allowedRole={"student"}>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="admin/*"
              exact
              element={
                <RequireAuth allowedRole={"admin"}>
                  <Admin />
                </RequireAuth>
              }
            />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* <Route path="*" element={} /> */}
          </Routes>
        </div>
      </Router>
    </Suspense>
  );
}

export default App;
