import { useState, useEffect } from "react";

const TimeMarker = () => {
  const getTime = () => {
    const time = new Date();

    if (time.getHours() >= 8 && time.getHours() <= 22)
      return (time.getHours() + time.getMinutes() / 60 - 8) * 102;

    return -5;
  };

  const [top, setTop] = useState(getTime());

  useEffect(() => {
    const interval = setInterval(() => setTop(getTime()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div className="time-marker" style={{ top: top }}></div>;
};

export default TimeMarker;
