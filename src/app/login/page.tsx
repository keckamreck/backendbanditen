'use client';

import { redirect } from 'next/navigation'
import styles from './page.module.css'

function Login() {
  function verify(request){
    alert(`Redirecting...`);
    redirect('/');
  }

  return (
    <form className={styles.container} action={verify}>
      <h1>BackendBanditen</h1>
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" sname="password" />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;