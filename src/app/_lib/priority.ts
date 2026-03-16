import { Priority } from "@/app/_models/task";

export function getPriority(priority: Priority) {
  switch(priority) {
    case Priority.High:
      return "hoch";
    case Priority.Medium:
      return "mittel";
    case Priority.Low:
      return "niedrig";
  }
}
export function getColor(priority: Priority) {
  switch(priority) {
    case Priority.High:
      return "#f2a68e";
    case Priority.Medium:
      return "#e9ccaa";
    case Priority.Low:
      return "#b6d6f0";
  }
}