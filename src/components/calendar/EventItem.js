const EventItem = ({ title, author, startTime, length, isCanceled }) => {
  return (
    <div
      style={{
        height: length * 101.5 + "px",
        top: (startTime - 8) * 101.5 + "px",
      }}
      className={`event-item ${isCanceled && "canceled"}`}
    >
      <div className="event-marker"></div>
      <div className="event-content">
        <span className="event-title"> {title} </span>
        <span className="event-author"> {author} </span>
      </div>
    </div>
  );
};

export default EventItem;
