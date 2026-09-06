import { addDays, getMonday } from "../utils/dateUtils";

const today = new Date();
const monday = getMonday(today);

function createDate(dayOffset, hour, minute = 0) {
  const date = addDays(monday, dayOffset);

  date.setHours(hour, minute, 0, 0);

  return date.toISOString();
}

export const initialPosts = [
  {
    id: 1,
    title: "Monday Motivation",
    content: "Start the week with an inspiring message.",
    platform: "Instagram",
    status: "Scheduled",
    date: createDate(0, 9, 0),
    duration: 60,
    color: "purple",
  },

  {
    id: 2,
    title: "Product Update",
    content: "Share the latest product improvements.",
    platform: "LinkedIn",
    status: "Scheduled",
    date: createDate(0, 13, 30),
    duration: 60,
    color: "blue",
  },

  {
    id: 3,
    title: "Behind The Scenes",
    content: "Show followers what happens behind the scenes.",
    platform: "Instagram",
    status: "Draft",
    date: createDate(1, 10, 0),
    duration: 60,
    color: "pink",
  },

  {
    id: 4,
    title: "Tech Tips",
    content: "Five simple technology tips for students.",
    platform: "LinkedIn",
    status: "Scheduled",
    date: createDate(2, 11, 30),
    duration: 60,
    color: "cyan",
  },

  {
    id: 5,
    title: "Weekend Campaign",
    content: "Prepare promotional content for the weekend.",
    platform: "Facebook",
    status: "Scheduled",
    date: createDate(3, 15, 0),
    duration: 60,
    color: "orange",
  },

  {
    id: 6,
    title: "Customer Story",
    content: "Highlight an interesting customer success story.",
    platform: "LinkedIn",
    status: "Published",
    date: createDate(4, 10, 30),
    duration: 60,
    color: "green",
  },

  {
    id: 7,
    title: "Weekly Recap",
    content: "Summarize the important events from the week.",
    platform: "Instagram",
    status: "Scheduled",
    date: createDate(5, 12, 0),
    duration: 60,
    color: "purple",
  },

  {
    id: 8,
    title: "Sunday Planning",
    content: "Plan the next week's content calendar.",
    platform: "Facebook",
    status: "Draft",
    date: createDate(6, 16, 0),
    duration: 60,
    color: "orange",
  },
];