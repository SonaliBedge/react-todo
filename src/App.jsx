import { useState, useEffect } from "react";
import TodoContainer from "./components/TodoContainer";
import ThemeToggle from "./components/ThemeToggle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const tableName = import.meta.env.VITE_TABLE_NAME;
  const tableAPIToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const tableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
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

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ThemeToggle isDarkMode={isDarkMode} onToggle={() => setIsDarkMode((prev) => !prev)} />
      <Routes>
        <Route
          index
          element={
            <TodoContainer
              tableName={tableName}
              tableAPIToken={tableAPIToken}
              tableBaseId={tableBaseId}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
