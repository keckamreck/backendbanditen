'use client';

import { redirect } from 'next/navigation'
import styles from './page.module.css'

function Login() {
  function verifyData(formData: FormData){
    alert(`Redirecting...`);
    redirect('/');
  }

  return (
    <form className={styles.container} action={verifyData}>
      <h1>BackendBanditen</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;