import * as React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div className={style.Container}>
      <h1 className={style.TitleFont}>Todo List</h1>
      <hr />
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
