// Added "Remove" and "Edit" buttons to List Items
import { useState } from "react";
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo, onUpdateTodo, onToggleComplete }) {
  const { title, CompletedAt, Priority, Deadline } = todo;
  const isCompleted = !!CompletedAt;
  const today = new Date().toISOString().split("T")[0];

  const getDeadlineStyle = (deadline) => {
    if (isCompleted || !deadline) return "";
    if (deadline < today) return style.deadlineOverdue;
    if (deadline === today) return style.deadlineToday;
    return style.deadlineUpcoming;
  };

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editPriority, setEditPriority] = useState(Priority || "Medium");
  const [editDeadline, setEditDeadline] = useState(Deadline || "");

  const handleRemoveTodo = () => {
    if (window.confirm(`Delete "${title}"?`)) {
      onRemoveTodo(todo.id);
    }
  };

  const handleEditClick = () => {
    setEditTitle(title);
    setEditPriority(Priority || "Medium");
    setEditDeadline(Deadline || "");
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editTitle.trim();
    if (trimmed === "") return;
    const titleChanged = trimmed !== title;
    const priorityChanged = editPriority !== Priority;
    const deadlineChanged = editDeadline !== (Deadline || "");
    if (titleChanged || priorityChanged || deadlineChanged) {
      onUpdateTodo(
        todo.id,
        titleChanged ? trimmed : undefined,
        priorityChanged ? editPriority : undefined,
        deadlineChanged ? editDeadline : undefined
      );
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(title);
    setEditPriority(Priority || "Medium");
    setEditDeadline(Deadline || "");
    setIsEditing(false);
  };

  // Render component
  return (
    <li className={style.ListItem}>
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
            <select
              className={style.toggleSelect}
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              type="date"
              className={style.toggleSelect}
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
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
            {Priority && (
              <span className={`${style.priorityBadge} ${style[`priority${Priority}`]}`}>
                {Priority}
              </span>
            )}
            {Deadline && (
              <span className={`${style.deadlineBadge} ${getDeadlineStyle(Deadline)}`}>
                📅 {Deadline}
              </span>
            )}
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
    Priority: PropTypes.oneOf(["High", "Medium", "Low"]),
    Deadline: PropTypes.string,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
  onUpdateTodo: PropTypes.func.isRequired,
  onToggleComplete: PropTypes.func.isRequired,
};
export default TodoListItem;
