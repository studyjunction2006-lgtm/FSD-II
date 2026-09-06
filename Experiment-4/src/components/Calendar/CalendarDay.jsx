import TimeSlot from "./TimeSlot";
import {
  formatDate,
  formatDayName,
  formatMonthDay,
  TIME_SLOTS,
} from "../../utils/dateUtils";

export default function CalendarDay({
  date,
  posts,
  onEdit,
  onDelete,
  onDragStart,
  onDrop,
  onDragOver,
}) {
  const dateString = formatDate(date);

  return (
    <div className="calendar-day">

      <div className="day-header">
        <span>
          {formatDayName(date)}
        </span>

        <strong>
          {formatMonthDay(date)}
        </strong>
      </div>

      {TIME_SLOTS.map((time) => (
        <TimeSlot
          key={time}
          date={dateString}
          time={time}
          posts={posts}
          onEdit={onEdit}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDrop={onDrop}
          onDragOver={onDragOver}
        />
      ))}

    </div>
  );
}