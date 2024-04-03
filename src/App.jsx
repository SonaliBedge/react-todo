
import * as React from "react";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import "./App.css";

const useSemiPersistentState = () => {
  const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
  // const savedTodoList = JSON.stringify(localStorage.getItem('savedTodoList')) || [];
  const [todoList, setTodoList] = React.useState(savedTodoList); // Create new state variable named todoList with setter setTodoList and default value of an empty Array
//Define a useEffect react hool with todoList as a dependency
React.useEffect(() => {
  localStorage.setItem('savedTodoList', JSON.stringify(todoList));
},[todoList]
);
// return [todoList, setTodoList];
return [todoList, setTodoList];
};
function App() {
   const [todoList, setTodoList] = useSemiPersistentState(); // Create new state variable named todoList with setter setTodoList and default value of an empty Array
   const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };
  return (
    <React.Fragment>
    <div>
      <hr />
      <TodoList todoList={todoList} />{" "}
      {/* Pass todoList state as a prop named todoList to the TodoList component*/}
      <hr />
      <AddTodoForm addTodo={addTodo} />
    </div>
    </React.Fragment>
  );
}

export default App;
