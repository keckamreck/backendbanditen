"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists, getTasks, addTask } from "@/app/_lib/demo";
import { Priority, TaskFormattedForEditor, Task } from "@/app/_models/task";
import { List } from "@/app/_models/list";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
  const listId: { listId: string } = useParams<{ listId: string }>();
  const [dateToday] = useState<Date>(new Date());
  const [defaultDate] = useState<Date>(
    new Date(
      dateToday.getFullYear(),
      dateToday.getMonth(),
      dateToday.getDate() + 1,
      12,
      30,
    ),
  );
  const [lists] = useState<List[]>(getLists());
  const [tasks] = useState<Task[]>(getTasks());
  const [initialTaskForEditor] = useState<TaskFormattedForEditor>({
    title: "",
    enterDeadline: false,
    deadline: defaultDate,
    idSelectedList: parseInt(listId.listId),
    selectedPriority: Priority.Low,
    notes: "",
  });
  function handleSave(task: TaskFormattedForEditor): void {
    let highestId: number = 0;
    for (const element of tasks) {
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
      note: task.notes === "" ? null : task.notes,
      done: false,
    };
    addTask(result);
  }

  return (
    <EditorForm
      initialValues={initialTaskForEditor}
      taskDone={false}
      lists={lists}
      saveAction={handleSave}
      deleteButtonVisible={false}
    />
  );
}
