// Added "Remove" and "Edit" buttons to List Items
import { useState } from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo, onToggleComplete }) {
  const { title, CompletedAt } = todo;
  const isCompleted = !!CompletedAt;

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleRemoveTodo = () => {
    if (window.confirm(`Delete "${title}"?`)) {
      onRemoveTodo(todo.id);
    }
  };

  const handleEditClick = () => {
    setEditTitle(title);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim() !== "" && editTitle !== title) {
      onUpdateTodo(todo.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setIsEditing(false);
  };

  // Render component
  return (
    <li className={style.ListLink}>
      <div className={style.ListContainer}>
        {isEditing ? (
          /* Edit mode */
          <span className={style.editInputWrapper}>
            <input
              className={style.editInput}
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              autoFocus
            />
            <button className={style.saveButton} type="button" onClick={handleSave}>
              Save
            </button>
            <button className={style.cancelButton} type="button" onClick={handleCancel}>
              Cancel
            </button>
          </span>
        ) : (
          /* View mode */
          <span className={style.viewMode}>
            <input
              type="checkbox"
              className={style.checkbox}
              checked={isCompleted}
              onChange={() => onToggleComplete(todo.id, isCompleted)}
              aria-label={`Mark "${title}" as ${isCompleted ? "incomplete" : "complete"}`}
            />
            <span className={`${style.ListLink} ${isCompleted ? style.completed : ""}`}>
              {title}
            </span>
          </span>
        )}

        {!isEditing && (
          <span className={style.actionButtons}>
            {/* Edit button */}
            <button
              className={style.editButton}
              type="button"
              onClick={handleEditClick}
              title="Edit"
              aria-label={`Edit "${title}"`}
            >
              ✏️
            </button>

            {/* Remove button */}
            <button
              className={style.ListButton}
              type="button"
              onClick={handleRemoveTodo}
            >
              Remove
            </button>
          </span>
        )}
      </div>

      <hr className={style.ListHr} />
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    CompletedAt: PropTypes.string,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};
export default TodoListItem;
