function TodoListItem({ todo}) {
  const { title, author, num_comments, points, url } = todo
  // const { todo } = props;
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span> {author}</span>
      <span> {num_comments}</span>
      <span> {points}</span>
    </li>
  );
}
export default TodoListItem;
