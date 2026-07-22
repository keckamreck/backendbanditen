"use client";

import styles from "./ListCard.module.css";
import { List } from "@/app/_models/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as emptyStar,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { updateList } from "../_api/lists-api";
import CategoryPopup from "./CategoryPopup";
import { getNumberOfTasks } from "../_api/tasks-api";
import { CategoryFrontend } from "../_models/category";
export interface ListProps {
  list: List;

  category: CategoryFrontend | null;

  allCategories: CategoryFrontend[] | null;
  onToggleFavorite?: (updatedList: List) => void;

  onCategoryChange?: (updatedList: List) => void;

  onCategoryCreated?: () => void;
}

export function ListCard({
  list,
  category,
  allCategories,
  onToggleFavorite,
  onCategoryChange,
  onCategoryCreated,
}: ListProps) {
  const [dueTasks, setdueTasks] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSaveCategory = async (
    newCategory: CategoryFrontend | undefined,
  ) => {
    const updatedList = { ...list, categoryId: newCategory?.id };
    await updateList(list.id, { categoryId: newCategory?.id });
    onCategoryChange?.(updatedList);
    if(newCategory && !allCategories?.some(cat => cat.id === newCategory.id)){
      onCategoryCreated?.();
    }
    setIsPopupOpen(false);
  };

  //Anzahl an Tasks wird geladen
  useEffect(() => {
let isMounted = true;

    async function loadDueTasks() {
      const numberOfDueTasks: number = await getNumberOfTasks(list.id);
      if(isMounted){
      setdueTasks(numberOfDueTasks);
    }}

    loadDueTasks();

    return () => {
      isMounted = false; // Verhindert State-Update auf nicht mehr aktiven Komponenten
    };
  }, [list.id]);

  const toggleFavorite = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const nextValue = !(list.isFavorite ?? false);
    const updatedList = { ...list, isFavorite: nextValue };

    await updateList(list.id, { isFavorite: nextValue });
    onToggleFavorite?.(updatedList);
  };

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <>
      <Link href={"/list/" + list.id} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.topRow}>
            <p className={styles.title}>{list.title}</p>
            <FontAwesomeIcon
              className={styles.starIcon}
              icon={list.isFavorite ? filledStar : emptyStar}
              onClick={toggleFavorite}
            />
          </div>
          <div className={styles.categoryRow}>
            {!category?.id && (
              <FontAwesomeIcon
                className={styles.flagIcon}
                icon={faFlag}
                onClick={openPopup}
              />
            )}
            {category?.id && (
              <p className={styles.category} onClick={openPopup}>
                {category.name}
              </p>
            )}
          </div>
          <div className={styles.row}>
            <h1 className={styles.taskAmount}>{dueTasks}</h1>
            <p className={styles.dueTasks}>offene Tasks</p>
          </div>
        </div>
      </Link>
      {isPopupOpen && (
        <CategoryPopup
          initialValue={category}
          loadedCategories={allCategories}
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveCategory}
        />
      )}
    </>
  );
}
