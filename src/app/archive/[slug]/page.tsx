import { getGroup } from '@/app/_models/group';
import { renderTask } from '@/app/_components/card';
import styles from './page.module.css'

export default async function ArchiveGroup({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const group = getGroup(slug);
  const listTasks = group.entries.map(task => {
    return renderTask(task);
  });

  return (
    <>
      <h1>Group: {group.title}</h1>
      {listTasks}
    </>
  );
}

