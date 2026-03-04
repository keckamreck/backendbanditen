"use client";
import styles from "./page.module.scss";
import Head from "next/head";
import { useState } from 'react';
import Image from "next/image";
// import { newList } ;



export default function DashboardPage() {
    const [like, setLikes] = useState(0);
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
                            +
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
    function title(title: string){
        return(title);
    }

}