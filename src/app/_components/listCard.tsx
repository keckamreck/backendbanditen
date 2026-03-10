"use client";

import styles from "./listCard.module.css";
import { List } from "@/app/_models/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar} from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { getTasks } from "../_lib/demo";
export interface ListProps {
  list: List;
  onToggleFavorite?: (updatedList: List) => void;
}

export function ListCard({ list, onToggleFavorite }: ListProps) {

  const dueTasks = getTasks(list.id)

  const [isFavourite, setIsFavorite] = useState(list.isFavourite ?? false);

  const toggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const nextState = !isFavourite; 
    setIsFavorite(nextState);

    if (onToggleFavorite) {
      onToggleFavorite({ ...list, isFavourite: nextState });
    }
  };

  return (
    <Link href={'/dashboard/'} className={styles.link} >
    <div className={styles.card}>
      <div className={styles.topRow}>
        <p className={styles.title}>
          {list.title}
        </p>
        <FontAwesomeIcon className={styles.starIcon} icon={isFavourite? filledStar : emptyStar} onClick={toggleFavorite}/>
      </div>
      <div className={styles.row}>
        <h1 className={styles.taskAmount}>
          {dueTasks}
        </h1>
        <p className={styles.dueTasks}>
          noch fällig
        </p>
      </div>
    </div>
    </Link>
  );
}
