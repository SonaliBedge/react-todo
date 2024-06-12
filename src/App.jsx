import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("Title");

  useEffect(() => {
    fetchData();
  }, [sortOrder, sortBy]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=${sortBy}&sort[0][direction]=${sortOrder}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      data.records.sort((objectA, objectB) => {
        const fieldA = objectA.fields[sortBy];
        const fieldB = objectB.fields[sortBy];
        if (sortOrder === "asc") {
          return fieldA.localeCompare(fieldB);
        } else if (sortOrder === "desc") {
          return fieldB.localeCompare(fieldA);
        }
      });
      const todos = data.records.map((todo) => ({
        id: todo.id,
        title: todo.fields.Title,
        CompletedAt: todo.fields.CompletedAt,
      }));

      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({
          fields: {
            Title: newTodo.title,
            CompletedAt: newTodo.CompletedAt,
          },
        }),
      };

      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Error adding todo: ${response.status}`);
      }
      const data = await response.json();

      const addTodo = {
        id: data.id,
        title: data.fields.Title,
        CompletedAt: data.fields.CompletedAt,
      };
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

  const toggleSort = (sortValue) => {
    setSortOrder(sortValue);
  };

  const toggleSortBy = (sortByValue) => {
    setSortBy(sortByValue);
  };
  const removeTodo = async (id) => {
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}/${id}`;

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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
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
              <AddTodoForm addTodo={addTodo} />
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List </h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;