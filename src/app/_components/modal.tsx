'use client';

import { CloseButton } from '@/app/_components/button';
import { useState } from 'react';
import styles from './modal.module.css';

export interface ModalProps {
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  yes: string,
  no: string
}

export function Modal(props: ModalProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);

  function handleClose() {
    setIsVisible(!isVisible);
    props.onClose();
  }

  function handleConfirm() {
    setIsConfirmed(!isConfirmed);
    props.onConfirm();
  }

  return (
    <div style={{display: (isVisible) ? 'block' : 'none'}} className={styles.modal}>
      <div className={styles.content}>
        <CloseButton onClick={handleClose} className={styles.closeButton}/>
        <p>{props.title}</p>
        <button
          onClick={handleConfirm}
          type="button"
          className={styles.yesButton}
        >
          {props.yes}
        </button>
        <button
          onClick={handleClose}
          type="button"
          className={styles.noButton}
        >
          {props.no}
        </button>
      </div>
    </div>
  );
}