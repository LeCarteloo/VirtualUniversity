import Empty from "../../assets/empty.svg";

const NoData = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity: "0.6",
      }}
    >
      <img src={Empty} width={"100px"} height={"100px"} />
      <p style={{ margin: "0.5em 0 0.5em 0" }}>No data to display</p>
    </div>
  );
};

export default NoData;
