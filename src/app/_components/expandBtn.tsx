"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import styles from "./expandBtn.module.css";

interface ExpandButtonProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function ExpandButton({ isExpanded, onToggle }: ExpandButtonProps) {
  return (
    <button className={styles.button} onClick={onToggle}>
      <FontAwesomeIcon 
        icon={isExpanded ? faChevronDown : faChevronRight} 
        className={styles.icon} 
      />
      <span className={styles.text}>weitere</span>
    </button>
  );
}