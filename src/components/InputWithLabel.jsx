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
  onBlur,
}) {
  // Create a ref for the input element
  const inputRef = useRef();

   // Set focus on input element if isFocused prop is true
  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  // Render component
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
          onBlur={onBlur}
          placeholder="Enter todo title..."
        />
      </div>
    </>
  );
}

// Define prop types for InputWithLabel component
InputWithLabel.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  children: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  todoTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
};
export default InputWithLabel;
