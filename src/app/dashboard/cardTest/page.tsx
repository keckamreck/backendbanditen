import { List } from "@/app/_models/list";
import { ListCard } from "../../_components/ListCard";
import styles from "@/app/_components/listCard.module.css";
import { getLists } from "@/app/_lib/demo";

export default function TestSite() {
  const list: List[] = getLists();

  return (
    <div className={styles.container}>
      <ListCard list={list[0]} />
      <ListCard list={list[1]} />
      <ListCard list={list[2]} />
      <ListCard list={list[3]}/>
    </div>
  );
}
