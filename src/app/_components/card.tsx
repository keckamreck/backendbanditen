import { PriorityBadge } from './badge';
import { Task } from '@/app/_models/task';
import { getPriority } from '@/app/_lib/priority';
import styles from './card.module.css'

export interface TaskProps {
  task: Task;
}

export function TaskCard(props: TaskProps) {
  const task = props.task;
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.row}>
          <h1>{task.title}</h1>
          <h4>{task.id}</h4>
        </div>
        <div className={styles.row}>
          <h3>Fällig am {task.date.toLocaleDateString()}</h3>
          <PriorityBadge priority={task.priority}/> 
        </div>
      </div>
    </div>
  );
}