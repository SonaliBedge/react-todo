// Created Reusable Input with Label Component
// Added Auto-Focus to Input

import * as React from "react";

function InputWithLabel(props) {
  const { isFocused, children, type, name, id, todoTitle, handleTitleChange } =
    props;
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <>
      <label htmlFor={id}>{children} </label>

      <input
        ref={inputRef}
        type={type}
        name={name}
        id={id}
        value={todoTitle}
        onChange={handleTitleChange}
      />
    </>
  );
}

export default InputWithLabel;
