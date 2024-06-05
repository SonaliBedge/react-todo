// Added "Remove"Button to List Items
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  const { title, url } = todo;
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li
      style={{
        textAlign: "left",
      }}
    >
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>
        <button type="button" onClick={handleRemoveTodo}>
          Remove
        </button>
      </span>
      <hr />
    </li>
  );
}
TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};
export default TodoListItem;
