// Added "Remove"Button to List Items
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  // Extract title and url from todo object
  const { title, url } = todo;

  // Handle removal of todo item
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  // Render component
  return (
    <li className={style.ListLink}>
      {/* Todo item container */}
      <div className={style.ListContainer}>
        <span>
          <a href={url} className={style.ListLink}>
            {title}
          </a>
        </span>

        {/* Remove button */}
        <span>
          <button
            className={style.ListButton}
            type="button"
            onClick={handleRemoveTodo}
          >
            Remove
          </button>
        </span>
      </div>

       {/* Horizontal rule */}
      <hr className={style.ListHr} />
    </li>
  );
}

// Define prop types for TodoListItem component
TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};
export default TodoListItem;
