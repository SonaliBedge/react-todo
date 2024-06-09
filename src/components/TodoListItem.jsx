// Added "Remove"Button to List Items
import PropTypes from "prop-types";
import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  const { title, url } = todo;
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li  className={style.ListLink}>
       <div className={style.ListContainer}>
      <span>
        <a href={url} className={style.ListLink}>{title}</a>
      </span>
      <span >
        <button className={style.ListButton} type="button" onClick={handleRemoveTodo}>
          Remove
        </button>
      </span>
     
      </div>
      <hr className={style.ListHr} />
    </li>
  );
}
TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
};
export default TodoListItem;
