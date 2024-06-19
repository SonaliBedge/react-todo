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
  // Handle change to sort order
  const handleSortChange = (event) => {
    onChangeSortOrder(event.target.value);
  };

  // Handle change to sort by field
  const handleSortByChange = (event) => {
    onChangeSortBy(event.target.value);
  };

  // Render component
  return (
    <div className={style.Container}>
      {/* Title */}
      <h1 className={style.TitleFont}>Todo List</h1>
      <hr />

      {/* Sort order dropdown */}
      <select
        value={sortOrderValue}
        onChange={handleSortChange}
        className={style.toggleSelect}
        
      >
        <option value="asc">Sort By</option>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>

      {/* Sort by field dropdown */}
      <select
        value={sortByValue}
        onChange={handleSortByChange}
        className={style.toggleSelect}
      >
        <option value="Title">Sort By Field</option>
        <option value="Title">Title</option>
        <option value="CompletedAt">Created Date</option>
      </select>

      {/* Todo list */}
      <ul>
        {todoList.map((todo) => (
          <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} />
        ))}
      </ul>
    </div>
  );
}
// Define prop types for TodoList component
TodoList.propTypes = {
  todoList: PropTypes.object,
  onRemoveTodo: PropTypes.func,
  onChangeSortOrder: PropTypes.func,
  onChangeSortBy: PropTypes.func,
  sortOrderValue: PropTypes.string.isRequired,
  sortByValue: PropTypes.string.isRequired,
};
export default TodoList;
