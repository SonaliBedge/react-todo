import { useState, useEffect } from "react";
import AddTodoForm from "./AddTodoForm";
import TodoList from "./TodoList";
import "../App.css";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

function TodoContainer({ tableName, tableAPIToken, tableBaseId }) {
  // Define state variables
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("Title");
  const [showAddTodoForm, setShowAddTodoForm] = useState(false);

  // Getting current location using React Router's useLocation hook
  const location = useLocation();

  // Fetch data from Airtable API when sortOrder or sortBy state variables change
  useEffect(() => {
    fetchData();
  }, [sortOrder, sortBy]);

  // Show or hide AddTodoForm based on current location
  useEffect(() => {
    if (location.pathname === "/TodoContainer") {
      setShowAddTodoForm(true);
    } else {
      setShowAddTodoForm(false);
    }
    
  }, [location , showAddTodoForm]);

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

      // Sort data based on sortOrder and sortBy state variables
      data.records.sort((objectA, objectB) => {
        const fieldA = objectA.fields[sortBy];
        const fieldB = objectB.fields[sortBy];
        if (sortOrder === "asc") {
          return fieldA.localeCompare(fieldB);
        } else if (sortOrder === "desc") {
          return fieldB.localeCompare(fieldA);
        }
      });

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
      console.log(error.message);
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

      // Map new todo to addTodo state variable
      const addTodo = {
        id: data.id,
        title: data.fields.Title,
        CompletedAt: data.fields.CompletedAt,
      };

      // Update todoList state variable
      setTodoList((todoList) => {
        const updatedList = [...todoList, addTodo];
        updatedList.sort((a, b) => {
          return new Date(a.CompletedAt) - new Date(b.CompletedAt);
        });
        return updatedList;
      });
    } catch (error) {
      console.error("Error adding todo:", error.message);
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
      setTodoList(todoList.filter((todo) => id !== todo.id));
    } catch (error) {
      console.error("Error deleting todo:", error.message);
    }
  };

  // Render component
  return (
    <>
      {/* <h1>{tableName}</h1> */}

      {/* Show AddTodoForm if showAddTodoForm state variable is true */}
      {showAddTodoForm && <AddTodoForm addTodo={addTodo} />}

      {/* Show loading message if isLoading state variable is true */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TodoList
            todoList={todoList}
            onRemoveTodo={removeTodo}
            sortOrderValue={sortOrder}
            onChangeSortOrder={toggleSort}
            onChangeSortBy={toggleSortBy}
            sortByValue={sortBy}
          />
        </>
      )}

      <div>
        <h5>Built by Sonali Bedge</h5>
        <a href="mailto:bedgesonali@yahoo.com" target="_blank">
          <img
            width="40"
            height="40"
            src="./src/media/mail_img.png"
            alt="secured-letter"
          />
        </a>
        <a href="https://github.com/SonaliBedge" target="_blank">
          <img
            width="40"
            height="40"
            alt="GitHub"
            src="./src/media/github--v1.png"
          />
        </a>
        <a
          href="https://www.linkedin.com/in/sonali-bedge-488a07155/"
          target="_blank"
        >
          <img
            width="40"
            height="40"
            alt="linkedin"
            src="./src/media/linkedin--v2.png"
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
