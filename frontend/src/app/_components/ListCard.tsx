"use client";

import styles from "./ListCard.module.css";
import { ListReal } from "@/app/_models/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as emptyStar,
  faFlag,
} from "@fortawesome/free-regular-svg-icons";
import { faStar as filledStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { updateList } from "../_api/lists-api";
import CategoryPopup from "./CategoryPopup";
import { getNumberOfTasks } from "../_api/tasks-api";
import { CategoryFrontend } from "../_models/category";
import { getCategoryById } from "../_api/categories-api";
export interface ListProps {
  list: ListReal;

  category: CategoryFrontend | null;
    onToggleFavorite?: (updatedList: ListReal) => void;
}

export function ListCard({ list, category, onToggleFavorite }: ListProps) {
  const [dueTasks, setdueTasks] = useState<number>(0);
  const [currentList, setCurrentList] = useState(list);
  const [categoryName, setCategoryName] = useState<string  | undefined>(category ? category.name : undefined)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const categoryRef = useRef(false);

  const handleSaveCategory = (newCategory: CategoryFrontend | undefined) => {
    if (newCategory) {
      setCurrentList({ ...currentList, categoryId: newCategory.id });
      setCategoryName(newCategory.name);
    } else {
      setCurrentList({ ...currentList, categoryId: undefined });
      setCategoryName(undefined);
    }
  };

    //Anzahl an Tasks wird geladen
  useEffect(() => {  
    async function loadDueTasks(){
      const numberOfDueTasks: number = await getNumberOfTasks(list.id);
      setdueTasks(numberOfDueTasks);
    }

    loadDueTasks();
  }, [list.id]);

  useEffect(() => {
    setCurrentList(list);
  }, [list]);

  //Außer beim erstmaligen Laden, wird list.categoryId in der currentList bei Änderung geupdated
  useEffect(() => {
    if (!categoryRef.current) {
      categoryRef.current = true;
      return;
    }

    async function saveCategory() {
      await updateList(currentList.id, { categoryId: currentList.categoryId });
      setCategoryName(category ? category.name : undefined);
    }

    saveCategory();
  }, [currentList.categoryId, currentList.id, category]);

  const toggleFavorite = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    const nextValue = !(currentList.isFavorite ?? false);
    const updatedList = { ...currentList, isFavorite: nextValue };

    setCurrentList(updatedList);
    await updateList(currentList.id, { isFavorite: nextValue });
    onToggleFavorite?.(updatedList);
  };

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsPopupOpen(true);
  };

  return (
    <>
      <Link href={"/list/" + currentList.id} className={styles.link}>
        <div className={styles.card}>
          <div className={styles.topRow}>
            <p className={styles.title}>{currentList.title}</p>
            <FontAwesomeIcon
              className={styles.starIcon}
              icon={currentList.isFavorite ? filledStar : emptyStar}
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
                {categoryName}
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
          onClose={() => setIsPopupOpen(false)}
          onSave={handleSaveCategory} 
        />
      )}
    </>
  );
}
