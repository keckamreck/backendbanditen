"use client";

import styles from "./footer.module.css";
import { useState } from "react";
import { ArchiveButton, DeleteButton } from "@/app/_components/ButtonsIcon";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/_components/modal";
import { deleteListById } from "../_api/lists-api";

export function Footer({ ListId }: { ListId: string }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  async function handleConfirm() {
    const result = await deleteListById(ListId);
    if (result) {
      toggleModal();
      router.push(`/dashboard/`);
    }
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ArchiveButton
          className={styles.buttonArchive}
          onClick={() => router.push(`/archive/${ListId}`)}
        ></ArchiveButton>
        <DeleteButton
          className={styles.buttonDelete}
          onClick={toggleModal}
        ></DeleteButton>
        {showModal && (
          <Modal
            onClose={toggleModal}
            onConfirm={handleConfirm}
            title="Möchten Sie wirklich die gesamte Liste löschen?"
            yes="Ja"
            no="Nein"
          />
        )}
      </div>
    </footer>
  );
}
