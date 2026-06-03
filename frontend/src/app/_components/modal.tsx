"use client";

import { CloseButton } from "@/app/_components/ButtonsIcon";
import { useState } from "react";
import styles from "./modal.module.css";
import { Button } from "./Buttons";

export interface ModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  yes: string;
  no: string;
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
    <div
      style={{ display: isVisible ? "block" : "none" }}
      className={styles.modal}
    >
      <div className={styles.content}>
        <CloseButton onClick={handleClose} className={styles.closeButton} />
        <p>{props.title}</p>
        <Button
          buttonType={"button"}
          text={props.no}
          onClickAction={handleClose}
          disabled={false}
          styleType={"no"}
          className={styles.noButton}
        />
        <Button
          buttonType={"button"}
          text={props.yes}
          onClickAction={handleConfirm}
          disabled={false}
          styleType={"yes"}
          className={styles.yesButton}
        />
      </div>
    </div>
  );
}
