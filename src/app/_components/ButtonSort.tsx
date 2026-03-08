"use client";

import styles from "./ButtonSort.module.css";
import { Sort } from "@/app/_models/list";

const sortValues = Object.values(Sort);

interface ButtonSortProps {
  sort: Sort;
  changeSort: (sort: Sort) => void;
}

export function ButtonSort({ sort, changeSort }: ButtonSortProps) {
  function nextSort() {
    const index = sortValues.indexOf(sort);
    changeSort(sortValues[(index + 1) % sortValues.length]);
  }

  return (
    <div>
      <button className={styles.button} onClick={nextSort}>
        <span> Sortiert nach: </span>
        <span>{sort}</span>
      </button>
    </div>
  );
}
