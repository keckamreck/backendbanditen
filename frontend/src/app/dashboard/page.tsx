"use client";
import styles from "./page.module.css";
import Head from "next/head";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import PopupWithInput from "@/app/_components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faSearch,
  faCalendarWeek,
} from "@fortawesome/free-solid-svg-icons";
import { newList, getLists, getListsBySearch } from "@/app/_api/lists-api";
import { getDueTask } from "@/app/_api/tasks-api";
import { List } from "@/app/_models/list";
import { TaskBackend } from "@/app/_models/task";
import { ListCard } from "../_components/ListCard";
import ExpandButton from "../_components/ExpandBtn";
import CategoryFilter from "../_components/CategoryFilter";
import { Logout } from "../_components/logout";
import { CategoryFrontend } from "../_models/category";
import { getCategories } from "../_api/categories-api";

export default function DashboardPage() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [dueTask, setDueTask] = useState<TaskBackend | null>();
  const [lists, setLists] = useState<List[]>([]);
  const [dueTaskTime, setDueTaskTime] = useState<string>("");
  const [searchResults, setSearchResults] = useState<List[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [update, triggerUpdate] = useState(false);
  const [fetchComplete, setFetchComplete] = useState(false);
  const [categories, setCategories] = useState<CategoryFrontend[] | []>([]);

  const filteredLists = selectedCategory
    ? lists.filter((list) => list.categoryId === selectedCategory)
    : lists;
  const favourites = filteredLists.filter((list) => list.isFavorite);
  const others = filteredLists.filter((list) => !list.isFavorite);

  const fetchData = async () => {
    getLists().then((lists) => setLists(lists));
    await getDueTask().then((task) => setDueTask(task));
  };
  //Get Lists and Due Task
  useEffect(() => {
    const firstFetch = async () => {
      setFetchComplete(false);
      await fetchData();
      setFetchComplete(true);
    };
    firstFetch();
    const timer = setInterval(fetchData, 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [update]);

  //Validate the Due Task
  useEffect(() => {
    const getDueTaskTime = () => {
      const timestamp = new Date();
      if (dueTask !== null && dueTask != undefined) {
        if (dueTask.deadline !== null && dueTask.deadline !== undefined) {
          //Constants
          const deadlineDate = new Date(dueTask.deadline);
          const timestampInDays = timestamp.getTime() / 86400000;
          const dueTaskInDays = deadlineDate.getTime() / 86400000;
          const ceilTimeLeft = Math.ceil(dueTaskInDays - timestampInDays);
          const floorTimeLeft = Math.floor(dueTaskInDays - timestampInDays);
          //Check how much time is left
          if (dueTaskInDays === timestampInDays) {
            setDueTaskTime("Heute fällig");
          } else if (ceilTimeLeft === 1) {
            setDueTaskTime("Morgen fällig");
          } else {
            if (floorTimeLeft < 1) {
              setDueTaskTime(`Heute fällig`);
            } else {
              setDueTaskTime(`In ${ceilTimeLeft} Tagen fällig`);
            }
          }
        }
      }
    };
    const timer = setInterval(getDueTaskTime, 60000);
    getDueTaskTime();
    return () => clearInterval(timer);
  }, [dueTask]);

  useEffect(() => {
    async function loadCategories() {
      const fetchedCategories: CategoryFrontend[] | [] = await getCategories();
      setCategories(fetchedCategories);
    }
    loadCategories();
  }, [update]);

  function handleToggleFavourite(updatedList: List) {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === updatedList.id ? { ...list, ...updatedList } : list,
      ),
    );
  }
  if (fetchComplete) {
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
              <Logout />
            </div>

            {/* Search Dropdown */}
            {isSearchOpen && (
              //Listen gefunden
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
                  //Keine Listen gefunden
                  <div className={styles.noResults}>Keine Listen gefunden</div>
                )}
              </div>
            )}
          </div>
          {/* Section for due Task */}
          <DueTaskSection />
          {/* Section for Category Sort */}
          <CategoryFilter onCategorySelect={setSelectedCategory} />
          <div className={styles.cardContainer}>
            {favourites.map((list) => (
              <ListCard
                key={list.id}
                list={list}
                category={
                  categories.find((cat) => cat.id === list.categoryId) || null
                }
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
                  category={
                    categories.find((cat) => cat.id === list.categoryId) || null
                  }
                  onToggleFavorite={handleToggleFavourite}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    );
  } else {
    return <div style={{ margin: "20px" }}>Loading...</div>;
  }

  function SearchBar() {
    return (
      <form
        className={styles.searchForm}
        onSubmit={(form) => handleSearchSubmit(form)}
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

  function gotoList(listId: string) {
    router.push("/editTask/" + listId);
  }
  function handleNewListButton(name: string) {
    newList(name).then(() => {
      triggerUpdate((prev) => !prev);
    });
  }

  function DueTaskSection() {
    if (dueTask?.deadline) {
      const deadlineDate = new Date(dueTask.deadline);
      return (
        <div className={styles.todaySection}>
          <h3>{dueTaskTime}</h3>
          <div
            className={styles.todayContent}
            onClick={() => gotoList(dueTask?.id)}
          >
            <div className={styles.dueItem}>
              <div className={styles.dueInfo}>
                <span className={styles.dueTitle}>{dueTask.title}</span>
                <span className={styles.dueDate}>
                  {deadlineDate.toLocaleDateString("de-DE", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  ,{" "}
                  {deadlineDate.toLocaleTimeString("de-DE", {
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

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();

    const input = document.getElementById("searchInput") as HTMLInputElement;

    if (input && input.value.trim()) {
      getListsBySearch(input.value.trim()).then((lists: List[] | []) => {
        setSearchResults(lists);
        setIsSearchOpen(true);
      });
      input.value = "";
    } else {
      alert("Bitte geben Sie einen Namen ein!");
    }
  }
}
