"use client";

import styles from "./TopBar.module.css";
import { List } from "../_models/list";
import { getList } from "@/app/_models/function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setListTitle } from "@/app/_lib/demo";

export function TopBar({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const [editmode, setEditmode] = useState(false);
  const router = useRouter();

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
                value={list.title}
                onChange={(e) => setListTitle(ListId, e.target.value)}
              />
            ) : (
              <h1>{list.title} </h1>
            )}
          </div>
          <button
            id="ButtonEditName"
            className={styles.buttonEdit}
            onClick={() => setEditmode(!editmode)}
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
