import { Task } from '@/app/_models/task';
import { getPriority } from '@/app/_lib/priority';
import styles from './card.module.css'

export function renderTask(task: Task) {
  return (
    <div key={task.id} className={styles.container}>
      <div className={styles.card}>
        <h1>{task.title}</h1>
        <h4>{task.id}</h4>
        <h3>{getPriority(task.priority)} Priority</h3>
      </div>
    </div>
  );
}