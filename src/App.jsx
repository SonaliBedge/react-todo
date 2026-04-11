import { useState, useEffect } from "react";
import TodoContainer from "./components/TodoContainer";
import ThemeToggle from "./components/ThemeToggle";
import UsernamePrompt from "./components/UsernamePrompt";
import InstallPrompt from "./components/InstallPrompt";
import Background from "./components/Background";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const tableName = import.meta.env.VITE_TABLE_NAME;
  const tableAPIToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const tableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );
  const [username, setUsername] = useState(
    () => localStorage.getItem("username") || ""
  );

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleSetUsername = (name) => {
    localStorage.setItem("username", name);
    setUsername(name);
  };

  const handleChangeUsername = () => {
    const newName = window.prompt("Enter your new name:", username);
    if (newName && newName.trim()) {
      handleSetUsername(newName.trim());
    }
  };

  if (!username) {
    return (
      <>
        <Background />
        <UsernamePrompt onSubmit={handleSetUsername} />
      </>
    );
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Background />
      <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode((prev) => !prev)} />
      <InstallPrompt />
      <div className="userBadge">
        <span className="userBadgeName">Hi, {username}</span>
        <button className="userBadgeChange" onClick={handleChangeUsername} title="Change name">✏️</button>
      </div>
      <Routes>
        <Route
          index
          element={
            <TodoContainer
              tableName={tableName}
              tableAPIToken={tableAPIToken}
              tableBaseId={tableBaseId}
              username={username}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
