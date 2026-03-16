"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists, editTask, deleteTask } from "@/app/_lib/demo";
import { TaskFormattedForEditor, Task } from "@/app/_models/task";
import { RefObject, useRef } from "react";
import { useParams } from "next/navigation";
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
  const task: RefObject<Task> = useRef(getTask(parseInt(id.id)));
  const initialTask: RefObject<TaskFormattedForEditor> = useRef({
    title: task.current.title,
    deadline:
      task.current.deadline === null
        ? defaultDate.current
        : task.current.deadline,
    idSelectedList: task.current.listKey,
    selectedPriority: task.current.priority,
    notes: task.current.note === null ? "" : task.current.note,
    enterDeadline: task.current.deadline !== null,
  });

  function handleSave(editedTaskFromEditor: TaskFormattedForEditor): void {
    const editedTask: Partial<Task> = {
      title: editedTaskFromEditor.title,
      deadline: editedTaskFromEditor.enterDeadline
        ? editedTaskFromEditor.deadline
        : null,
      listKey: editedTaskFromEditor.idSelectedList,
      priority: editedTaskFromEditor.selectedPriority,
      note: editedTaskFromEditor.notes === "" ? "" : editedTaskFromEditor.notes,
    };
    const updatedFields: Partial<Task> = {};

    if (editedTask.title !== initialTask.current.title) {
      updatedFields.title = editedTask.title;
    }
    if (editedTask.deadline !== initialTask.current.deadline) {
      updatedFields.deadline = editedTask.deadline;
    }
    if (editedTask.listKey !== initialTask.current.idSelectedList) {
      updatedFields.listKey = editedTask.listKey;
    }
    if (editedTask.priority !== initialTask.current.selectedPriority) {
      updatedFields.priority = editedTask.priority;
    }
    if (editedTask.note !== initialTask.current.notes) {
      updatedFields.note = editedTask.note;
    }
    editTask(task.current.id, updatedFields);
  }

  function handleDelete(): void {
    deleteTask(parseInt(id.id));
  }

  return (
    <EditorForm
      initialValues={initialTask.current}
      lists={lists.current}
      saveAction={handleSave}
      deleteButtonVisible={true}
      deleteAction={handleDelete}
    />
  );
}
