import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { PriorityBadge } from "./badge";
import { Task } from "@/app/_models/task";
import styles from "./TaskCard.module.css";

export interface TaskProps {
  task: Task;
  onPencilClick: () => void;
  onDoneClick: () => boolean | void;
}

export function TaskCard(props: TaskProps) {
  const task = props.task;
  return (
    <div className={styles.container}>
      <div className={styles.check}>
        <button onClick={props.onDoneClick}>
          <FontAwesomeIcon icon={task.done ? faCheckCircle : faCircle} />
        </button>
      </div>
      <div className={styles.card}>
        <h1>{task.title}</h1>
        <button className={styles.buttonEdit} onClick={props.onPencilClick}>
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
