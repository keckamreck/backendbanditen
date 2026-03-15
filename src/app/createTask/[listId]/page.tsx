"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists, getTasks, addTask } from "@/app/_lib/demo";
import { Priority, TaskFormattedForEditor, Task } from "@/app/_models/task";
import { List } from "@/app/_models/list";
import { RefObject, useRef } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const listId: { listId: string } = useParams<{ listId: string }>();
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
  const initialTask: RefObject<TaskFormattedForEditor> = useRef({
    title: "",
    enterDeadline: false,
    deadline: defaultDate.current,
    idSelectedList: parseInt(listId.listId),
    selectedPriority: Priority.Low,
    notes: "",
  });
  function handleSave(task: TaskFormattedForEditor): void {
    let highestId: number = 0;
    for (const element of tasks.current) {
      if (element.id > highestId) {
        highestId = element.id;
      }
    }

    const result: Task = {
      id: highestId + 1,
      title: task.title,
      deadline: task.enterDeadline ? task.deadline : null,
      priority: task.selectedPriority,
      listKey: task.idSelectedList,
      done: false,
      note: task.notes ?? "",
    };
    addTask(result);
  }

  return (
    <EditorForm
      initialValues={initialTask.current}
      lists={lists.current}
      saveAction={handleSave}
      deleteButtonVisible={false}
    />
  );
}
