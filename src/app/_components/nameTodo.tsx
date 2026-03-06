import { ChangeEvent } from "react";
import styles from "./nameTodo.module.css";

type Props = {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function NameTodo({ value, onChange }: Props) {
  return (
    <>
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}
