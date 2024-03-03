import * as React from 'react';
import TodoList from './TodoList';
import AddTodoForm from "./AddTodoForm";

function  App(){
  return (
    <div>
      
      <hr />
      <TodoList />
      <hr />
      <AddTodoForm />
    </div>
  );
}

export default App;


