import * as React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

function App() {
  const [newTodo, setNewTodo] = React.useState("");
  const handleAddTodo = (todo) => {
    // console.log(todo.target.name);
    
    setNewTodo(todo);
  };

  return (
    <div>
      <hr />
      <TodoList />
      <hr />
      <AddTodoForm onAddTodo = {handleAddTodo} />
      <p>New Todo : {newTodo}</p>
    </div>
  );
}

export default App;
