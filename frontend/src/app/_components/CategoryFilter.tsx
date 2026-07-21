"use client";
import { useState, useEffect } from "react";
import styles from "./CategorySort.module.css";
import { getCategories } from "@/app/_api/categories-api";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CategoryFrontend } from "../_models/category";

interface CategoryFilterProps {
  onCategorySelect: (category: string | null) => void;
}

export default function CategoryFilter({ onCategorySelect }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryFrontend[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFrontend | null>(null);

  useEffect(() => {
    async function loadCategories(){
      const result = await getCategories();
      if(result){
      setCategories(result);
      }
    }
    loadCategories();
  }, []);


  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (category: CategoryFrontend | null) => {
    setSelectedCategory(category || null);
    onCategorySelect(category?.id || null);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={isOpen ? styles.sortButtonActive : styles.sortButton} onClick={handleToggle}>
        <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
        Nach Kategorie filtern{" "}
        {selectedCategory ? `(${selectedCategory.name})` : ""}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownItem}
            onClick={() => handleSelectCategory(null)}
          >
            Alle
          </div>
          {categories.map((category) => (
            <p
              key={category.id}
              className={styles.dropdownItem}
              onClick={() => handleSelectCategory(category)}
            >
              {category.name}
            </p>
          ))}
        </div>
      )}
      {isOpen && (
        <div 
          className={styles.dropdownOverlay}
          onClick={() => setIsOpen(!isOpen)} 
        ></div>
      )}
    </div>
  );
}
