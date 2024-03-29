
import * as React from "react";

function AddTodoForm({ addTodo }) {
  const [todoTitle, setTodoTitle] = React.useState(""); //Creating new state variable named todoTitle with setter setTodoTitle
  const handleTitleChange = (event) => {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    console.log(todoTitle);
    const newTodo = {
      title: todoTitle,
      id: Date.now(), // Generate a unique identifier using Date.now()
    };
    addTodo(newTodo);
    console.log(newTodo);
    setTodoTitle(""); // Resetting todoTitle state to an empty string
  };

  return (
    <div>
      <hr />
      <h1>Form</h1>
      <hr />
      <form onSubmit={handleAddTodo}>
        <span>
          <label htmlFor="todoTitle">
            Title :{" "}
            <input
              type="text"
              name="title"
              id="todoTitle"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          </label>
        </span>
        <hr />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
}
export default AddTodoForm;
 
