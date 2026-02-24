"use client";

import styles from "./page.module.scss";
import Head from "next/head";
import { useState } from 'react';



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
                    <SearchBar />
                    <Biber />
                    <button onClick={()=>{setLikes(like+1); console.log(like)}}>
                        Like
                    </button>
                </div>
                <div background-color="#090309">
                    <h1>Biber sidjjshdjhj hjhdjs hdjsjd hsjdj djhsjhdj shdj hsdjadjhj jhj hdjhsd jjd h</h1>
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
        let biber= title("Keser")
        return(
            <h1>{biber}</h1>
        )

    }
    function title(title: string){
        return(title);
    }

}