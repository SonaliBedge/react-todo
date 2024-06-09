import style from "./TodoListItem.module.css";
import { useRef, useEffect } from "react";
import PropTypes from "prop-types";

function InputWithLabel({
  isFocused,
  children,
  type,
  name,
  id,
  todoTitle,
  handleTitleChange,
}) {
  const inputRef = useRef();
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <div className={style.FormLink}>
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
InputWithLabel.propTypes = {
  isFocused: PropTypes.bool,
  children: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  todoTitle: PropTypes.string,
  handleTitleChange: PropTypes.func,
};
export default InputWithLabel;
