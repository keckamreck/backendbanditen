"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists, editTask, deleteTask } from "@/app/_lib/demo";
import { TaskFormattedForEditor, Task } from "@/app/_models/task";
import { useState } from "react";
import { useParams } from "next/navigation";
import { List } from "@/app/_models/list";
import { getTask } from "@/app/_lib/demo";

export default function Page() {
  const id: { id: string } = useParams<{ id: string }>();
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
  const [initialTask] = useState<Task>(getTask(parseInt(id.id)));
  const [initialTaskForEditor] = useState<TaskFormattedForEditor>({
    title: initialTask.title,
    deadline:
      initialTask.deadline === null ? defaultDate : initialTask.deadline,
    idSelectedList: initialTask.listKey,
    selectedPriority: initialTask.priority,
    notes: initialTask.note === null ? "" : initialTask.note,
    enterDeadline: initialTask.deadline !== null,
  });

  function handleSave(editedTaskFromEditor: TaskFormattedForEditor): void {
    const editedTask: Partial<Task> = {
      title: editedTaskFromEditor.title,
      deadline: editedTaskFromEditor.enterDeadline
        ? editedTaskFromEditor.deadline
        : null,
      listKey: editedTaskFromEditor.idSelectedList,
      priority: editedTaskFromEditor.selectedPriority,
      note:
        editedTaskFromEditor.notes === "" ? null : editedTaskFromEditor.notes,
    };
    const updatedFields: Partial<Task> = {};

    if (editedTask.title !== initialTask.title) {
      updatedFields.title = editedTask.title;
    }
    if (editedTask.deadline !== initialTask.deadline) {
      updatedFields.deadline = editedTask.deadline;
    }
    if (editedTask.listKey !== initialTask.listKey) {
      updatedFields.listKey = editedTask.listKey;
    }
    if (editedTask.priority !== initialTask.priority) {
      updatedFields.priority = editedTask.priority;
    }
    if (editedTask.note !== initialTask.note) {
      updatedFields.note = editedTask.note;
    }
    editTask(initialTask.id, updatedFields);
  }

  function handleDelete(): void {
    deleteTask(parseInt(id.id));
  }

  return (
    <EditorForm
      initialValues={initialTaskForEditor}
      taskDone={initialTask.done}
      lists={lists}
      saveAction={handleSave}
      deleteButtonVisible={true}
      deleteAction={handleDelete}
    />
  );
}
