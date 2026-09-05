
"use client";

import { useState } from "react";
import styles from "./page.module.css";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DateSelectPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  ).getDay();

  const daysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const goToPreviousMonth = () => {
    setSelectedDate(null);

    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const goToNextMonth = () => {
    setSelectedDate(null);

    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  

const handleDateSelect = async (day: number) => {
  setSelectedDate(day);

  const selectedDate = new Date(
    currentYear,
    currentMonth,
    day
  );

  const food = localStorage.getItem("selectedFood");
  const place = localStorage.getItem("selectedPlace");

  if (!food || !place) {
    console.error("Food or place is missing");
    return;
  }

  try {
    const response = await fetch("/api/save-date", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        food,
        place,
        date: selectedDate.toISOString(),
      }),
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch {
      console.error(
        "Server returned invalid JSON:",
        text
      );
      return;
    }

    if (!response.ok || !data.success) {
      console.error(
        "Save failed:",
        data.message
      );
      return;
    }

    console.log(
      "Saved to MongoDB:",
      data.id
    );
  } catch (error) {
    console.error(
      "Failed to save:",
      error
    );
  }
};




  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.emoji}>📅💕</div>

        <h1>Toh ek date choose karo...</h1>

        <p>Hamari date kab honi chahiye? 🫣</p>

        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button onClick={goToPreviousMonth}>‹</button>

            <h2>
              {months[currentMonth]} {currentYear}
            </h2>

            <button onClick={goToNextMonth}>›</button>
          </div>

          <div className={styles.weekDays}>
            {weekDays.map((day) => (
              <span key={day}>{day}</span>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((day, index) =>
              day === null ? (
                <span
                  key={`empty-${index}`}
                  className={styles.empty}
                />
              ) : (
                <button
                  key={day}
                  className={
                    selectedDate === day
                      ? styles.selectedDay
                      : styles.day
                  }
                  onClick={() => handleDateSelect(day)}
                >
                  {day}
                </button>
              )
            )}
          </div>
        </div>

        {selectedDate && (
          <div className={styles.loveMessage}>
            <div className={styles.messageEmoji}>❤️</div>

            <p>I love you so much Sugli 😘</p>

            <span>
              {selectedDate} {months[currentMonth]} {currentYear}
              💕
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

