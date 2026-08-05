"use client";

import { useEffect, useState } from "react";
import styles from "./CategoryPopup.module.css";
import { getCategories, createCategory } from "../_api/categories-api";
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
  const [inputValue, setInputValue] = useState<CategoryFrontend | null>(
    initialValue,
  );
  const [categories, setCategories] = useState<CategoryFrontend[]>(
    loadedCategories || [],
  );
  const [text, setText] = useState<string>(initialValue?.name || "");

  const handleSave = async () => {
    const name = text.trim();
    if (name.length > 0) {
      if (inputValue && inputValue.name === name) {
        onSave(inputValue);
        onClose();
        return;
      }

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
        setInputValue(newCategory);
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

  {
    /* useEffect(() => {
    async function loadCategories(){
      const result = await getCategories();
      if(result){
      setCategories(result);
      }
    }

    loadCategories();
  }, []) */
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popupCard} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>Kategorie wählen</h3>

        <input
          type="text"
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const name = text.trim();
              if (name.length === 0) return;
              createCategory(name).then((newCategory) => {
                if (newCategory) {
                  setInputValue(newCategory);
                  setText(newCategory.name);
                }
              });
            }
          }}
          placeholder="Name der Kategorie..."
          autoFocus
        />
        <div className={styles.existingCategoriesRow}>
          {categories &&
            categories.map((category) => (
              <p
                key={category.id}
                className={styles.existingCategoryBtn}
                onClick={() => {
                  setInputValue(category);
                  setText(category.name);
                }}
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
