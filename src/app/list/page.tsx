"use client";

import { getList } from "@/app/_models/list";
import { getTasks } from "@/app/_models/list";
import { TaskCard } from "@/app/_components/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { use } from "react";

function List({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const tasks = getTasks(ListId);
  return (
    <div className={styles.list}>
      <div className={styles.topBar}>
        <button className={styles.buttonBack}>
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className={styles.listName}>
          <h1>{list.title}</h1>
          <button className={styles.buttonEdit}>
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onPencilClick={() => console.log("Pencil clicked")}
            onDoneClick={() =>
              (task.done = !task.done) &&
              console.log("Done clicked " + task.done)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return <List ListId={1} />;
}
