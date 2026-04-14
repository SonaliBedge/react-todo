//Refactor Input with Label to use Component Composition

import * as React from "react";
import InputWithLabel from "./InputWithLabel";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

function AddTodoForm({ addTodo }) {
  // Define state variables
  const [todoTitle, setTodoTitle] = React.useState("");
  const [touched, setTouched] = React.useState(false);
  const [priority, setPriority] = React.useState("Priority 3");
  const [deadline, setDeadline] = React.useState(new Date().toISOString().split("T")[0]);

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
        Priority: priority,
        Deadline: deadline,
      };
      addTodo(newTodo);
      setTodoTitle("");
      setPriority("Priority 3");
      setDeadline(new Date().toISOString().split("T")[0]);
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

        {/* Priority and Deadline on same row */}
        <div className={style.formMetaRow}>
          <div className={style.priorityRow}>
            <label htmlFor="priority" className={style.sortLabel}>Priority:</label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className={style.toggleSelect}
            >
              <option value="Priority 1">Priority 1</option>
              <option value="Priority 2">Priority 2</option>
              <option value="Priority 3">Priority 3</option>
              <option value="Priority 4">Priority 4</option>
              <option value="Priority 5">Priority 5</option>
            </select>
          </div>

          <div className={style.priorityRow}>
            <label htmlFor="deadline" className={style.sortLabel}>Deadline:</label>
            <input
              type="date"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className={style.toggleSelect}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
        </div>

        {/* Submit button */}
        <input type="submit" value="Add" className={style.formButton} disabled={todoTitle.trim() === ""}/>
      </form>
    </div>
  );
}

// Define prop types for AddTodoForm component
AddTodoForm.propTypes = {
  addTodo: PropTypes.func,
};
export default AddTodoForm;
