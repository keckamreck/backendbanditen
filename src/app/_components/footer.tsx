"use client";

import styles from "./footer.module.css";
import { getList } from "@/app/_lib/demo";
import { useState } from "react";
import { useParams } from "next/navigation";
import { ArchiveButton, DeleteButton } from "@/app/_components/ButtonsIcon";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/_components/modal";
import { deleteList } from "@/app/_lib/demo";

export function Footer({ ListId }: { ListId: number }) {
  const router = useRouter();
  const [list, setList] = useState(getList(ListId));
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    deleteList(ListId);
    router.push(`/dashboard/`);
  }

  function toggleModal() {
    setShowModal(!showModal);
  }

  function handleConfirm() {
    handleDelete();
    toggleModal();
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
