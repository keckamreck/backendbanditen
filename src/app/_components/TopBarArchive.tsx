"use client";

import { ArchiveButton, ChevronButton } from './button';
import styles from './TopBarArchive.module.css'

export interface TopBarArchiveProps {
  title: string
};

export function TopBarArchive(props: TopBarArchiveProps) {
  return (
    <div className={styles.container}>
      <ChevronButton/>
      <div className={styles.card}>
        <h1>{props.title}</h1>
        <ArchiveButton/>
      </div>
    </div>
  );
}