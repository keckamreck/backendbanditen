import styles from "./Buttons.module.css";

interface ButtonProps {
  className?: string;
  onClickAction?: () => void;
  disabled: boolean;
  text: string;
  styleType: "save" | "delete" | "yes" | "no";
  buttonType: "submit" | "button";
}

export function Button({
  className,
  disabled,
  text,
  styleType,
  buttonType,
  onClickAction,
}: ButtonProps) {
  return (
    <button
      className={`${styles[styleType]} ${styles.button} ${className ?? ""}`}
      onClick={(): void => {
        if (onClickAction !== undefined) {
          onClickAction();
        }
      }}
      type={buttonType}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
