import * as React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

const todoListStorageKey = "savedTodoList";
function App() {
  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  React.useEffect(() => {
    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            data: {
              todoList:
                JSON.parse(localStorage.getItem(todoListStorageKey)) || [],
            },
          }),
        2000
      );
    }).then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }, []);

  React.useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(todoListStorageKey, JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodoList);
  };

  return (
    <>
      <hr />

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          <hr />
        </>
      )}
      <AddTodoForm addTodo={addTodo} />
    </>
  );
}

export default App;
