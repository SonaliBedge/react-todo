import * as React from "react";
import TodoListItem  from "./TodoListItem";

const todoList = [
    {
        id : 1,
        title : 'React',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
    },
    {
        id : 2,
        title : 'Redux',
        url: "https://redux.js.org/",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
    },
    {
        id : 3,
        title : 'React Components',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
        num_comments: 2,
        points: 3,
    },
  ];
 
function TodoList() {
  return (
    <div>
        <h1>Todo List</h1>
        <hr />
        <ul>
           {todoList.map((todo) => 
            (
                <TodoListItem key={todo.id} todo={todo} />  
            ))}       
        </ul>       
    </div>
  );
}

export default TodoList;


