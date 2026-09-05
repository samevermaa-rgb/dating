
"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const places = [
  "Delhi 🏙️",
  "Park 🌳",
  "Movie 🎬",
  "Ya akele me milna chaoge 🫣💕",
];

export default function DatePage() {
  const router = useRouter();

  const handlePlaceSelect = (place: string) => {
  localStorage.setItem("selectedPlace", place);

    router.push("/food");
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.emoji}>📍💕</div>

        <h1>Toh batao...</h1>

        <p>Kahan milna pasand karoge? 🫣</p>

        <div className={styles.options}>
          {places.map((place) => (
            <button
              key={place}
              onClick={() => handlePlaceSelect(place)}
            >
              {place}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

