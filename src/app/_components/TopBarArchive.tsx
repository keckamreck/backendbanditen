"use client";

import { ArchiveButton, ChevronButton } from './button';
import { useRouter } from 'next/navigation';
import styles from './TopBarArchive.module.css'

export interface TopBarArchiveProps {
  title: string,
  id: number
};

export function TopBarArchive(props: TopBarArchiveProps) {
  const router = useRouter();

  const handleChevron = () => {
    router.push(`/list/${props.id}`);
  };

  return (
    <div className={styles.container}>
      <ChevronButton onClick={() => handleChevron()}/>
      <div className={styles.card}>
        <h1>{props.title}</h1>
        <ArchiveButton/>
      </div>
    </div>
  );
}