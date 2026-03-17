"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { PriorityBadge } from "@/app/_components/PriorityBadge";
import { Task } from "@/app/_models/task";
import styles from "./TaskCard.module.css";

export interface TaskProps {
  task: Task;
  onPencilClick: () => void;
  onDoneClick: () => boolean | void;
}

export function TaskCard(props: TaskProps) {
  const task = props.task;
  const deadlineDate = task.deadline
    ? task.deadline.toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
      })
    : null;
  const deadlineTime = task.deadline
    ? task.deadline.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;
  const deadline =
    deadlineDate && deadlineTime ? `${deadlineDate}, ${deadlineTime}` : null;
  return (
    <div className={styles.container}>
      <div className={styles.check}>
        <button id="ButtonDone" onClick={props.onDoneClick}>
          <FontAwesomeIcon
            color="black"
            icon={task.done ? faCheckCircle : faCircle}
          />
        </button>
      </div>
      <div className={styles.card}>
        <h1>{task.title}</h1>
        <button
          id="ButtonEditTask"
          className={styles.buttonEdit}
          onClick={props.onPencilClick}
        >
          <FontAwesomeIcon color="black" icon={faPencil} />
        </button>
        <div className={styles.row}>
          <h3>{deadline}</h3>
          <PriorityBadge priority={task.priority} />
        </div>
      </div>
    </div>
  );
}
