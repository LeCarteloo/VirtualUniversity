// Stylesheet
import "./App.scss";

// React imports
import { Route, Routes } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import useAuth from "hooks/useAuth";

// Importing Components
import Login from "components/Login";
import Remind from "./components/Remind";
import Home from "./components/Home";
import Admin from "./components/admin/Admin";
import RequireAuth from "./context/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import Session from "./components/Session";
import NotFound from "./components/NotFound";
import LecturerHome from "./pages/lecturer/LecturerHome";

// Languages
import en_US from "./languages/en/app.json";
import pl_PL from "./languages/pl/app.json";

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

  const { auth } = useAuth();

  return (
    <Suspense fallback="Loading...">
      <div className="container">
        <ToastContainer />
        <Routes>
          <Route path="/" exact default element={<Login />} />
          <Route path="remind" exact element={<Remind />} />
          {/* Protected routes */}
          <Route element={<Session />}>
            <Route element={<RequireAuth allowedRole={"student"} />}>
              <Route path="student/*" exact element={<Home />} />
            </Route>
            <Route element={<RequireAuth allowedRole={"admin"} />}>
              <Route path="admin/*" exact element={<Admin />} />
            </Route>
            <Route element={<RequireAuth allowedRole={"lecturer"} />}>
              <Route path="/lecturer" exact element={<LecturerHome />} />
            </Route>
          </Route>
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
