'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import { signIn } from '@/app/_lib/auth';
import styles from './page.module.css'

export default function Login() {
  const router = useRouter();

  async function verifyData(formData: FormData) {
    const response = await signIn(formData)

    if (response.ok) {
      router.push('/home')
      alert("Login successful!");
    } else {
      alert("WRONG PASSWORD!");
    }
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