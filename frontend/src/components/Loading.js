import "../styles/loading.scss";

const Loading = ({ size }) => {
  return (
    <div className="spinner-container">
      <div className={`${size}`}></div>
    </div>
  );
};

Loading.defaultProps = {
  size: "sm",
};

export default Loading;
