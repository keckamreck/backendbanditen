"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists } from "@/app/_lib/demo";
import { TaskFrontend } from "@/app/_models/task";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { List } from "@/app/_models/list";
import { getTask, editTask, deleteTask } from "@/app/api/tasks-api";

export default function Page() {
  const id: { id: string } = useParams<{ id: string }>();
  const [lists] = useState<List[]>(getLists());
  const [initialTask, setInitialTask] = useState<TaskFrontend>();

  useEffect((): void => {
    async function fetchTask(id: string): Promise<void> {
      try {
        const task: TaskFrontend | undefined = await getTask(id);
        setInitialTask(task);
      } catch (error) {}
    }
    fetchTask(id.id);
  }, [id.id]);

  function handleSave(editedTask: TaskFrontend): void {
    const updatedFields: Partial<TaskFrontend> = {};
    if (initialTask) {
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
  }

  function handleDelete(): void {
    deleteTask(id.id);
  }

  if (initialTask) {
    return (
      <EditorForm
        initialValues={initialTask}
        taskDone={initialTask.done}
        lists={lists}
        saveAction={handleSave}
        deleteButtonVisible={true}
        deleteAction={handleDelete}
      />
    );
  }
}
