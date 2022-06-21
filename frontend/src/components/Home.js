import "../styles/home.scss";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

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


import {
  faFolder,
  faCalendarDays,
  faLayerGroup,
  faFileArrowDown,
  faGraduationCap,
  faIdCard,
  faListCheck,
  faBook,
  faTimeline,
  faBriefcaseMedical,
  faMoneyCheckDollar,
  fa5,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [t] = useTranslation("translation");

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

  // Navbar navigation items
  const navItems = [
    {
      name: t("navbar.articles"),
      icon: faNewspaper,
      path: "articles",
    },
    {
      name: t("navbar.calendar"),
      icon: faCalendarDays,
      path: "calendar",
    },
    {
      name: t("navbar.grades"),
      icon: fa5,
      path: "grades",
    },
    {
      name: t("navbar.yourstudies"),
      icon: faGraduationCap,
      subLinks: [
        { name: t("navbar.studentdata"), path: "student", icon: faIdCard },
        { name: t("navbar.syllabus"), path: "syllabus", icon: faTimeline },
        {
          name: t("navbar.insurance"),
          path: "insurance",
          icon: faBriefcaseMedical,
        },
        {
          name: t("navbar.choices"),
          path: "choices",
          icon: faListCheck,
        },
        {
          name: t("navbar.graduationwork"),
          path: "graduation_work",
          icon: faBook,
        },
      ],
    },
    {
      name: t("navbar.payments"),
      icon: faMoneyCheckDollar,
      path: "payments",
    },
    {
      name: t("navbar.shareddrive"),
      icon: faFolder,
      path: "drive",
    },
    {
      name: t("navbar.files"),
      icon: faFileArrowDown,
      path: "files",
    },
    {
      name: t("navbar.groups"),
      icon: faLayerGroup,
      path: "groups",
    },
  ];

  return (
    <section className="home-section">
      <Notifications notifs={notifs} />
      <NavBar navItems={navItems}/>
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
