import * as React from 'react';

const todoList = [
  {
    id : 1,
    title : 'Hello React',
  },
  {
    id : 2,
    title : 'Project Setup',
  },
  {
    id : 3,
    title : 'React Components',
  },
  {
    id : 4,
    title : 'JSX in React',
  },
  {
    id : 5,
    title : 'Lists in React',
  },
];

function App() {
  return (
    <div>
      <h1>Todo List</h1>

      <hr />
      <ul>
        {
          todoList.map(function(item){
            return <li>{item.id} : {item.title}</li>
          })
        }
      </ul>
    </div>
  );
}

export default App;

