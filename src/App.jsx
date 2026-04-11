import TodoContainer from "./components/TodoContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  // Get environment variables
  const tableName = import.meta.env.VITE_TABLE_NAME;
  const tableAPIToken = import.meta.env.VITE_AIRTABLE_API_TOKEN;
  const tableBaseId = import.meta.env.VITE_AIRTABLE_BASE_ID;
  // Render component
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
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
