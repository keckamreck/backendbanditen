import { Group } from '@/app/_models/group';
import { Priority, Task } from '@/app/_models/task';

export function generateGroup() {
  const groups: Group[] = [
      {
        slug: "basic",
        title: "Basic group",
        entries: generateEntries(),
      },
    ];
  return groups[0];
}

function generateEntries() {
  let tasks: Task[] = [
    { id: 0, title: "This is a task", date: new Date("2025-02-01"), priority: Priority.High},
    { id: 1, title: "This is another task", date: new Date("2025-03-01"), priority: Priority.Medium},
    { id: 2, title: "This is another task", date: new Date("2025-04-01"), priority: Priority.Low},
  ];
  return tasks;
}