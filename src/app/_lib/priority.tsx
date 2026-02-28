import { Priority } from "@/app/_models/task";

export function getPriority(id: number) {
  return Priority[id];
}
export function getColor(priority: Priority)
{
  switch(priority) {
    case Priority.High:
      return "red";
    case Priority.Medium:
      return "orange";
    case Priority.Low:
      return "green";
  }
}