import { ChangeEvent } from "react";
import styles from "./NameTask.module.css";

interface NameTaskProps {
  className?: string;
  value?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

export function NameTask({ className, value, onChange }: NameTaskProps) {
  return (
    <input
      className={`${styles.input} ${className}`}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={"Titel"}
    ></input>
  );
}
