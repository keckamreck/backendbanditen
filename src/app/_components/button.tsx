"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ButtonHTMLAttributes } from "react";
import styles from './button.module.css'

export function DeleteButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button id="delete-button" type="button" onClick={props.onClick} className={styles.button}>
      <FontAwesomeIcon icon={faTrash}/>
    </button>
  );
}