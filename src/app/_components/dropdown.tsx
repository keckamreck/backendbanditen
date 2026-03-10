import styles from "./dropdown.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  values: Array<string>;
  action: Dispatch<SetStateAction<string>>;
  selectedValue: string;
};

export default function Dropdown({ values, action, selectedValue }: Props) {
  const [selectedElement, setSelectedElement] = useState<string>(selectedValue);

  useEffect((): void => {
    setSelectedElement(selectedValue);
  }, [selectedValue]);

  function getClassForElement(item: string): string {
    if (item === selectedElement) {
      return styles.selectedElement;
    } else {
      return styles.listElement;
    }
  }

  return (
    <div className={styles.dropdown}>
      {values.map((item, index) => (
        <button
          className={getClassForElement(item)}
          key={index}
          onClick={() => {
            setSelectedElement(item);
            action(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
