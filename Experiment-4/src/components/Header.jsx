import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

export default function LiveClock({ useMemoClock = true }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedTime = useMemo(() => {
    if (!useMemoClock) {
      return now.toLocaleTimeString();
    }

    return now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }, [now, useMemoClock]);

  const formattedDate = useMemo(() => {
    if (!useMemoClock) {
      return now.toLocaleDateString();
    }

    return now.toLocaleDateString([], {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }, [now, useMemoClock]);

  return (
    <div className="live-clock">
      <div className="clock-icon">◷</div>

      <div>
        <div className="clock-time">
          {formattedTime}
        </div>

        <div className="clock-date">
          {formattedDate}
        </div>
      </div>
    </div>
  );
}