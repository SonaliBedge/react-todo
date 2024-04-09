// Added "Remove"Button to List Items

function TodoListItem({ todo, onRemoveTodo }) {
  const { title, author, num_comments, points, url } = todo;
  const handleRemoveTodo = () => {
    onRemoveTodo(todo.id);
  };

  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span> {author}</span>
      <span> {num_comments}</span>
      <span> {points}</span>
      <span></span>
      <span>
        <button type="button" className="custom-button" onClick={handleRemoveTodo}>
          Remove
        </button>
      </span>
      <hr />
    </li>
  );
}
export default TodoListItem;
