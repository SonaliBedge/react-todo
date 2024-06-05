// import * as React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from "prop-types"
function TodoList({ todoList, onRemoveTodo }) {
  return (
    <div>
      <h1>Todo List</h1>
      <hr />
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </div>
  );
}
TodoList.propTypes = {
  todoList: PropTypes.object,
  onRemoveTodo: PropTypes.func
};
export default TodoList;
