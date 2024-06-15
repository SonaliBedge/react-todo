// import * as React from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
function TodoList({
  todoList,
  onRemoveTodo,
  sortOrderValue,
  onChangeSortOrder,
  onChangeSortBy,
  sortByValue,
}) {
  const handleSortChange = (e) => {
    onChangeSortOrder(e.target.value);
  };
  const handleSortByChange = (e) => {
    onChangeSortBy(e.target.value);
  };
  return (
    <div className={style.Container}>
      <h1 className={style.TitleFont}>Todo List</h1>
      <hr />
      <select
        value={sortOrderValue}
        onChange={handleSortChange}
        className={style.toggleSelect}
      >
        <option value="asc">Sort By</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <select
        value={sortByValue}
        onChange={handleSortByChange}
        className={style.toggleSelect}
      >
        <option value="Title">Sort By Field</option>
        <option value="Title">Title</option>
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
  onChangeSortOrder: PropTypes.func,
  onChangeSortBy: PropTypes.func,
  sortOrderValue: PropTypes.string.isRequired,
  sortByValue: PropTypes.string.isRequired,
};
export default TodoList;
