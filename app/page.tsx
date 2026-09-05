
"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();

  const handleNext = () => {
    router.push("/question");
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.emoji}>💕</div>

        <h1>How are you Baby?</h1>

        <div className={styles.options}>
          <button onClick={handleNext}>
            Jesi Hmesha Hoti Hu 😴
          </button>

          <button onClick={handleNext}>
            Thik hu ❤️
          </button>
        </div>
      </div>
    </main>
  );
}

