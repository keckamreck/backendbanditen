import styles from "./buttonsEditor.module.css";
import { Priority } from "@/app/_models/task";
import { Dispatch, SetStateAction, useState } from "react";

type PropsPriority = {
  className?: string;
  action: Dispatch<SetStateAction<Priority>>;
  defaultValue: Priority;
};
type PropsButton = {
  className?: string;
  action?: () => void;
  disabled?: boolean;
  task: "save" | "delete";
  typeOfButton: "submit" | "button";
};

export function PriorityButton({
  className,
  action,
  defaultValue,
}: PropsPriority) {
  const [lowActive, setLowActive] = useState<"lowFocus" | "">(
    defaultValue === Priority.Low ? "lowFocus" : "",
  );
  const [mediumActive, setMediumActive] = useState<"mediumFocus" | "">(
    defaultValue === Priority.Medium ? "mediumFocus" : "",
  );
  const [highActive, setHighActive] = useState<"highFocus" | "">(
    defaultValue === Priority.High ? "highFocus" : "",
  );

  function setPriority(priority: string): void {
    if (priority === "Low") {
      action(Priority.Low);
      setLowActive("lowFocus");
      setMediumActive("");
      setHighActive("");
    } else if (priority === "Medium") {
      action(Priority.Medium);
      setLowActive("");
      setMediumActive("mediumFocus");
      setHighActive("");
    } else if (priority === "High") {
      action(Priority.High);
      setLowActive("");
      setMediumActive("");
      setHighActive("highFocus");
    }
  }

  return (
    <div className={className}>
      <button
        type="button"
        className={`${styles.low} ${styles.priority} ${styles[lowActive]}`}
        onClick={(): void => setPriority("Low")}
      >
        niedrig
      </button>
      <button
        type="button"
        className={`${styles.medium} ${styles.priority} ${styles[mediumActive]}`}
        onClick={(): void => setPriority("Medium")}
      >
        mittel
      </button>
      <button
        type="button"
        className={`${styles.high} ${styles.priority} ${styles[highActive]}`}
        onClick={(): void => setPriority("High")}
      >
        hoch
      </button>
    </div>
  );
}
export function Button({
  className,
  disabled,
  task,
  typeOfButton,
  action,
}: PropsButton) {
  return (
    <button
      className={`${styles[task]} ${styles.button} ${className}`}
      onClick={(): void => {
        if (action !== undefined) {
          action();
        }
      }}
      type={typeOfButton}
      disabled={disabled}
    >
      {task === "save" ? "speichern" : "löschen"}
    </button>
  );
}
