"use client";

import { CloseButton, BurgerButton } from "@/app/_components/ButtonsIcon";
import { authClient } from "../_lib/auth-client";
import { getUserId } from "../api/users-api";
import { useState } from "react";
import styles from "./logout.module.css";
import { redirect } from "next/navigation";

export function Logout() {
  async function handleUser() {
    const userId = await getUserId();
    prompt("User ID:", JSON.stringify(userId));
  }
  async function handleZong() {
    const { data: session } = await authClient.getSession();
    alert(JSON.stringify(session, null, " "));
  }
  async function handleLogout() {
    await authClient.signOut({
    fetchOptions: {
      onSuccess: () => {
        alert("Redirecting!");
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
    <div className={styles.burgerMenu}>
      <BurgerButton onClick={handleOpen} className={styles.burgerButton} />
      <div
       style={{ display: isMenu ? "block" : "none" }}
      className={styles.modal}>
      <div className={styles.content}>
        <CloseButton onClick={handleClose} className={styles.closeButton} />
        <div className={styles.modalTitle}>Session Management</div>
        <div className={styles.actionContainer}>
          <button onClick={handleZong} className={styles.actionButton}>Zong</button>
          <button onClick={handleLogout} className={styles.actionButton}>Logout</button>
        </div>
      </div>
      </div>
    </div>
  );
}