import { List } from "@/app/_models/list";
import { Priority, Task } from "@/app/_models/task";

let tasks: Task[] = [
  {
    id: 0,
    title: "This is a task",
    deadline: new Date("2028-02-01T10:01:00"),
    priority: Priority.High,
    listKey: 1,
    done: false,
    note: null,
  },
  {
    id: 1,
    title: "This is another task",
    deadline: new Date("2028-03-01T11:00:00"),
    priority: Priority.Medium,
    listKey: 2,
    done: false,
    note: null,
  },
  {
    id: 2,
    title: "This is another task",
    note: "das ist eine Notiz",
    deadline: new Date("2028-04-01T22:00:00"),
    priority: Priority.Low,
    listKey: 1,
    done: false,
  },
  {
    id: 3,
    title: "Milch kaufen",
    note: "- Haltbare Milch (1,5% Fett)\n- 2 Packungen\n- Sonderangebot nutzen",
    deadline: new Date("2026-03-17T12:14:00"),
    priority: Priority.High,
    listKey: 4,
    done: false,
  },
];

let list: List[] = [
  {
    id: 0,
    title: "Arbeit",
    category: "Duales Studium",
  },
  {
    id: 1,
    title: "Privat",
  },
  {
    id: 2,
    title: "Studium",
    category: "Duales Studium",
  },
  {
    id: 3,
    title: "sonstiges",
  },
  {
    id: 4,
    title: "Haushalt",
  },
];

export function getLists() {
  return list;
}

export function getTasks() {
  return tasks;
}

export function addTask(task: Task): void {
  tasks.push(task);
  console.log(tasks);
}

export function editTask(task: Task) {
  console.log(task);
}

export function deleteTask(id: number) {
  const index: number = tasks.findIndex((task) => task.id === id);
  tasks.splice(index, 1);
}

export function updateListCategory(listId: number, newCategory: string) {
  const list = listsData.find(l => l.id === listId);
  if (list) {
    list.category = newCategory;
  }
  return list;
}

export function getCategories(){
  const lists: List[] = getLists();
  const categories: string[] = [];
  let temp : string = "";

  for(let i=0; i< lists.length; i++){
    if (lists[i].category){
      temp = lists[i].category as string;
    }
    if(temp != "" && !categories.includes(temp)){
    categories.push(temp);
    }
  }
  return categories;
}
