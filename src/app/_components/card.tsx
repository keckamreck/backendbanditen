import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { PriorityBadge } from "./badge";
import { Task } from "@/app/_models/task";
import { getPriority } from "@/app/_lib/priority";
import styles from "./card.module.css";

export interface TaskProps {
  task: Task;
}

export function TaskCard(props: TaskProps) {
  const task = props.task;
  return (
    <div className={styles.container}>
      <div className={styles.check}>
        <FontAwesomeIcon icon={faCircle} />
        <FontAwesomeIcon icon={faCheckCircle} />
      </div>
      <div className={styles.card}>
        <h1>{task.title}</h1>
        <button className={styles.buttonEdit}>
          <FontAwesomeIcon icon={faPencil} />
        </button>
        <div className={styles.row}>
          <h3>Fällig am {task.deadline?.toLocaleDateString()}</h3>
          <PriorityBadge priority={task.priority} />
        </div>
      </div>
    </div>
  );
}
