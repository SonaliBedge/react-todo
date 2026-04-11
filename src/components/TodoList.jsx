import TodoListItem from "./TodoListItem";
import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";
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

      {/* Sort by field dropdown */}
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
      </select>

      {/* Todo list */}
      {todoList.length === 0 ? (
        <p className={style.emptyState}>No todos yet — add one!</p>
      ) : (
        <ul className={style.todoUl}>
          {todoList.map((todo) => (
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
