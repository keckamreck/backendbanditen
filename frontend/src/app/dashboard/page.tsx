"use client";
import styles from "./page.module.css";
import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { List } from "@/app/_models/list";
import PopupWithInput from "@/app/_components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { getLists, getTasks, newList } from "@/app/_lib/demo";
import { Task } from "@/app/_models/task";
import { ListCard } from "../_components/ListCard";
import ExpandButton from "../_components/ExpandBtn";
import CategorySort from "../_components/CategorySort";

export default function DashboardPage() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dueTask, setDueTask] = useState<Task | null>(null);
  const [dueTaskTime, setDueTaskTime] = useState<string>("");
  const [searchResults, setSearchResults] = useState<List[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [update, triggerUpdate] = useState(false);

  const filteredLists = selectedCategory
    ? lists.filter((l) => l.category === selectedCategory)
    : lists;
  const favourites = filteredLists.filter((l) => l.isFavourite);
  const others = filteredLists.filter((l) => !l.isFavourite);

  useEffect(() => {
    const initialLists = getLists();
    setLists(initialLists);
    const initialTasks = getTasks();
    setTasks(initialTasks);
    console.log("Lists initialized:", initialLists);
    console.log("Tasks initialized:", initialTasks);
  }, []);

  useEffect(() => {
    const getDueTask = () => {
      const filteredTasks = tasks.filter(
        (task) => task.deadline != undefined && !task.done,
      );
      const sortedTasks = [...filteredTasks].sort((a, b) => {
        return (a.deadline?.getTime() ?? 0) - (b.deadline?.getTime() ?? 0);
      });
      setDueTask(sortedTasks[0]);
    };

    const timer = setInterval(getDueTask, 60000);
    getDueTask();
    return () => clearInterval(timer);
  }, [tasks]);

  useEffect(() => {
    const getListsFromDemo = () => {
      setLists(getLists());
    };

    const timer = setInterval(getListsFromDemo, 60000);
    return () => clearInterval(timer);
  }, [lists, update]);

  useEffect(() => {
    console.log("Due task updated:", dueTask);
    const getDueTaskTime = () => {
      const timestamp = new Date();
      if (dueTask !== null && dueTask != undefined) {
        if (dueTask.deadline !== null) {
          console.log("timestamp:", timestamp);
          console.log("dueTask.deadline:", dueTask.deadline);
          // if (timestamp.getFullYear() === dueTask.deadline.getFullYear()) {
          // }
          const timestampInDays = timestamp.getTime() / 86400000;
          const dueTaskInDays = dueTask.deadline.getTime() / 86400000;

          // console.log(timestamp.getTime());
          if (timestampInDays === dueTaskInDays) {
            setDueTaskTime("Heute fällig");
          } else if (
            Math.floor(timestampInDays) + 1 ===
            Math.floor(dueTaskInDays)
          ) {
            setDueTaskTime("Morgen fällig");
          } else {
            const timeLeft = Math.floor(dueTaskInDays - timestampInDays);
            if (timeLeft < 1) {
              setDueTaskTime(`Heute fällig`);
            } else {
              setDueTaskTime(`In ${timeLeft} Tagen fällig`);
            }
          }
        }
      }
    };
    const timer = setInterval(getDueTaskTime, 60000);
    getDueTaskTime();
    return () => clearInterval(timer);
  }, [dueTask]);

  function handleToggleFavourite(updatedList: List) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedList.id
          ? { ...list, isFavourite: updatedList.isFavourite }
          : list,
      ),
    );
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
        onSubmitting={(name) => handleNewListButton(name)}
      />
      {isSearchOpen && (
        <div
          className={styles.searchBackdrop}
          onClick={() => setIsSearchOpen(false)}
        />
      )}
      <main className={styles.main}>
        <div className={styles.pageContainer}>
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

          {/* Search Dropdown */}
          {isSearchOpen && (
            <div className={styles.searchDropdown}>
              {searchResults.length > 0 ? (
                <div className={styles.searchResultsContainer}>
                  {searchResults.map((list) => (
                    <div
                      key={list.id}
                      className={styles.dropdownItem}
                      onClick={() => {
                        gotoList(list.id);
                        setIsSearchOpen(false);
                        setSearchResults([]);
                      }}
                    >
                      <span>{list.title}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noResults}>Keine Listen gefunden</div>
              )}
            </div>
          )}
        </div>

        {/* Section for due Task */}
        <DueTaskSection />
        <CategorySort onCategorySelect={setSelectedCategory} />
        <div className={styles.cardContainer}>
          {favourites.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              onToggleFavorite={handleToggleFavourite}
            />
          ))}
        </div>

        {/* Der Toggle-Button */}
        <ExpandButton
          isExpanded={isExpanded}
          onToggle={() => setIsExpanded(!isExpanded)}
        />

        {/* Bereich für den Rest - nur sichtbar wenn isExpanded true ist */}
        {isExpanded && (
          <div className={styles.cardContainer}>
            {others.map((list) => (
              <ListCard
                key={list.id}
                list={list}
                onToggleFavorite={handleToggleFavourite}
              />
            ))}
          </div>
        )}
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

  function gotoList(listKey: number) {
    router.push("/list/" + listKey);
  }
  function handleNewListButton(name: string) {
    newList(name);
    if (update) {
      triggerUpdate(false);
    }
    triggerUpdate(true);
  }

  function DueTaskSection() {
    if (dueTask) {
      return (
        <div className={styles.todaySection}>
          <h3>{dueTaskTime}</h3>
          <div
            className={styles.todayContent}
            onClick={() => gotoList(dueTask?.listKey)}
          >
            <div className={styles.dueItem}>
              <div className={styles.dueInfo}>
                <span className={styles.dueTitle}>{dueTask?.title}</span>
                <span className={styles.dueDate}>
                  {dueTask?.deadline?.toLocaleDateString("de-DE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  ,{" "}
                  {dueTask?.deadline?.toLocaleTimeString("de-DE", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className={styles.dueIcon}>
                <FontAwesomeIcon icon={faCalendarWeek} />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  function searchLists(s: string) {
    const results = lists.filter((list) =>
      list.title.toLowerCase().includes(s.toLowerCase()),
    );
    setSearchResults(results);
    setIsSearchOpen(true);
  }

  function handleSearchSubmit(e: FormEvent) {
    // e.preventDefault();

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
