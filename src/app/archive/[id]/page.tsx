"use client";

import { getTaskofList } from "@/app/_models/function";
import { getList } from "@/app/_models/function";
import { Task } from "@/app/_models/task";
import { TaskCard } from "@/app/_components/TaskCard";
import { ArchiveButton, DeleteButton } from "@/app/_components/button";
import { Header } from "@/app/_components/list";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./page.module.css";

export default function ArchivePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const list = getList(id);
  const [tasks, deleteTasks] = useState(getTaskofList(list.id));

  function handleDelete() {
    deleteTasks([]);
  }

  return (
    <>
      <Header title={list.title}>
        <ArchiveButton onClick={handleDelete} />
      </Header>
      {showTasks(tasks)}
      <DeleteButton className={styles.buttonDelete} onClick={handleDelete} />
    </>
  );
}

function showTasks(tasks: Task[]) {
  return tasks.map((task) => {
    return (
      <TaskCard
        key={task.id}
        task={task}
        onPencilClick={() => console.log("Pencil clicked")}
        onDoneClick={() =>
          (task.done = !task.done) && console.log("Done clicked " + task.done)
        }
      />
    );
  });
}
