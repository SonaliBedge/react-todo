//Refacor Input with Label to use Component Composition

import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";

function AddTodoForm({ addTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
    };
    addTodo(newTodo);
    console.log(newTodo);
    setTodoTitle("");
  };

  return (
    <div>
      {/* <hr /> */}
      <h3>Add New Todo List</h3>
      {/* <hr /> */}
      <form onSubmit={handleAddTodo}>
        <span>
          <InputWithLabel
            type="text"
            name="title"
            id="todoTitle"
            isFocused
            todoTitle={todoTitle}
            handleTitleChange={handleTitleChange}
          >
            <strong>Title:</strong>
          </InputWithLabel>
        </span>
        <br />
        <input type="submit" value="Add" className={style.ListButton} />
      </form>
    </div>
  );
}
export default AddTodoForm;
