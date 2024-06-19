//Refacor Input with Label to use Component Composition

import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ addTodo }) {
  // Define state variables
  const [todoTitle, setTodoTitle] = React.useState("");

  // Handle changes to todoTitle state variable
  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  // Get current date and format it as "YYYY-MM-DD"
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Note: month is zero-based, so January is 0
  const year = today.getFullYear();
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  // Handle submission of new todo
  const handleAddTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
      CompletedAt: formattedDate,
    };
    addTodo(newTodo);
    setTodoTitle("");
  };

   // Render component
  return (
    <div>
      {/* Heading */}
      <h3>Add New Todo List</h3>
      <form onSubmit={handleAddTodo}>

        {/* Input field */}
        <span>
          <InputWithLabel
            type="text"
            name="title"
            id="todoTitle"
            isFocused
            todoTitle={todoTitle}
            handleTitleChange={handleTitleChange}
          >
            Title:
          </InputWithLabel>
        </span>
        <br />

        {/* Submit button */}
        <input type="submit" value="Add" className={style.formButton} />
        <br />
      </form>
    </div>
  );
}

// Define prop types for AddTodoForm component
AddTodoForm.propTypes = {
  addTodo: PropTypes.func,
};
export default AddTodoForm;
