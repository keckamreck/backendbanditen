"use client";

import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { authClient } from "@/app/_lib/auth-client";
import styles from "./page.module.css";

export default function Register() {
  async function processForm(formData: FormData) {
    const emailInput = formData.get("email") as string;
    const usernameInput = formData.get("username") as string;
    const passwordInput = formData.get("password") as string;
    const nameInput = formData.get("name") as string;

    const { data, error } = await authClient.signUp.email(
      {
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        name: nameInput,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          alert("Konto erfolgreich erstellt!");
          redirect("/dashboard");
        },
        onError: (ctx) => {
          alert(ctx.error.message);
        },
      },
    );
  }

  function showLogin() {
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.chevron}>
        <button onClick={showLogin}>Zurück</button>
      </div>
      <div className={styles.card}>
        <form action={processForm}>
          <h1>Registrieren</h1>
          <div className={styles.icon}>
            <FontAwesomeIcon size="6x" icon={faCircleInfo} />
          </div>
          <div className={styles.inputPair}>
            <span>Name:</span>
            <input
              type="text"
              placeholder="Max Mustermann"
              name="name"
              required
            />
          </div>
          <div className={styles.inputPair}>
            <span>Benutzername:</span>
            <input
              type="text"
              placeholder="madmax1231"
              name="username"
              required
            />
          </div>
          <div className={styles.inputPair}>
            <span>E-Mail:</span>
            <input
              type="text"
              placeholder="mustermann.max@example.de"
              name="email"
              required
            />
          </div>
          <div className={styles.inputPair}>
            <span>Passwort:</span>
            <input
              type="password"
              placeholder="**********"
              name="password"
              minLength={8}
              required
            />
          </div>
          <div className={styles.inputTerms}>
            <input type="checkbox" id="terms" />
            <label>Ich stimme den Nutzungsbedingungen zu.</label>
          </div>
          <button type="submit">Konto erstellen</button>
        </form>
      </div>
    </div>
  );
}
