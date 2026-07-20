"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists } from "@/app/_api/lists-api";
import {
  Priority,
  TaskFrontend,
  TaskFrontendWithoutId,
} from "@/app/_models/task";
import { ListReal } from "@/app/_models/list";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createTask } from "@/app/_api/tasks-api";

export default function Page() {
  const { listId }: { listId: string } = useParams<{ listId: string }>();
  const [lists, setLists] = useState<ListReal[]>();
  const [initialTask, setInitialTask] = useState<TaskFrontendWithoutId>();

  async function handleSave(
    task: TaskFrontendWithoutId,
  ): Promise<true | false> {
    const result: TaskFrontend | false = await createTask(task);
    return !!result;
  }
  useEffect((): void => {
    async function fetchListsAndSetInitialTask(): Promise<void> {
      const lists: ListReal[] | undefined = await getLists();
      setLists(lists);
      if (lists) {
        setInitialTask({
          title: "",
          deadline: null,
          listId: lists.some((value: ListReal): boolean => value.id === listId)
            ? listId
            : lists[0].id,
          priority: Priority.Low,
          note: null,
          done: false,
        });
      }
    }
    fetchListsAndSetInitialTask();
  }, [listId]);

  if (lists && initialTask) {
    return (
      <EditorForm
        initialValues={initialTask}
        lists={lists}
        saveAction={handleSave}
        deleteButtonVisible={false}
      />
    );
  } else {
    return <div style={{ margin: "20px" }}>Loading...</div>;
  }
}
