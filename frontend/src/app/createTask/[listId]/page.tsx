"use client";

import EditorForm from "@/app/_components/EditorForm";
import { getLists } from "@/app/_api/lists-api";
import {
  Priority,
  TaskFrontend,
  TaskFrontendWithoutId,
} from "@/app/_models/task";
import { List } from "@/app/_models/list";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createTask } from "@/app/_api/tasks-api";

export default function Page() {
  const router = useRouter();
  const { listId }: { listId: string } = useParams<{ listId: string }>();
  const [lists, setLists] = useState<List[]>();
  const [initialTask, setInitialTask] = useState<TaskFrontendWithoutId>();

  async function handleSave(
    task: TaskFrontendWithoutId,
  ): Promise<true | false> {
    const result: TaskFrontend | false = await createTask(task);
    return !!result;
  }
  useEffect((): void => {
    async function fetchListsAndSetInitialTask(): Promise<void> {
      const lists: List[] | undefined = await getLists();
      setLists(lists);
      if (lists) {
        setInitialTask({
          title: "",
          deadline: null,
          listId: lists.some((value: List): boolean => value.id === listId)
            ? listId
            : lists[0].id,
          priority: Priority.Low,
          note: null,
          done: false,
        });
      } else {
        router.back();
      }
    }
    fetchListsAndSetInitialTask();
  }, [listId, router]);

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
