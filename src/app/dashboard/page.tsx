"use client";
import styles from "./page.module.scss";
import Head from "next/head";
import {useState, useEffect} from 'react';
import {List} from "@/app/_models/list";
import PopupWithInput from "@/app/_components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

    function title(title: string){
        return(title);
    }

    function newList(name: string) {

        const newListItem: List = {
            id: lists.length + 1,
            title: name
        };

        setLists(prevLists => [...prevLists, newListItem]);
        console.log("New list added:", name);
        alert(name + " wurde erstellt!");
    }

    return(
        <div className={styles.page}>
            <Head>
                <meta charSet="utf-8" />
                <title>Dashboard</title>
            </Head>
            <PopupWithInput
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSubmitting={(name) => newList(name)}
            />
            <main className={styles.main}>
                <div>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <button title="addList" onClick={()=>setIsPopupOpen(true)}>
                            <FontAwesomeIcon icon={faPlus} style={{color: "rgb(80, 30, 79)",}}/>
                        </button>
                    </div>
                </div>
                <div>
                    <Biber />
                </div>
                <div className={styles.todayButton}>
                    <button id="todayButton">
                        Einkaufen
                    </button>
                </div>

                {/* Debug: Zeige aktuelle Listen an */}
                {/*<div style={{marginTop: '20px'}}>*/}
                {/*    <h3>Aktuelle Listen ({lists.length}):</h3>*/}
                {/*    <ul>*/}
                {/*        {lists.map(list => (*/}
                {/*            <li key={list.id}>{list.title}</li>*/}
                {/*        ))}*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </main>
        </div>
    )

    function SearchBar(){
        return(
            <form>
                <input id="search-bar" type="search"/>
            </form>
        )
    }

    function Biber(){
        let biber= title("Kneser")
        return(
            <h1>{biber}</h1>
        )


    }
}