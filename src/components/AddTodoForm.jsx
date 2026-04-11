//Refactor Input with Label to use Component Composition

import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ addTodo }) {
  // Define state variables
  const [todoTitle, setTodoTitle] = React.useState("");
  const [touched, setTouched] = React.useState(false);

  // Handle changes to todoTitle state variable
  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  // Handle submission of new todo
  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() !== "") {
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
      CompletedAt: null,
    };
    addTodo(newTodo);
    setTodoTitle("");
    setTouched(false);
  }
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
            onBlur={() => setTouched(true)}
          >
            Title:
          </InputWithLabel>
        </span>

        {/* Validation message */}
        {touched && todoTitle.trim() === "" && (
          <p className={style.validationMessage}>Title is required.</p>
        )}
        <br />

        {/* Submit button */}
        <input type="submit" value="Add" className={style.formButton} disabled={todoTitle.trim() === ""}/>
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
