import { Group } from ".../_types/group.ts";
import { Task } from "../_types/task.ts";
import { Priority } from "../_types/priority.ts";

export function generateGroup() {
  const groups: Group[] = [
      {
        slug: "basic",
        title: "Test group",
        data: generateTask(),
      },
    ];
  return groups[0];
}

function generateTask(){
  let tasks: Task[] = [
    { id: 0, title: "This is a task", priority: Priority.High},
    { id: 1, title: "This is another task", priority: Priority.Low},
  ];
  return tasks;
}