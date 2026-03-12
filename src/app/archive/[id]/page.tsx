'use client';

import { getList, getTaskofList } from '@/app/_models/function';
import { Task } from '@/app/_models/task';
import { TaskCard } from '@/app/_components/TaskCard';
import { DeleteButton } from '@/app/_components/button';
import { TopBarArchive } from '@/app/_components/TopBarArchive';
import { Modal } from '@/app/_components/modal';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import styles from './page.module.css';

export default function ArchivePage() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  const list = getList(id);
  const [tasks, handleTasks] = useState(getTaskofList(list.id));
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    handleTasks([]);
  }

  function handleDone(id: number) {
    handleTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleConfirm() {
    handleDelete();
    toggleModal();
  }

  return (
    <>
      <TopBarArchive title={list.title} id={list.id}/>
      <div className={styles.tasks}>
        {showTasks(tasks, handleDone)}
      </div>
      <DeleteButton className={styles.buttonDelete} onClick={toggleModal}/>
      {showModal &&
        <Modal
          onClose={toggleModal}
          onConfirm={handleConfirm}
          title='Are you sure?'
          yes='Yes'
          no='No'
        />
      }
    </>
  );
}

function showTasks(tasks: Task[], handler: (id: number) => void) {
  return tasks.map((task) => {
    return (
      <TaskCard
        key={task.id}
        task={task}
        onPencilClick={() => console.log("Pencil clicked")}
        onDoneClick={() => { handler(task.id) }}
      />
    );
  });
}
