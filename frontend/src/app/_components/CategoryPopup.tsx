"use client";

import { useState } from "react";
import styles from "./CategoryPopup.module.css";
import { createCategory } from "../_api/categories-api";
import { CategoryFrontend } from "../_models/category";

interface CategoryPopupProps {
  initialValue: CategoryFrontend | null;

  loadedCategories: CategoryFrontend[] | null;
  onClose: () => void;
  onSave: (newValue: CategoryFrontend | undefined) => void;
}

export default function CategoryPopup({
  initialValue,
  loadedCategories,
  onClose,
  onSave,
}: CategoryPopupProps) {
  const [inputValue, setInputValue] = useState<string>(initialValue?.name || "");
  const categories = loadedCategories || [];

  const handleSave = async () => {
    const name = inputValue.trim();
    if (name.length > 0) {
      const existingCat: CategoryFrontend | undefined = categories.find(
        (cat) => cat.name === name,
      );

      if (existingCat) {
        onSave(existingCat);
        onClose();
        return;
      }

      const newCategory = await createCategory(name);
      if (newCategory) {
        onSave(newCategory);
        onClose();
        return;
      }

      onSave(undefined);
      onClose();
      return;
    }

    onSave(undefined);
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
          placeholder="Name der Kategorie..."
          autoFocus
        />
        <div className={styles.existingCategoriesRow}>
          {categories.map((category) => (
              <p
                key={category.id}
                className={styles.existingCategoryBtn}
                onClick={() =>setInputValue(category.name)}
              >
                {category.name}
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
