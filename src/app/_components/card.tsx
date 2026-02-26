import { Task } from "../_models/task";
import { getPriority } from "../_lib/priority";
import styles from './card.module.css'

export function renderTask(task: Task) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h1>{task.title}</h1>
          <h4>{task.id}</h4>
          <h3>{getPriority(task.priority)} Priority</h3>
        </div>
      </div>
    </>
  );
}