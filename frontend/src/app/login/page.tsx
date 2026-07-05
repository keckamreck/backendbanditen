'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { authClient } from "@/app/_lib/auth-client";
import styles from './page.module.css';

export default function Login() {
  async function verifyData(formData: FormData) {
    const emailInput = formData.get('username') as string;
    const passwordInput = formData.get('password') as string;
    
    const { data, error } = await authClient.signIn.email({
        email: emailInput,
        password: passwordInput,
        callbackURL: "/dashboard",
        rememberMe: false
    }, {
      //callbacks
    })

    const testtt = 0;

  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form action={verifyData}>
          <h1>BackendBanditen</h1>
          <div className={styles.icon}>
            <FontAwesomeIcon size="6x" icon={faCircleUser}/>
          </div>
          <input type="text" placeholder="Username" name="username" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}