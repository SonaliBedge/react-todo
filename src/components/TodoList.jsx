import { useState } from "react";
import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";

const FILTERS = ["All", "Active", "Completed"];

function TodoList({
  todoList,
  onRemoveTodo,
  onUpdateTodo,
  onToggleComplete,
  sortOrderValue,
  onChangeSortOrder,
  onChangeSortBy,
  sortByValue,
}) {
  const [activeFilter, setActiveFilter] = useState("All");

  // Handle change to sort order
  const handleSortChange = (event) => {
    onChangeSortOrder(event.target.value);
  };

  // Handle change to sort by field
  const handleSortByChange = (event) => {
    onChangeSortBy(event.target.value);
  };

  // Filter list based on active filter
  const filteredList = todoList.filter((todo) => {
    if (activeFilter === "Active") return !todo.CompletedAt;
    if (activeFilter === "Completed") return !!todo.CompletedAt;
    return true;
  });

  const emptyMessages = {
    All: "No todos yet — add one!",
    Active: "No active todos — all done!",
    Completed: "No completed todos yet.",
  };

  // Render component
  return (
    <div className={style.Container}>
      {/* Title */}
      <h1 className={style.TitleFont}>Todo List</h1>
      <hr />

      {/* Filter buttons */}
      <div className={style.filterGroup}>
        {FILTERS.map((filter) => (
          <button
            key={filter}
            className={`${style.filterButton} ${activeFilter === filter ? style.filterActive : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
            <span className={style.filterCount}>
              {filter === "All" && todoList.length}
              {filter === "Active" && todoList.filter((t) => !t.CompletedAt).length}
              {filter === "Completed" && todoList.filter((t) => !!t.CompletedAt).length}
            </span>
          </button>
        ))}
      </div>

      {/* Sort controls */}
      <div className={style.sortControls}>
        <label htmlFor="sortOrder" className={style.sortLabel}>Order:</label>
        <select
          id="sortOrder"
          value={sortOrderValue}
          onChange={handleSortChange}
          className={style.toggleSelect}
        >
          <option value="" disabled>Sort By</option>
          <option value="asc">Asc</option>
          <option value="desc">Desc</option>
        </select>

        <label htmlFor="sortField" className={style.sortLabel}>Field:</label>
        <select
          id="sortField"
          value={sortByValue}
          onChange={handleSortByChange}
          className={style.toggleSelect}
        >
          <option value="" disabled>Sort By Field</option>
          <option value="Title">Title</option>
          <option value="CompletedAt">Created Date</option>
          <option value="Priority">Priority</option>
        </select>
      </div>

      {/* Todo list */}
      {filteredList.length === 0 ? (
        <p className={style.emptyState}>{emptyMessages[activeFilter]}</p>
      ) : (
        <ul className={style.todoUl}>
          {filteredList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo} onToggleComplete={onToggleComplete} />
          ))}
        </ul>
      )}
    </div>
  );
}

// Define prop types for TodoList component
TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      CompletedAt: PropTypes.string,
      Priority: PropTypes.oneOf(["Priority 1", "Priority 2", "Priority 3", "Priority 4", "Priority 5"]),
      Deadline: PropTypes.string,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
  onChangeSortOrder: PropTypes.func.isRequired,
  onChangeSortBy: PropTypes.func.isRequired,
  sortOrderValue: PropTypes.string.isRequired,
  sortByValue: PropTypes.string.isRequired,
};
export default TodoList;
