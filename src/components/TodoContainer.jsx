import { useState, useEffect, useRef } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import "../App.css";
import PropTypes from "prop-types";

function TodoContainer({ tableName, tableAPIToken, tableBaseId }) {
  // Define state variables
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("Title");
  const [errorMessage, setErrorMessage] = useState(null);
  const errorTimerRef = useRef(null);

  // Show error message and auto-clear after 4 seconds
  const showError = (message) => {
    if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    setErrorMessage(message);
    errorTimerRef.current = setTimeout(() => setErrorMessage(null), 4000);
  };

  // Fetch data from Airtable API when sortOrder or sortBy state variables change
  useEffect(() => {
    fetchData();
  }, [sortOrder, sortBy]);

  // Fetch data from Airtable API
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tableAPIToken}`,
      },
    };

    const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}?view=Grid%20view&sort[0][field]=${sortBy}&sort[0][direction]=${sortOrder}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();

      // Map data to todoList state variable
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title,
        CompletedAt: todo.fields.CompletedAt,
      }));

      // Update state variables
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      showError("Failed to load todos. Please try again.");
      setIsLoading(false);
    }
  };

  // Add new todo to Airtable API
  const addTodo = async (newTodo) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tableAPIToken}`,
        },
        body: JSON.stringify({
          fields: {
            Title: newTodo.title,
            CompletedAt: newTodo.CompletedAt,
          },
        }),
      };

      const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error adding todo: ${response.status}`);
      }
      const data = await response.json();

      // Map response to addedTodo
      const addedTodo = {
        id: data.id,
        title: data.fields.Title,
        CompletedAt: data.fields.CompletedAt,
      };

      // Update todoList state variable
      setTodoList((prev) => {
        const updatedList = [...prev, addedTodo];
        updatedList.sort((a, b) => {
          return new Date(a.CompletedAt) - new Date(b.CompletedAt);
        });
        return updatedList;
      });
    } catch (error) {
      showError("Failed to add todo. Please try again.");
    }
  };

  // Update sortOrder state variable
  const toggleSort = (sortValue) => {
    setSortOrder(sortValue);
  };

  // Update sortBy state variable
  const toggleSortBy = (sortByValue) => {
    setSortBy(sortByValue);
  };

  // Toggle complete status in Airtable API
  const toggleComplete = async (id, isCompleted) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tableAPIToken}`,
        },
        body: JSON.stringify({
          fields: { CompletedAt: isCompleted ? null : today },
        }),
      };

      const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/${id}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error updating todo: ${response.status}`);
      }

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? { ...todo, CompletedAt: isCompleted ? null : today }
            : todo
        )
      );
    } catch (error) {
      showError("Failed to update todo. Please try again.");
    }
  };

  // Update todo in Airtable API
  const updateTodo = async (id, newTitle) => {
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tableAPIToken}`,
        },
        body: JSON.stringify({
          fields: { Title: newTitle },
        }),
      };

      const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/${id}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error updating todo: ${response.status}`);
      }

      setTodoList((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle } : todo
        )
      );
    } catch (error) {
      showError("Failed to edit todo. Please try again.");
    }
  };

  // Remove todo from Airtable API
  const removeTodo = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tableAPIToken}`,
        },
      };

      const url = `https://api.airtable.com/v0/${tableBaseId}/${tableName}/${id}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error deleting todo: ${response.status}`);
      }

      // Update todoList state by filtering out the removed todo
      setTodoList((prev) => prev.filter((todo) => id !== todo.id));
    } catch (error) {
      showError("Failed to delete todo. Please try again.");
    }
  };

  // Render component
  return (
    <>
      {/* <h1>{tableName}</h1> */}

      {/* Error banner */}
      {errorMessage && (
        <div className="errorBanner">
          {errorMessage}
          <button className="errorClose" onClick={() => setErrorMessage(null)}>✕</button>
        </div>
      )}

      <AddTodoForm addTodo={addTodo} />

      {/* Show loading message if isLoading state variable is true */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            onUpdateTodo={updateTodo}
            onToggleComplete={toggleComplete}
            sortOrderValue={sortOrder}
            onChangeSortOrder={toggleSort}
            onChangeSortBy={toggleSortBy}
            sortByValue={sortBy}
          />
        </>
      )}

      <div>
        <h5>Built by Sonali Bedge</h5>
        <a href="mailto:bedgesonali@yahoo.com" target="_blank" rel="noreferrer">
          <img
            width="40"
            height="40"
            src="./media/mail_img.png"
            alt="secured-letter"
          />
        </a>
        <a href="https://github.com/SonaliBedge" target="_blank" rel="noreferrer">
          <img
            width="40"
            height="40"
            alt="GitHub"
            src="./media/github--v1.png"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/sonali-bedge-488a07155/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            width="40"
            height="40"
            alt="linkedin"
            src="./media/linkedin--v2.png"
          />
        </a>
      </div>
    </>
  );
}

// Define prop types for TodoContainer component
TodoContainer.propTypes = {
  // addTodo: PropTypes.func,
  tableName: PropTypes.string.isRequired,
  tableBaseId: PropTypes.string.isRequired,
  tableAPIToken: PropTypes.string.isRequired,
};
export default TodoContainer;
