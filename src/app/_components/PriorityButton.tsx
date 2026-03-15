import styles from "./PriorityButton.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import { Priority } from "@/app/_models/task";

type PriorityButtonProps = {
  className?: string;
  onChangePriorityAction: Dispatch<SetStateAction<Priority>>;
  defaultValue: Priority;
};

const priorities: Priority[] = [Priority.Low, Priority.Medium, Priority.High];

export function PriorityButton({
  className,
  onChangePriorityAction,
  defaultValue,
}: PriorityButtonProps) {
  const [selectedPriority, setSelectedPriority] =
    useState<Priority>(defaultValue);

  function setPriority(priority: Priority): void {
    setSelectedPriority(priority);
    onChangePriorityAction(priority);
  }

  function getButtonText(priority: Priority): string {
    switch (priority) {
      case Priority.Low:
        return "niedrig";
      case Priority.High:
        return "hoch";
      default:
        return "mittel";
    }
  }

  function getButtonClassName(priority: Priority): string {
    switch (priority) {
      case Priority.Low:
        return styles.low;
      case Priority.Medium:
        return styles.medium;
      case Priority.High:
        return styles.high;
      default:
        return "";
    }
  }

  function getButtonFocusClassName(priority: Priority): string {
    if (priority === selectedPriority) {
      return styles.focus;
    }
    return "";
  }

  return (
    <div className={className}>
      {priorities.map((priority: Priority) => (
        <button
          key={priority}
          type="button"
          className={`${styles.button} ${getButtonClassName(priority)} ${getButtonFocusClassName(priority)}`}
          onClick={(): void => {
            setPriority(priority);
          }}
        >
          {getButtonText(priority)}
        </button>
      ))}
    </div>
  );
}
