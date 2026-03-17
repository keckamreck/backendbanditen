import { Priority } from '@/app/_models/task';
import { getPriority, getColor } from '@/app/_lib/priority';
import styles from './PriorityBadge.module.css'

export interface PriorityBadgeProps {
  priority: Priority;
}

export function PriorityBadge(props: PriorityBadgeProps) {
  const priority = props.priority;
  const color = getColor(priority);
  const text = getPriority(priority);

  return (
    <span style={{ backgroundColor: color}} className={styles.badge}>{text}</span>
  );
}