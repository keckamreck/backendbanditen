"use client";

import { CloseButton, BurgerButton } from "@/app/_components/ButtonsIcon";
import { authClient } from "../_lib/auth-client";
import { useState } from "react";
import styles from "./logout.module.css";
import { redirect } from "next/navigation";


export function Logout() {
  async function zongTest() {
    const { data: session } = await authClient.getSession();
    console.log(session);
  }
  async function handleLogout() {
    await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        redirect('/login');
      },
    },
});

  }
  const [isBurger, setIsBurger] = useState(true);
  const [isMenu, setIsMenu] = useState(false);

  function handleClose() {
    setIsBurger(!isBurger);
    setIsMenu(!isMenu);
  }

  function handleOpen() {
    setIsBurger(!isBurger);
    setIsMenu(!isMenu);
  }

  return (
    <div>
      <span
      style={{ display: isBurger ? "flex" : "none" }}
      className={styles.roundBackground}>
        <BurgerButton onClick={handleOpen} ></BurgerButton>
      </span>
      
      <div
       style={{ display: isMenu ? "flex" : "none" }}
      className={styles.modal}>
      <div className={styles.content}>
        <CloseButton onClick={handleClose} className={styles.closeButton} />
        <button onClick={zongTest}>ZONG</button>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
    </div>
  );
}