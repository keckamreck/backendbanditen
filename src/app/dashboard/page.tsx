"use client";
import styles from "./page.module.css";
import Head from "next/head";
import {useState, useEffect} from 'react';
import {List} from "@/app/_models/list";
import PopupWithInput from "@/app/_components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch, faCalendarWeek } from "@fortawesome/free-solid-svg-icons";
import {generateLists} from "@/app/_lib/demo";




export default function DashboardPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        const initialLists = generateLists();
        const breakfastList: List = {
            id: initialLists.length + 1,
            title: "Frühstück"
        };
        initialLists.push(breakfastList);
        setLists(initialLists);
        console.log("Lists initialized:", initialLists);
    }, []);

    function newList(name: string) {
        const newListItem: List = {
            id: lists.length + 1,
            title: name
        };

        setLists(prevLists => [...prevLists, newListItem]);
        console.log("New list added:", name);
    }

    return(
        <div className={styles.page}>
            <Head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover" />
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
                        <button title="addList"  className={styles.addIcon} onClick={()=>setIsPopupOpen(true)}>
                            <FontAwesomeIcon icon={faPlus}/>
                        </button>
                    </div>
                </div>

                {/* Bereich für heute/nächste fällige Listen */}
                <div className={styles.todaySection}>
                    <h3>Heute fällig</h3>
                    <div className={styles.todayContent}>
                        <div className={styles.dueItem}>
                            <div className={styles.dueInfo}>
                                <span className={styles.dueTitle}>Einkaufen</span>
                                <span className={styles.dueDate}>Heute, 15:30</span>
                            </div>
                            <div className={styles.dueIcon}>
                                <FontAwesomeIcon icon={faCalendarWeek}/>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

    function SearchBar(){
        return(
            <form className={styles.searchForm}>
                <div className={styles.searchInputWrapper}>
                    <FontAwesomeIcon
                        icon={faSearch}
                        className={styles.searchIcon}
                    />
                    <input
                        className={styles.searchBar}
                        type="search"
                        placeholder="Listen durchsuchen..."
                    />
                </div>
            </form>
        )
    }
}