"use client";

import Editor from "@/app/_components/editor";
import { getLists } from "@/app/_lib/demo";
import { Priority, saveTodo, Task } from "@/app/_models/task";
import { List } from "@/app/_models/list";
import { RefObject, useRef } from "react";
import { getTasks } from "@/app/_lib/demo";
import { addTask } from "@/app/_lib/demo";

export default function Page() {
  const dateToday: RefObject<Date> = useRef(new Date());
  const defaultDate: RefObject<Date> = useRef(
    new Date(
      dateToday.current.getFullYear(),
      dateToday.current.getMonth(),
      dateToday.current.getDate() + 1,
      12,
      30,
    ),
  );
  const lists: RefObject<List[]> = useRef(getLists());
  const tasks: RefObject<Task[]> = useRef(getTasks());
  const defaultValue: RefObject<saveTodo> = useRef({
    title: "",
    enterDeadline: false,
    deadline: defaultDate.current,
    idSelectedList: lists.current[0].id,
    selectedPriority: Priority.Low,
    notes: "",
  });
  function handleSave(todo: saveTodo): void {
    let highestId: number = 0;
    for (const task of tasks.current) {
      if (task.id > highestId) {
        highestId = task.id;
      }
    }

    let result: Task = {
      id: highestId + 1,
      title: todo.title,
      deadline: todo.enterDeadline ? todo.deadline : null,
      priority: todo.selectedPriority,
      listKey: todo.idSelectedList,
      done: false,
      note: todo.notes === "" ? null : todo.notes,
    };
    addTask(result);
  }

  return (
    <Editor
      defaultTitle={defaultValue.current.title}
      defaultEnterDeadline={defaultValue.current.enterDeadline}
      defaultDeadline={defaultValue.current.deadline}
      lists={lists.current}
      defaultIdSelectedList={defaultValue.current.idSelectedList}
      defaultSelectedPriority={defaultValue.current.selectedPriority}
      defaultNotes={defaultValue.current.notes}
      saveAction={(todo: saveTodo) => handleSave(todo)}
      deleteButtonVisible={false}
    ></Editor>
  );
}
