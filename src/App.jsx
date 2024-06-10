import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  // useEffect(() => {
  //   console.log("sort", sortOrder);
  // }, [sortOrder]);

  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    let sortField;
    let i;
    if (sortOrder === "CompletedAt") {
      sortField = "CompletedAt";
      i = 1;
    } else {
      i = 0;
      sortField = "Title";
    }

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=${sortField}&sort[0][direction]=${sortOrder}`;

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      console.log(data.records);
      data.records.sort((objectA, objectB) => {
        const titleA = objectA.fields.Title.toLowerCase();
        const titleB = objectB.fields.Title.toLowerCase();
        console.log(objectB.fields);
        if (sortOrder === "asc") {
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        } else {
          if (titleA < titleB) return 1;
          if (titleA > titleB) return -1;
          return 0;
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
          },
        }),
      };

      const url = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error has occurred: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();

      const addTodo = {
        id: data.id,
        title: data.fields.Title,
      };

      setTodoList([...todoList, addTodo]);
    } catch (error) {
      console.error("Error adding todo:", error.message);
    }
  };
  const toggleSort = (sortValue) => {
    setSortOrder(sortValue);
  };
  const togglesort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };
  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodoList);
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
                    onClick={togglesort}
                    onChangeSortOrder={toggleSort}
                    sortOrder={sortOrder}
                  />
                  {/* <button type="button" onClick={togglesort}>
                    Sort
                  </button> */}
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

{
  /* <TodoList
todoList={todoList}
onRemoveTodo={removeTodo}
onClick={togglesort}
/> */
}
