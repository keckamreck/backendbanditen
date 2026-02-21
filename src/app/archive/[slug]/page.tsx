import { getGroup } from "../../_lib/group";
import { getPriority } from "../../_lib/priority";
import { Group } from ".../_types/group.ts";
import { Task } from ".../_types/task.ts";
import styles from './page.module.css'

export function generateStaticParams() {
  return [{ slug: "basic" }, { slug: "sports" }, { slug: "school" }]
}

export default async function ArchiveGroup({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const group = getGroup(slug);
  const listTasks = group.data.map(task => {
    return renderTask(task);
  });

  return (
    <>
      <h1>Group: {group.title}</h1>
      {listTasks}
    </>
  );
}

function renderTask(task: Task) {
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