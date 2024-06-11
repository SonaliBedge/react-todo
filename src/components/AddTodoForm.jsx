//Refacor Input with Label to use Component Composition

import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ addTodo }) {
  const [todoTitle, setTodoTitle] = React.useState("");
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // Note: month is zero-based, so January is 0
  const year = today.getFullYear();

  // Formatting the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
    day < 10 ? "0" + day : day
  }`;

  const handleAddTodo = (event) => {
    event.preventDefault();
    // console.log(Date.now());
    const newTodo = {
      title: todoTitle,
      id: Date.now(),
      CompletedAt: formattedDate,
    };
    addTodo(newTodo);
    // console.log(newTodo);
    setTodoTitle("");
  };

  return (
    <div>
      <h3>Add New Todo List</h3>
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
AddTodoForm.propTypes = {
  addTodo: PropTypes.func,
};
export default AddTodoForm;
