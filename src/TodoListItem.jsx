// Added "Remove"Button to List Items

function TodoListItem({ todo, onRemoveTodo }) {
  const { title, url } = todo;
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li>
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
export default TodoListItem;
