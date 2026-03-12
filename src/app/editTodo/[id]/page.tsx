"use client";

import Editor from "@/app/_components/editor";
import { getLists, getTasks } from "@/app/_lib/demo";
import { Priority, saveTodo, Task } from "@/app/_models/task";
import { RefObject, useRef } from "react";
import { useParams } from "next/navigation";
import { editTask, deleteTask } from "@/app/_lib/demo";
import { List } from "@/app/_models/list";
import { getTask } from "@/app/_models/function";

export default function Page() {
  const id: { id: string } = useParams<{ id: string }>();
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
  const task: RefObject<Task> = useRef(getTask(parseInt(id.id.toString())));
  const defaultValue: saveTodo = {
    title: task.current.title,
    enterDeadline: task.current.deadline !== null,
    deadline:
      task.current.deadline === null
        ? defaultDate.current
        : task.current.deadline,
    idSelectedList: task.current.listKey,
    selectedPriority: task.current.priority,
    notes: task.current.note === null ? "" : task.current.note,
  };

  function handleSave(todo: saveTodo): void {}

  function handleDelete(): void {
    deleteTask(parseInt(id.id));
  }

  return (
    <Editor
      defaultTitle={defaultValue.title}
      defaultEnterDeadline={defaultValue.enterDeadline}
      defaultDeadline={defaultValue.deadline}
      lists={lists.current}
      defaultIdSelectedList={defaultValue.idSelectedList}
      defaultSelectedPriority={defaultValue.selectedPriority}
      defaultNotes={defaultValue.notes}
      saveAction={(todo: saveTodo) => handleSave(todo)}
      deleteButtonVisible={true}
      deleteAction={() => handleDelete()}
    ></Editor>
  );
}
