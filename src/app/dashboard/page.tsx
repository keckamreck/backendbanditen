"use client";
import styles from "./page.module.scss";
import Head from "next/head";
import {useMemo, useState} from 'react';
import List from "@/app/components_dashboard/List";
// import { plus } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



export default function DashboardPage() {
    const [like, setLikes] = useState(0);
    const lists = [];

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
                        <button title="addList" onClick={()=>newList()}>
                            {/*<FontAwesomeIcon icon={plus} />*/}
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


    function newList(){
        const list= new List("Biber")
        lists.push(list)

    }

}