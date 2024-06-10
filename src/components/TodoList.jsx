// import * as React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
function TodoList({
  todoList,
  onRemoveTodo,
  onClick,
  sortOrder,
  onChangeSortOrder,
}) {
  // function TodoList({ todoList, onRemoveTodo }) {
  const handleSortChange = (e) => {
    onChangeSortOrder(e.target.value);
  };
  return (
    <div className={style.Container}>
      <h1 className={style.TitleFont}>Todo List</h1>
      <hr />
      <button type="button" className={style.toggleButton} onClick={onClick}>
        Sort
      </button>
      <select value={sortOrder} onChange={handleSortChange} className={style.toggleSelect} >
        <option value="asc">Sort By</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
        <option value="CompletedAt">Created Date</option>
      </select>
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
  onRemoveTodo: PropTypes.func,
  onClick: PropTypes.func,
  onChangeSortOrder: PropTypes.func,
  sortOrder: PropTypes.string.isRequired,
  // sortOrder: PropTypes.oneof(["asc", "desc", "createdDate"])
};
export default TodoList;
