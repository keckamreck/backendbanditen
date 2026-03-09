import styles from "./TopBar.module.css";
import { getList } from "../_models/list";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";

export function TopBar({ ListId }: { ListId: number }) {
  const list = getList(ListId);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <button
          className={styles.buttonBack}
          onClick={() => console.log("Back clicked")}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <div className={styles.listName}>
          <h1>{list.title}</h1>
          <button
            className={styles.buttonEdit}
            onClick={() => console.log("Edit Name clicked")}
          >
            <FontAwesomeIcon icon={faPencil} />
          </button>
        </div>
      </div>
    </div>
  );
}
