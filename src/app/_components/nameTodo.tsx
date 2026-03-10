import { ChangeEvent } from "react";
import styles from "./nameTodo.module.css";

type Props = {
  className?: string;
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};

export function NameTodo({ className, value, onChange }: Props) {
  return (
    <>
      <input
        className={`${styles.input} ${className}`}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </>
  );
}
