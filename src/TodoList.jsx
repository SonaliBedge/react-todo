import * as React from "react";

const todoList = [
    {
        objectID : 1,
        title : 'Hello React',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
    },
    {
        objectID : 2,
        title : 'Project Setup',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
    },
    {
        objectID : 3,
        title : 'React Components',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
    },
    {
        objectID : 4,
        title : 'React DOM',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
    },
    {
        objectID : 5,
        title : 'Lists in React',
        url: "https://reactjs.org/",
        author: "Jordan Walke",
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
            <span> : {item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </li>
        );
      })}
    </ul>
    </div>
  );
}

export default TodoList;
