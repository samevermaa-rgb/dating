
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const messages = [
  "wo na... 🥺",
  "Mujhe puchna tha... 👉👈",
  "...... 🤔",
  "............. 😶",
  "ummmmmm.... 🫣",
  "😮‍💨",
  "chalo puch hi leta hu... 😌",
  ".......... 🙈",
  "aap mere sath date par chalna chaoge? 🫣💕",
];

const MESSAGE_DURATION = 1600;

export default function DateQuestionPage() {
  const router = useRouter();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [yesSize, setYesSize] = useState(1);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (currentIndex >= messages.length - 1) {
      const lastTimer = setTimeout(() => {
        setIsVisible(false);

        setTimeout(() => {
          setShowButtons(true);
        }, 400);
      }, MESSAGE_DURATION);

      return () => clearTimeout(lastTimer);
    }

    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, MESSAGE_DURATION - 400);

    const nextTimer = setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsVisible(true);
    }, MESSAGE_DURATION);

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, [currentIndex]);

  const handleNo = () => {
    setYesSize((prev) => prev + 0.35);
  };

  const handleYes = () => {
    setAccepted(true);

    setTimeout(() => {
      router.push("/date");
    }, 1200);
  };

  if (accepted) {
    return (
      <main className={styles.container}>
        <div className={`${styles.card} ${styles.successCard}`}>
          <div className={styles.successEmoji}>😁</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        {!showButtons && (
          <div
            className={`${styles.message} ${
              isVisible ? styles.show : styles.hide
            }`}
          >
            {messages[currentIndex]}
          </div>
        )}

        {showButtons && (
          <div className={styles.questionArea}>
            <p className={styles.finalQuestion}>
              Aapka answer? 🥺💕
            </p>

            <div className={styles.buttons}>
              <button
                className={styles.yesButton}
                style={{
                  transform: `scale(${yesSize})`,
                }}
                onClick={handleYes}
              >
                Yes ❤️
              </button>

              <button
                className={styles.noButton}
                onClick={handleNo}
              >
                No 🥺
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

