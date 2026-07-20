"use client";

import EditorForm from "@/app/_components/EditorForm";
import { TaskFrontend, TaskFrontendWithoutId } from "@/app/_models/task";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ListReal } from "@/app/_models/list";
import { deleteTask, editTask, getTask } from "@/app/_api/tasks-api";
import { getLists } from "@/app/_api/lists-api";

export default function Page() {
  const { id }: { id: string } = useParams<{ id: string }>();
  const [lists, setLists] = useState<ListReal[]>();
  const [initialTask, setInitialTask] = useState<TaskFrontend>();

  useEffect((): void => {
    async function fetchTask(): Promise<void> {
      const task: TaskFrontend | false = await getTask(id);
      if (task) {
        setInitialTask(task);
      }
    }
    async function fetchLists(): Promise<void> {
      const lists: ListReal[] | undefined = await getLists();
      setLists(lists);
    }
    fetchTask();
    fetchLists();
  }, [id]);

  async function handleSave(
    editedTask: TaskFrontendWithoutId,
  ): Promise<true | false> {
    const updatedFields: Partial<TaskFrontend> = {};
    if (initialTask) {
      if (editedTask.title !== initialTask.title) {
        updatedFields.title = editedTask.title;
      }
      if (editedTask.deadline !== initialTask.deadline) {
        updatedFields.deadline = editedTask.deadline;
      }
      if (editedTask.listId !== initialTask.listId) {
        updatedFields.listId = editedTask.listId;
      }
      if (editedTask.priority !== initialTask.priority) {
        updatedFields.priority = editedTask.priority;
      }
      if (editedTask.note !== initialTask.note) {
        updatedFields.note = editedTask.note;
      }
      const result: TaskFrontend | false = await editTask(
        initialTask.id,
        updatedFields,
      );
      return !!result;
    }
    return false;
  }

  async function handleDelete(): Promise<true | false> {
    return await deleteTask(id);
  }

  if (initialTask && lists) {
    return (
      <EditorForm
        initialValues={{
          title: initialTask.title,
          deadline: initialTask.deadline,
          listId: initialTask.listId,
          priority: initialTask.priority,
          note: initialTask.note,
          done: initialTask.done,
        }}
        lists={lists}
        saveAction={handleSave}
        deleteButtonVisible={true}
        deleteAction={handleDelete}
      />
    );
  } else {
    return <div style={{ margin: "20px" }}>Loading...</div>;
  }
}
