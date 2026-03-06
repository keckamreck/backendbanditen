"use client";

import styles from "./page.module.css";
import { NameTodo } from "../_components/nameTodo";
import { ChangeEvent, useState } from "react";

export default function page() {
  const [title, setTitle] = useState("");

  return (
    <form className={styles.form}>
      <label htmlFor="title"></label>
      <NameTodo
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
      />
      <div className={`${styles.bodyForm} ${styles.dflexCol}`}>
        <label>Fälligkeit:</label>
        <div className={styles.dflexRow}>
          <div className={styles.dflexCol}>
            <label htmlFor="date">Datum: </label>
            <input
              className={styles.input}
              id="date"
              name="date"
              type="date"
            ></input>
          </div>
          <div className={styles.dflexCol}>
            <label htmlFor="time">Uhrzeit: </label>
            <input
              className={styles.input}
              id="time"
              name="time"
              type="time"
            ></input>
          </div>
        </div>
        <div className={`${styles.list} ${styles.dflexRow}`}>
          <label htmlFor="list">Liste </label>
          <select
            className={`${styles.selectList} ${styles.input}`}
            id="list"
            name="list"
          ></select>
        </div>
        <label htmlFor="notes">Notizen </label>
        <textarea
          className={styles.input}
          id="notes"
          name="notes"
          rows={5}
        ></textarea>
      </div>
    </form>
  );
}
