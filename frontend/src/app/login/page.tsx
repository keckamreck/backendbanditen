"use client";

import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { authClient } from "@/app/_lib/auth-client";
import styles from "./page.module.css";

export default function Login() {
  async function processForm(formData: FormData) {
    const usernameInput = formData.get("username") as string;
    const passwordInput = formData.get("password") as string;

    const { data, error } = await authClient.signIn.username(
      {
        username: usernameInput,
        password: passwordInput,
        callbackURL: "/dashboard",
        rememberMe: false,
      },
      {
        onSuccess: (ctx) => {
          redirect("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  function showRegister() {
    redirect("/register");
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form action={processForm}>
          <h1>Login</h1>
          <div className={styles.icon}>
            <FontAwesomeIcon size="6x" icon={faCircleUser} />
          </div>
          <div className={styles.inputPair}>
            <span>Benutzername</span>
            <input
              type="text"
              placeholder="madmax1231"
              name="username"
              required
            />
          </div>
          <div className={styles.inputPair}>
            <span>Passwort</span>
            <input
              type="password"
              placeholder="**********"
              name="password"
              minLength={8}
              required
            />
          </div>
          <button type="submit">Einloggen</button>
          <a className={styles.new} onClick={showRegister}>
            Neues Konto erstellen
          </a>
        </form>
      </div>
    </div>
  );
}
