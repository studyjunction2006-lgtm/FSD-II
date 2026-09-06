export function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function formatDateKey(date) {
  const d = new Date(date);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatMonthDay(date) {
  return new Date(date).toLocaleDateString([], {
    month: "short",
    day: "numeric",
  });
}

export function formatFullDate(date) {
  return new Date(date).toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getMonday(date) {
  const result = startOfDay(date);
  const day = result.getDay();

  const difference = day === 0 ? -6 : 1 - day;

  result.setDate(result.getDate() + difference);

  return result;
}

export function addDays(date, amount) {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
}

export function combineDateAndTime(date, time) {
  const result = new Date(date);

  const [hours, minutes] = time.split(":").map(Number);

  result.setHours(hours || 0, minutes || 0, 0, 0);

  return result;
}

export function getHour(date) {
  return new Date(date).getHours();
}

export function getMinutes(date) {
  return new Date(date).getMinutes();
}

export function getWeekDays(date) {
  const monday = getMonday(date);

  return Array.from({ length: 7 }, (_, index) => {
    return addDays(monday, index);
  });
}