"use client";

import { useState } from "react";
import styles from "./CategoryPopup.module.css";
import { getCategories } from "../_lib/demo";

interface CategoryPopupProps {
  initialValue: string;
  onClose: () => void;
  onSave: (newValue: string) => void;
}

export default function CategoryPopup({ initialValue, onClose, onSave }: CategoryPopupProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  const handleSave = () => {
    onSave(inputValue);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Kategorie wählen</h3>
        
        <input
          type="text"
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Name der Kategorie..."
          autoFocus
        />
        <div className={styles.existingCategoriesRow}>
          {getCategories().map((category, index) => (
            <p
              key={index}
              className={styles.existingCategoryBtn}
              onClick={() => setInputValue(category)}
            >
              {category}
            </p>
          ))}
        </div>
        <div className={styles.buttonRow}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Abbrechen
          </button>
          <button className={styles.saveBtn} onClick={handleSave}>
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}