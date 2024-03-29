
import * as React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

function App() {
  const [todoList, setTodoList] = React.useState([]); // Create new state variable named todoList with setter setTodoList and default value of an empty Array
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <div>
      <hr />
      <TodoList todoList={todoList} />{" "}
      {/* Pass todoList state as a prop named todoList to the TodoList component*/}
      <hr />
      <AddTodoForm addTodo={addTodo} />
    </div>

  );
}

export default App;
