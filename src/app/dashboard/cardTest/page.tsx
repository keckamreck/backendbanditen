import { List } from "@/app/_models/list";
import { ListCard } from "../../_components/listCard";
import styles from "@/app/_components/listCard.module.css";

export default function TestSite() {
  const list: List[] = [
    {
      id: 1,
      title: "Test Liste hehehehehehehe",
    },
    {
      id: 2,
      title: "Leck",
    },
    {
      id: 3,
      title: "Yay",
    },
    {
      id: 4,
      title: "Arbeit",
    },
  ];

  return (
    <div className={styles.container}>
      <ListCard list={list[0]} />
      <ListCard list={list[1]} />
      <ListCard list={list[2]} />
    </div>
  );
}
