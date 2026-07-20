"use client";

import { TaskFrontend } from "@/app/_models/task";
import { getTasksForList, editTask, deleteTask } from "@/app/_api/tasks-api";
import { TaskCard } from "@/app/_components/TaskCard";
import { DeleteButton } from "@/app/_components/ButtonsIcon";
import { TopBarArchive } from "@/app/_components/TopBarArchive";
import { Modal } from "@/app/_components/modal";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { getListById } from "@/app/_api/lists-api";
import { ListReal } from "@/app/_models/list";

export default function ArchivePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const ListId = params.id;
  const [list, setList] = useState<ListReal>();
  const [tasks, setTasks] = useState<TaskFrontend[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function load(): Promise<void> {
      const [listResult, tasksResult] = await Promise.all([
        getListById(ListId),
        getTasksForList(ListId, true),
      ]);
      if (listResult) {
        setList(listResult);
      }
      if (tasksResult) {
        setTasks(tasksResult);
      }
      setLoading(false);
    }
    load();
  }, [ListId]);

  async function handleUndone(TaskId: string) {
    const result = await editTask(TaskId, { done: false });
    if (result) {
      setTasks((prev) => prev.filter((t) => t.id !== TaskId));
    }
  }

  async function handleDelete() {
    const results = await Promise.all(tasks.map((t) => deleteTask(t.id)));
    const remaining = tasks.filter((_, i) => !results[i]);
    setTasks(remaining);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function handleConfirm() {
    await handleDelete();
    setShowModal(!showModal);
  }
  if (loading || !list) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <TopBarArchive title={list.title} id={list.id} />
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onPencilClick={() => router.push(`/editTask/${task.id}`)}
            onDoneClick={() => {
              handleUndone(task.id);
            }}
          />
        ))}
      </div>
      <DeleteButton className={styles.buttonDelete} onClick={toggleModal} />
      {showModal && (
        <Modal
          onClose={toggleModal}
          onConfirm={handleConfirm}
          title="Möchten Sie alle erledigten Aufgaben wirklich löschen?"
          yes="Ja"
          no="Nein"
        />
      )}
    </>
  );
}
