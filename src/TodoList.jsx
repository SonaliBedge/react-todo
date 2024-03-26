import * as React from "react";
import TodoListItem from "./TodoListItem";

function TodoList({ todoList }) {
  // const { todoList } = props;
  return (
    <div>
      <h1>Todo List</h1>
      <hr />
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
