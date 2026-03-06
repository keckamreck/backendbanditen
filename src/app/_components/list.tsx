"use client";

import styles from './list.module.css'

export interface HeaderProps {
  title: string,
  children: any
};

export function Header(props: HeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>{props.title}</h1>
        {props.children}
      </div>
    </div>
  );
}