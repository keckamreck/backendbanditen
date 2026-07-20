"use client";

import styles from "./TopBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getListById, updateListById } from "../_api/lists-api";

export function TopBar({ ListId }: { ListId: string }) {
  const [editmode, setEditmode] = useState(false);
  const [listname, setlistname] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchList(): Promise<void> {
      const list = await getListById(ListId);
      if (list) {
        setlistname(list.title);
      }
    }
    fetchList();
  }, [ListId]);

  async function handleEditClick() {
    if (editmode) {
      await updateListById(ListId, { title: listname });
    }
    setEditmode(!editmode);
  }

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button
          id="ButtonBack"
          className={styles.buttonBack}
          onClick={() => router.push(`/dashboard`)}
        >
          <FontAwesomeIcon color="black" icon={faX} />
        </button>
        <div className={styles.listName}>
          <div>
            {editmode ? (
              <input
                value={listname}
                onChange={(e) => setlistname(e.target.value)}
              />
            ) : (
              <h1>{listname} </h1>
            )}
          </div>
          <button
            id="ButtonEditName"
            className={styles.buttonEdit}
            onClick={handleEditClick}
          >
            <FontAwesomeIcon
              color="black"
              icon={editmode ? faCheck : faPencil}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
