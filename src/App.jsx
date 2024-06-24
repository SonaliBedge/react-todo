// import React, { useState } from "react";
import TodoContainer from "./components/TodoContainer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import logo from "./media/dark-mode.png"
import "./App.css";

function App() {
  // Get environment variables
  const tableName = import.meta.env.VITE_TABLE_NAME;
  const tableAPIToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const tableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

 // State variables for dark mode
  // const [darkMode, setDarkMode] = useState(false);
  // const [backgroundImage, setBackgroundImage] = useState(
  //   "url('./media/Background-img.jpg')"
  // );
  // const [textColor, setTextColor] = useState("#000");
  // const [backgroundColor, setBackgroundColor] = useState("#fff");

  // // Function to toggle dark mode
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  //   if (darkMode) {
  //     setBackgroundImage("url('./media/Background-img.jpg')");
  //     setTextColor("#000");
  //     setBackgroundColor("#fff");
  //   } else {
  //     setBackgroundImage("url('./media/darkmode-mountain-background-img.jpg')");
  //     setTextColor("#fff");
  //     setBackgroundColor("#222");
  //   }
  // };

  // Render component
  return (
    <BrowserRouter>
      {/* Navigation bar */}
      {/* <button id="dark-mode-button" onClick={toggleDarkMode}> <img src={logo} alt="Logo" width="25px" height="25px" /> </button> */}
      <nav className="nav">
        <Link to="/" className="nav-link">
       
          Todo list
        </Link>

        <Link to="/TodoContainer" className="nav-link">
          Add New Todo Item
        </Link>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Index route */}
        <Route
          index
          element={
            <>
              <TodoContainer
                tableName={tableName}
                tableAPIToken={tableAPIToken}
                tableBaseId={tableBaseId}
              />
            </>
          }
        />

        {/* TodoContainer route */}
        <Route
          path="/TodoContainer"
          element={
            <>
              <TodoContainer
                tableName={tableName}
                tableAPIToken={tableAPIToken}
                tableBaseId={tableBaseId}
              />
            </>
          }
        />
      </Routes>
      {/* Footer */}
      <footer>
        <div>
          <h5>Built by Sonali Bedge</h5>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
