import styles from "./page.module.css";

export default function page() {
  return (
    <form className={styles.form}>
      <label htmlFor="title"></label>
      <input
        className={styles.input}
        id="title"
        name="title"
        type="text"
      ></input>
      <div>
        <input type="checkbox" id="check"></input>
        <label htmlFor="deadline">Fälligkeitsdatum</label>
      </div>
      <input
        className={styles.input}
        id="deadline"
        name="deadline"
        type="date"
      ></input>
      <div className={`${styles.list} ${styles.input}`}>
        <label htmlFor="list">Liste </label>
        <select className={styles.selectList} id="list" name="list"></select>
      </div>
      <label htmlFor="notes">Notizen </label>
      <textarea
        className={styles.input}
        id="notes"
        name="notes"
        rows={5}
      ></textarea>
    </form>
  );
}
