"use client";

import { TopBar } from "@/app/_components/TopBar";
import { Sort } from "@/app/_models/list";
import { getList } from "@/app/_models/list";
import { getTaskofList } from "@/app/_models/task";
import { TaskCard } from "@/app/_components/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
// import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { ButtonSort } from "@/app/_components/ButtonSort";
import { use, useState } from "react";

function List({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const initialTasks = getTaskofList(ListId);
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
      <TopBar ListId={ListId}></TopBar>
      <div className={styles.up}>
        <div className={styles.sort}>
          <ButtonSort sort={sort} changeSort={setSort}></ButtonSort>
        </div>
        <button
          className={styles.buttonAdd}
          onClick={() => console.log("new task")}
        >
          <FontAwesomeIcon icon={faCirclePlus} />
        </button>
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
