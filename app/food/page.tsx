
"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const foodOptions = [
  "Chaowmin 🍜",
  "Chilli-Ptato 🥔🌶️",
  "Momos 🥟",
  "Chole-Bhature 🥘",
  "Chole-Kulche 🫓",
  "Cake 🍰",
  "Icecream 🍦",
];

export default function FoodPage() {
  const router = useRouter();

 const handleFoodSelect = (food: string) => {
  localStorage.setItem("selectedFood", food);

    router.push("/date-select");
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.emoji}>🍽️💕</div>

        <h1>Achha ye batao...</h1>

        <p>Date par kya khana hai? 🫣</p>

        <div className={styles.options}>
          {foodOptions.map((food) => (
            <button
              key={food}
              onClick={() => handleFoodSelect(food)}
            >
              {food}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

