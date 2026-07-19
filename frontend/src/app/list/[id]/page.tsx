"use client";

import { TopBar } from "@/app/_components/TopBar";
import { Sort, ListReal } from "@/app/_models/list";
import { TaskFrontend } from "@/app/_models/task";
import { fetchApi } from "@/app/_api/fetcher";
import { TaskCard } from "@/app/_components/TaskCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons/faCirclePlus";
import styles from "./page.module.css";
import { ButtonSort } from "@/app/_components/ButtonSort";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Footer } from "@/app/_components/footer";
import { editTaskDone } from "@/app/_lib/demo"; //kommt dann von carolin

function List({ ListId }: { ListId: string }) {
  const router = useRouter();
  const [list, setList] = useState<ListReal>();
  const [tasks, setTasks] = useState<TaskFrontend[]>([]);
  const [sort, setSort] = useState<Sort>(Sort.dueDate);
  const [fadingTaskIds, setFadingTaskIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load(): Promise<void> {
      const [listResult, tasksResult] = await Promise.all([
        fetchApi<ListReal>(`/lists/${ListId}`, "GET"),
        fetchApi<TaskFrontend[]>(`/lists/${ListId}/tasks`, "GET"),
      ]);
      if (listResult && listResult !== "successful") {
        setList(listResult);
      }
      if (tasksResult && tasksResult !== "successful") {
        setTasks(
          tasksResult.map((task) => ({
            ...task,
            deadline: task.deadline ? new Date(task.deadline) : null,
          })),
        );
      }
      setLoading(false);
    }
    load();
  }, [ListId]);

  const sortedTasks = [...tasks].sort((a, b) => {
    switch (sort) {
      case Sort.dueDate:
        return (a.deadline?.getTime() ?? 0) - (b.deadline?.getTime() ?? 0);
      case Sort.priority:
        return a.priority - b.priority;
      case Sort.Alphabetisch:
        return a.title.localeCompare(b.title);
    }
  });

  if (loading || !list) {
    return <div>Loading...</div>;
  }
  return (
    <div className={styles.list}>
      <TopBar ListId={ListId}></TopBar>
      <div className={styles.up}>
        <div className={styles.sort}>
          <ButtonSort sort={sort} changeSort={setSort}></ButtonSort>
        </div>
        <button
          className={styles.buttonAdd}
          onClick={() => router.push(`/createTask/${list.id}`)}
        >
          <FontAwesomeIcon color="black" icon={faCirclePlus} />
        </button>
      </div>
      <div className={styles.tasks}>
        {sortedTasks
          .filter((task) => !task.done || fadingTaskIds.has(task.id))
          .map((task) => (
            <div
              key={task.id}
              className={fadingTaskIds.has(task.id) ? styles.fading : ""}
            >
              <TaskCard
                key={task.id}
                task={task}
                onPencilClick={() => router.push(`/editTask/${task.id}`)}
                onDoneClick={() => {
                  setFadingTaskIds((prev) => new Set(prev).add(task.id));
                  editTaskDone(task.id, true);
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
      <Footer ListId={ListId}></Footer>
    </div>
  );
}

export default function Page() {
  const parms = useParams();
  const id = parms.id as string;
  return <List ListId={id} />;
}
