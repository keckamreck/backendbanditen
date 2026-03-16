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
      return "red";
    case Priority.Medium:
      return "orange";
    case Priority.Low:
      return "green";
  }
}