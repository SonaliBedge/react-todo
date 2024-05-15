import style from "./TodoListItem.module.css";
import { useRef, useEffect } from "react";

function InputWithLabel(props) {
  const { isFocused, children, type, name, id, todoTitle, handleTitleChange } =
    props;

  const inputRef = useRef();
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
    <div className={ style.FormLink}>
      <label htmlFor={id}>{children} </label>

      <input
        ref={inputRef}
        type={type}
        name={name}
        id={id}
        value={todoTitle}
        onChange={handleTitleChange}
      />
      </div>
    </>
  );
}

export default InputWithLabel;
