import { Group } from "../_models/group";
import { Priority, Task } from "../_models/task";

export function generateGroup() {
  const groups: Group[] = [
      {
        slug: "basic",
        title: "Test group",
        entries: generateEntries(),
      },
    ];
  return groups[0];
}

function generateEntries(){
  let tasks: Task[] = [
    { id: 0, title: "This is a task", priority: Priority.High},
    { id: 1, title: "This is another task", priority: Priority.Low},
  ];
  return tasks;
}