'use client';

import { redirect } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { authClient } from "@/app/_lib/auth-client";
import styles from './page.module.css';

export default function Register() {
  
  async function verifyData(formData: FormData) {
    const emailInput = formData.get('email') as string;
    const usernameInput = formData.get('username') as string;
    const passwordInput = formData.get('password') as string;
    const nameInput = formData.get('name') as string;

    const { data, error } = await authClient.signUp.email({
        email: emailInput,
        username: usernameInput,
        password: passwordInput,
        name: nameInput,
        callbackURL: "/dashboard"
    }, {
        onRequest: (ctx) => {
            //show loading
        },
        onSuccess: (ctx) => {
            alert("Account successfully created! YAY");
            redirect('/dashboard');
        },
        onError: (ctx) => {
            alert(ctx.error.message);
        },
    });
  }

  function showLogin() {
    redirect("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.chevron}>
        <button onClick={showLogin}>Go back</button>
      </div>
      <div className={styles.card}>
        <form action={verifyData}>
          <h1>Register</h1>
          <div className={styles.icon}>
            <FontAwesomeIcon size="6x" icon={faCircleInfo}/>
          </div>
          <div className={styles.inputPair}>
            <span>Your name:</span>
            <input type="text" placeholder="Erling Haaland" name="name" required />
          </div>
          <div className={styles.inputPair}>
            <span>Your username:</span>
            <input type="text" placeholder="duBistGutGENUUUUUUUUG" name="username" required />
          </div>
          <div className={styles.inputPair}>
            <span>Your email:</span>
            <input type="text" placeholder="tooManyGoalsWOW@example.de" name="email" required />
          </div>
          <div className={styles.inputPair}>
            <span>Your password:</span>
            <input type="password" placeholder="**********" name="password" minLength={8} required />
          </div>
          <div className={styles.inputTerms}>
            <input type="checkbox" id="terms"/>
            <label>I accept the terms and also the cookies.</label>
          </div>
          <button type="submit">Create account</button>
        </form>
      </div>
    </div>
  );
}