"use client";

import { getList, getDoneTasks } from "@/app/_lib/demo";
import { deleteTasks, editTaskDone } from "@/app/_lib/demo";
import { Task } from "@/app/_models/task";
import { TaskCard } from "@/app/_components/TaskCard";
import { DeleteButton } from "@/app/_components/ButtonsIcon";
import { TopBarArchive } from "@/app/_components/TopBarArchive";
import { Modal } from "@/app/_components/modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function ArchivePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const list = getList(id);
  const [tasks, handleTasks] = useState(getDoneTasks(list.id));
  const [showModal, setShowModal] = useState(false);

  function showTasks(tasks: Task[]) {
    return tasks.map((task) => {
      return (
      <TaskCard
        key={task.id}
        task={task}
        onPencilClick={() => router.push(`/editTask/${task.id}`)}
        onDoneClick={() => {
          editTaskDone(task.id, false);
          handleTasks(getDoneTasks(list.id));
        }}
      />
    );
  });
  }

  function handleDelete() {
    handleTasks([]);
    deleteTasks(list.id);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleConfirm() {
    handleDelete();
    toggleModal();
  }

  return (
    <>
      <TopBarArchive title={list.title} id={list.id} />
      <div className={styles.tasks}>
        {showTasks(tasks)}
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