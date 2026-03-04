"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ButtonHTMLAttributes } from "react";
import styles from './button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton(props: ButtonProps) {
  return (
    <button id="delete-button" type="button" onClick={props.onClick} className={styles.buttonDelete}>
      <FontAwesomeIcon size="2x" icon={faTrash}/>
    </button>
  );
}