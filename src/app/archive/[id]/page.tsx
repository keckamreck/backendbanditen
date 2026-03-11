"use client";

import { getList, getTaskofList } from "@/app/_models/function";
import { Task } from "@/app/_models/task";
import { TaskCard } from "@/app/_components/TaskCard";
import { DeleteButton } from "@/app/_components/button";
import { TopBarArchive } from "@/app/_components/TopBarArchive";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function ArchivePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const list = getList(id);
  const [tasks, handleTasks] = useState(getTaskofList(list.id));

  function handleDelete() {
    handleTasks([]);
  }

  function handleDone(id: number) {
    handleTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  return (
    <>
      <TopBarArchive title={list.title} id={list.id} />
      <div className={styles.tasks}>
        {showTasks(tasks, handleDone)}
      </div>
      <DeleteButton className={styles.buttonDelete} onClick={handleDelete} />
    </>
  );
}

function showTasks(tasks: Task[], handler: any) {
  return tasks.map((task) => {
    return (
      <TaskCard
        key={task.id}
        task={task}
        onPencilClick={() => console.log("Pencil clicked")}
        onDoneClick={() => { handler(task.id) }}
      />
    );
  });
}
