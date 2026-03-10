"use client";
import styles from "./page.module.css";
import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import { List } from "@/app/_models/list";
import PopupWithInput from "@/app/_components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { getLists, getTasks } from "@/app/_lib/demo";
import { Task } from "@/app/_models/task";

export default function DashboardPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [todayTask, setTodayTask] = useState<Task | null>(null);

  useEffect(() => {
    const initialLists = getLists();
    const breakfastList: List = {
      id: initialLists.length + 1,
      title: "Frühstück",
    };
    initialLists.push(breakfastList);
    setLists(initialLists);
    const initialTasks = getTasks();
    setTasks(initialTasks);
    console.log("Lists initialized:", initialLists);
    console.log("Tasks initialized:", initialTasks);
  }, []);

  useEffect(() => {
    const getTodayTask = () => {
      const filteredTasks = tasks.filter((task) => task.deadline != undefined);
      const sortedTasks = [...filteredTasks].sort((a, b) => {
        return (a.deadline?.getTime() ?? 0) - (b.deadline?.getTime() ?? 0);
      });
      setTodayTask(sortedTasks[0]);
    };

    getTodayTask();
  }, [tasks]);

  function newList(name: string) {
    const newListItem: List = {
      id: lists.length + 1,
      title: name,
    };

    setLists((prevLists) => [...prevLists, newListItem]);
    console.log("New list added:", name);
  }

  return (
    <div className={styles.page}>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"
        />
        <title>Dashboard</title>
      </Head>
      <PopupWithInput
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmitting={(name) => newList(name)}
      />
      <main className={styles.main}>
        {/* Header mit Suchleiste links und Add-Button rechts */}
        <div className={styles.header}>
          <div className={styles.searchSection}>
            <SearchBar />
          </div>
          <div className={styles.addButtonSection}>
            <button
              title="addList"
              className={styles.addIcon}
              onClick={() => setIsPopupOpen(true)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>

        {/* Bereich für heute/nächste fällige Listen */}
        <div className={styles.todaySection}>
          <h3>Heute fällig</h3>
          <div
            className={styles.todayContent}
            onClick={() =>
              alert(`Open Detail View for task with id: ${todayTask?.id}  `)
            }
          >
            <div className={styles.dueItem}>
              <div className={styles.dueInfo}>
                <span className={styles.dueTitle}>{todayTask?.title}</span>
                <span className={styles.dueDate}>
                  Heute, 15:30 {todayTask?.id}
                </span>
              </div>
              <div className={styles.dueIcon}>
                <FontAwesomeIcon icon={faCalendarWeek} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  function SearchBar() {
    return (
      <form
        className={styles.searchForm}
        onSubmit={(e) => handleSearchSubmit(e)}
      >
        <div className={styles.searchInputWrapper}>
          <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          <input
            id="searchInput"
            className={styles.searchBar}
            type="search"
            placeholder="Listen durchsuchen..."
          />
        </div>
      </form>
    );
  }

  function searchLists(s: string) {
    const results = lists.filter((list) =>
      list.title.toLowerCase().includes(s.toLowerCase()),
    );

    if (results.length > 0) {
      alert(`Gefundene Listen:\n${results.map((r) => r.title).join("\n")}`);
    } else {
      alert("Keine Listen gefunden!");
    }
  }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();

    const input = document.getElementById("searchInput") as HTMLInputElement;

    if (input && input.value.trim()) {
      // console.log("Form submitted with name:", input.value);

      searchLists(input.value.trim());
      input.value = "";
    } else {
      alert("Bitte geben Sie einen Namen ein!");
    }
  }
}
