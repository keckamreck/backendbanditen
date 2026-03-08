"use client";

import { Sort } from "@/app/_models/list";
import { getList } from "@/app/_models/list";
import { getTasks } from "@/app/_models/list";
import { TaskCard } from "@/app/_components/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { ButtonSort } from "../_components/ButtonSort";
import { use, useState } from "react";

function List({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const initialTasks = getTasks(ListId);
  const [tasks, setTasks] = useState(initialTasks);
  const [sort, setSort] = useState<Sort>(Sort.Fälligkeitsdatum);

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sort) {
      case Sort.Fälligkeitsdatum:
        return (a.deadline?.getTime() ?? 0) - (b.deadline?.getTime() ?? 0);
      case Sort.Priorität:
        return a.priority - b.priority;
      case Sort.Alphabetisch:
        return a.title.localeCompare(b.title);
    }
  });

  return (
    <div className={styles.list}>
      <div className={styles.topBar}>
        <button
          className={styles.buttonBack}
          onClick={() => console.log("Back clicked")}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className={styles.listName}>
          <h1>{list.title}</h1>
          <button
            className={styles.buttonEdit}
            onClick={() => console.log("Edit clicked")}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>
      <div className={styles.sort}>
        <ButtonSort sort={sort} changeSort={setSort}></ButtonSort>
      </div>
      <div className={styles.tasks}>
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onPencilClick={() => console.log("Pencil clicked")}
            onDoneClick={() => {
              setTasks(
                tasks.map((t) =>
                  t.id === task.id ? { ...t, done: !t.done } : t,
                ),
              );
              console.log("Done clicked");
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return <List ListId={1} />;
}
