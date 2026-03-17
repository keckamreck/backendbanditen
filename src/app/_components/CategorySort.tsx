"use client";
import { useState, useEffect } from "react";
import styles from "./CategorySort.module.css";
import { getCategories } from "@/app/_lib/demo";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CategorySortProps {
  onCategorySelect: (category: string | null) => void;
}

export default function CategorySort({ onCategorySelect }: CategorySortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const cats = getCategories();
    setCategories(cats);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectCategory = (category: string | null) => {
    setSelectedCategory(category);
    onCategorySelect(category);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <button className={isOpen ? styles.sortButtonActive : styles.sortButton} onClick={handleToggle}>
        <FontAwesomeIcon icon={faSort} className={styles.sortIcon} />
        Nach Kategorie sortieren{" "}
        {selectedCategory ? `(${selectedCategory})` : ""}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <div
            className={styles.dropdownItem}
            onClick={() => handleSelectCategory(null)}
          >
            Alle
          </div>
          {getCategories().map((category, index) => (
            <p
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelectCategory(category)}
            >
              {category}
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
