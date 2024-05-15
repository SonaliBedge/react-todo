import style from "./TodoListItem.module.css";

function TodoListItem({ todo, onRemoveTodo }) {
  const { title, url } = todo;
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li className={style.ListItem}>
      <div className={style.ListContainer}>
        <span>
          <a href={url} className={style.ListLink}>
            {title}
          </a>
        </span>
        <span>
          <button
            type="button"
            className={style.ListButton}
            onClick={handleRemoveTodo}
          >
            Remove
          </button>
        </span>
      </div>
      <hr className={style.ListHr} />
    </li>
  );
}
export default TodoListItem;
