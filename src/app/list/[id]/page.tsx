"use client";

import { TopBar } from "@/app/_components/TopBar";
import { Sort } from "@/app/_models/list";
import { getList } from "@/app/_models/function";
import { getTaskofList } from "@/app/_models/function";
import { TaskCard } from "@/app/_components/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
// import { faX } from "@fortawesome/free-solid-svg-icons";
import styles from "./page.module.css";
import { ButtonSort } from "@/app/_components/ButtonSort";
import { useState } from "react";
import { useParams } from "next/navigation";
import { DeleteButton } from "@/app/_components/button";

function List({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const initialTasks = getTaskofList(ListId);
  const [tasks, setTasks] = useState(initialTasks);
  const [sort, setSort] = useState<Sort>(Sort.Fälligkeitsdatum);
  const [fadingTaskIds, setFadingTaskIds] = useState<Set<number>>(new Set());

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
        {sortedTasks
          // .filter((task) => !task.done)
          .filter((task) => !task.done || fadingTaskIds.has(task.id))
          .map((task) => (
            <div
              key={task.id}
              className={fadingTaskIds.has(task.id) ? styles.fading : ""}
            >
              <TaskCard
                key={task.id}
                task={task}
                onPencilClick={() => console.log("Pencil clicked")}
                onDoneClick={() => {
                  setFadingTaskIds((prev) => new Set(prev).add(task.id));
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === task.id ? { ...t, done: true } : t,
                    ),
                  );
                  setTimeout(() => {
                    setFadingTaskIds((prev) => {
                      const next = new Set(prev);
                      next.delete(task.id);
                      return next;
                    });
                  }, 1500);
                }}
              />
            </div>
          ))}
      </div>
      <DeleteButton className={styles.buttonDelete}></DeleteButton>
    </div>
  );
}

export default function Page() {
  const parms = useParams();
  const id = parms.id;
  return <List ListId={Number(id)} />;
}
