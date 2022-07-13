import notFound from "../assets/404.svg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img src={notFound} style={{ maxHeight: "550px" }}></img>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      ></div>
    </section>
  );
};

export default NotFound;
