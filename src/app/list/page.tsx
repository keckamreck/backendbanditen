"use client";

import { getList } from "@/app/_models/list";
import { getTasks } from "@/app/_models/list";
import { TaskCard } from "@/app/_components/card";
import styles from "./page.module.css";
import { use } from "react";

function List({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const tasks = getTasks(ListId);
  return (
    <div className={styles.list}>
      <h1>{list.title}</h1>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          // <TaskCard key={task.id} task={task} />
          <TaskCard
            key={task.id}
            task={task}
            onPencilClick={() => console.log("Pencil clicked")}
            onDoneClick={() => console.log("Done clicked")}
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return <List ListId={1} />;
}
