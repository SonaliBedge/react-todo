// import React, { useState } from "react";
import TodoContainer from "./components/TodoContainer";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  // Get environment variables
  const tableName = import.meta.env.VITE_TABLE_NAME;
  const tableAPIToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const tableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;

  // Render component
  return (
    <BrowserRouter>
      {/* Navigation bar */}
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
