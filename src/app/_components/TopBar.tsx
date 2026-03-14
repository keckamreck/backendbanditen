"use client";

import styles from "./TopBar.module.css";
import { List } from "../_models/list";
import { getList } from "@/app/_models/function";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function TopBar({ ListId }: { ListId: number }) {
  const list = getList(ListId);
  const [editmode, setEditmode] = useState(false);
  const [listname, setlistname] = useState(list.title);
  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button
          id="ButtonBack"
          className={styles.buttonBack}
          onClick={() => console.log("Back clicked")}
        >
          <FontAwesomeIcon icon={faX} />
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
            onClick={() => setEditmode(!editmode)}
          >
            <FontAwesomeIcon icon={editmode ? faCheck : faPencil} />
          </button>
        </div>
      </div>
    </div>
  );
}
