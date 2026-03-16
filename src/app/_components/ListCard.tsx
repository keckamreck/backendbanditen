"use client";

import styles from "./ListCard.module.css";
import { List } from "@/app/_models/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as emptyStar,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Link from "next/link";
import { getTasks, updateListCategory, updateListisFavourite } from "../_lib/demo";
import CategoryPopup from "./CategoryPopup";
import { getTaskofList } from "../_lib/demo";
export interface ListProps {
  list: List;
  onToggleFavorite?: (updatedList: List) => void;
}

export function ListCard({ list, onToggleFavorite }: ListProps) {
  const dueTasks = getTaskofList(list.id).filter((task) => !task.done);
  const [currentList, setCurrentList] = useState(list);
  const [isFavourite, setIsFavorite] = useState(
    currentList.isFavourite ?? false,
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const toggleFavorite = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const nextState = !isFavourite;
    setIsFavorite(nextState);

    if (onToggleFavorite) {
      updateListisFavourite(currentList.id, nextState);
      onToggleFavorite({ ...currentList, isFavourite: nextState });
    }
  };

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopupOpen(true);
  };

  const handleSaveCategory = (newCategory: string) => {
    updateListCategory(currentList.id, newCategory);
    setCurrentList({ ...currentList, category: newCategory });
  };

  return (
    <>
      <Link href={"/list/" + currentList.id} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.topRow}>
            <p className={styles.title}>{currentList.title}</p>
            <FontAwesomeIcon
              className={styles.starIcon}
              icon={isFavourite ? filledStar : emptyStar}
              onClick={toggleFavorite}
            />
          </div>
          <div className={styles.categoryRow}>
            {!currentList.category && (
              <FontAwesomeIcon
                className={styles.flagIcon}
                icon={faFlag}
                onClick={openPopup}
              />
            )}
            {currentList.category && (
              <p className={styles.category} onClick={openPopup}>
                {" "}
                {currentList.category}
              </p>
            )}
          </div>
          <div className={styles.row}>
            <h1 className={styles.taskAmount}>{dueTasks.length}</h1>
            <p className={styles.dueTasks}>noch fällig</p>
          </div>
        </div>
      </Link>
      {isPopupOpen && (
        <CategoryPopup
          initialValue={currentList.category || ""}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveCategory}
        />
      )}
    </>
  );
}
