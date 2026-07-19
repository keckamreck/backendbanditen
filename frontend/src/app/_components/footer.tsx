"use client";

import styles from "./footer.module.css";
import { fetchApi } from "@/app/_api/fetcher";
import { ListReal } from "@/app/_models/list";
import { useState } from "react";
import { ArchiveButton, DeleteButton } from "@/app/_components/ButtonsIcon";
import { useRouter } from "next/navigation";
import { Modal } from "@/app/_components/modal";

export function Footer({ ListId }: { ListId: string }) {
  const router = useRouter();
  const [list, setList] = useState<ListReal>();
  const [showModal, setShowModal] = useState(false);

  async function handleDelete() {
    await fetchApi<ListReal>(`/lists/${ListId}`, "DELETE");
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
