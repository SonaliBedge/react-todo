import * as React from "react";

const todoList = [
    {
        objectID : 1,
        title : 'React',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
        num_comments: 3,
        points: 4,
    },
    {
        objectID : 2,
        title : 'Redux',
        url: "https://redux.js.org/",
        author: "Dan Abramov, Andrew Clark",
        num_comments: 2,
        points: 5,
    },
    {
        objectID : 3,
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
      {todoList.map(function (item) {
        return (
          <li key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span> {item.author}</span>
            <span> {item.num_comments}</span>
            <span> {item.points}</span>
          </li>
        );
      })}
    </ul>
    </div>
  );
}

export default TodoList;
