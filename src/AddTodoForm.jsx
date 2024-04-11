//Refacor Input with Label to use Component Composition

import * as React from "react";
import InputWithLabel from "./InputWithLabel";

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
      <hr />
      <h1>Form</h1>
      <hr />
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
        <hr />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
export default AddTodoForm;
