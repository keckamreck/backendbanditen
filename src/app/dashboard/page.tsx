"use client";
import styles from "./page.module.scss";
import Head from "next/head";
import {useMemo, useState} from 'react';
import {List} from "@/app/_models/list";
import PopupWithInput from "@/app/_components/popup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {generateLists, generateTasks} from "@/app/_lib/demo";
import {Task} from "@/app/_models/task";




export default function DashboardPage() {
    const [like, setLikes] = useState(0);
    let lists: List[] = generateLists();
    let tasks: Task[] = generateTasks(1);

    console.log(lists);
    newList("Früstück");
    console.log(lists);

    function title(title: string){
        return(title);
    }

    return(

        <div className={styles.page}>
            <Head>
                <meta charSet="utf-8" />
                <title>Dashboard</title>
            </Head>
            <main className={styles.main}>
                <div>
                    <div>
                        <SearchBar />
                    </div>
                    <div>
                        <button title="addList" onClick={()=>PopupWithInput()}>
                            <FontAwesomeIcon icon={faPlus} style={{color: "rgb(80, 30, 79)",}} />
                        </button>
                    </div>

                </div>
                <div>
                    <Biber />

                </div>
                <div className={styles.todayButton}>
                    <button id="todayButton" >
                        Einkaufen
                    </button>
                </div>
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

    function Popup(){

    }
    function newList(name: string) {
        const list: List = {
            id: lists.length+1,
            title: name
        };
        lists.push(list);

    }

}