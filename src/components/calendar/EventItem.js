const EventItem = ({ he, to, bg }) => {
  he = "100px";
  to = "100px";
  return (
    <div
      style={{ height: "100px", top: "102px", backgroundColor: { bg } }}
      className="event-item"
    >
      <div className="event-marker"></div>
      <div className="event-content">
        <span className="event-title">Artificial Intelligence</span>
        <span className="event-author">John Doe</span>
      </div>
    </div>
  );
};

export default EventItem;
