import { useNavigate } from "react-router-dom";
import Unauth from "../assets/401.svg";

const Unauthorized = () => {
  const navigate = useNavigate();

  //Btn function
  const goBack = () => navigate(-1);

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
      <img src={Unauth} style={{ maxHeight: "550px" }}></img>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <h1 style={{ fontSize: "3em", color: "#339fcd" }}>We are sorry...</h1>
        <p style={{ textAlign: "center", fontSize: "1.5em" }}>
          The page you're trying to access has restricted access.
        </p>
        <button onClick={goBack}>Go back</button>
      </div>
    </section>
  );
};

export default Unauthorized;
