import { PriorityBadge } from './badge';
import { Task } from '@/app/_models/task';
import { getDate, getTime } from '@/app/_lib/helpers';
import styles from './card.module.css'

export interface TaskProps {
  task: Task;
}

export function TaskCard(props: TaskProps) {
  const task = props.task;
  const date = getDate(task.deadline);
  const time = getTime(task.deadline);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.row}>
          <h1>{task.title}</h1>
          <h4>{task.id}</h4>
        </div>
        <div className={styles.row}>
          <h3>Fällig am {date} um {time}</h3>
          <PriorityBadge priority={task.priority}/> 
        </div>
      </div>
    </div>
  );
}