import { useState } from "react";
import style from "./UsernamePrompt.module.css";

function UsernamePrompt({ onSubmit }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed) onSubmit(trimmed);
  };

  return (
    <div className={style.overlay}>
      <div className={style.card}>
        <h2 className={style.heading}>Welcome to your Todo List</h2>
        <p className={style.subtext}>Enter your name to get started. Your todos will be saved to your name so you can access them from any device.</p>
        <form onSubmit={handleSubmit} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={50}
          />
          <button
            className={style.button}
            type="submit"
            disabled={name.trim() === ""}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
}

export default UsernamePrompt;
