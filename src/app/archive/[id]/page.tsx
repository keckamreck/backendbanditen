"use client";

import { List, getList, getTasks } from '@/app/_models/list';
import { TaskCard } from '@/app/_components/card';
import { DeleteButton } from '@/app/_components/button';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css'

export default function ArchivePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const list = getList(id);
  const [tasks, deleteTasks] = useState(getTasks(list));

  function handleDelete() {
    deleteTasks([]);
  }

  return (
    <>
      <h1>List: {list.title}</h1>
      {tasks}
      <DeleteButton onClick={handleDelete}/>
    </>
  );
}

function getTasks(list: List) {
  return list.entries.map(task => {
    return <TaskCard key={task.id} task={task}/>;
  });
}