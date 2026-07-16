import { Priority } from "@/app/_models/task";

export function StringToPriority(priority: string): Priority {
  const priorityAsNumber: number = parseInt(priority);
  if (priorityAsNumber < 0 || priorityAsNumber > 2) {
    throw new Error();
  } else {
    return priorityAsNumber as unknown as Priority;
  }
}

export function PriorityToString(priority: Priority): "0" | "1" | "2" {
  const priorityAsString: string = priority.toString();
  if (
    priorityAsString === "0" ||
    priorityAsString === "1" ||
    priorityAsString === "2"
  ) {
    return priorityAsString;
  } else {
    throw new Error();
  }
}
