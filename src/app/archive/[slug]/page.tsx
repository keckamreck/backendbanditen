"use client";

import { Group, getGroup } from '@/app/_models/group';
import { renderTask } from '@/app/_components/card';
import { DeleteButton } from '@/app/_components/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css'

export default function ArchivePage()
{
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const group = getGroup(slug);
  const [tasks, deleteTasks] = useState(getTasks(group));

  function handleDelete()
  {
    deleteTasks([]);
  }

  return (
    <>
      <h1>Group: {group.title}</h1>
      {tasks}
      <DeleteButton onClick={handleDelete}/>
    </>
  );
}

function getTasks(group: Group)
{
  return group.entries.map(task => {
    return renderTask(task);
  });
}