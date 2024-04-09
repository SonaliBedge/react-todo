import * as React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

const useSemiPersistentState = () => {
  const savedTodoList = JSON.parse(localStorage.getItem("savedTodoList")) || [];
  const [todoList, setTodoList] = React.useState(savedTodoList);
  React.useEffect(() => {
    localStorage.setItem("savedTodoList", JSON.stringify(todoList));
  }, [todoList]);
  return [todoList, setTodoList];
};

function App() {
  const [todoList, setTodoList] = useSemiPersistentState();
  const removeTodo = (id) => {
    const newTodoList = todoList.filter((todo) => id !== todo.id);
    setTodoList(newTodoList);
  };
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <>
      <hr />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo} /> <hr />
      <AddTodoForm addTodo={addTodo} />
    </>
  );
}

export default App;
