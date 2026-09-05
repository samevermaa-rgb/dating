
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function QuestionPage() {
  const router = useRouter();

  const [noPosition, setNoPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const moveNoButton = () => {
    const buttonWidth = 120;
    const buttonHeight = 55;
    const padding = 20;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const newLeft =
      padding + Math.random() * Math.max(0, maxX - padding);

    const newTop =
      padding + Math.random() * Math.max(0, maxY - padding);

    setNoPosition({
      top: newTop,
      left: newLeft,
    });
  };

  const handleYes = () => {
    router.push("/date-question");
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.emoji}>🥺💕</div>

        <h1>Appse kuch puchna tha...</h1>

        <p>Puch lu? 👉👈</p>

        <div className={styles.buttons}>
          <button
            className={styles.yesButton}
            onClick={handleYes}
          >
            Yes ❤️
          </button>

          <button
            className={
              noPosition
                ? `${styles.noButton} ${styles.moving}`
                : styles.noButton
            }
            style={
              noPosition
                ? {
                    top: noPosition.top,
                    left: noPosition.left,
                  }
                : undefined
            }
            onMouseEnter={moveNoButton}
            onClick={moveNoButton}
          >
            No 😏
          </button>
        </div>
      </div>
    </main>
  );
}

