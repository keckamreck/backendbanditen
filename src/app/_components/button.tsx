"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faBoxArchive, faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { ButtonHTMLAttributes } from 'react';
import styles from './button.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function DeleteButton(props: ButtonProps) {
  return (
    <button id="delete-button" type="button" onClick={props.onClick} className={`${styles.button} ${props.className}`}>
      <FontAwesomeIcon size="2x" icon={faTrash}/>
    </button>
  );
}

export function ArchiveButton(props: ButtonProps) {
  return (
    <button className={styles.button}>
      <FontAwesomeIcon size="2x" icon={faBoxArchive}/>
    </button>
  );
}

export function ChevronButton(props: ButtonProps) {
  return (
    <button type="button" onClick={props.onClick} className={styles.button}>
      <FontAwesomeIcon size="2x" icon={faChevronLeft}/>
    </button>
  )
}

export function CloseButton(props: ButtonProps) {
  return (
    <button id="delete-button" type="button" onClick={props.onClick} className={`${styles.button} ${props.className}`}>
      <FontAwesomeIcon size="2x" icon={faXmark}/>
    </button>
  );
}