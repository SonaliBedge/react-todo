
function AddTodoForm(props) {
    let todoTitle = "";

    const handleAddTodo = (event) => {
        event.preventDefault();
        const todoTitle = event.target.title.value; // Access input value directly
        // const todoTitle = event.currentTarget.elements.title.value;
        props.onAddTodo(todoTitle);  //I have error in this line
        console.log(todoTitle);
      };
      
    return (
      <div>
        <hr />
        <h1>Form</h1>
        <hr />
        <form onSubmit={handleAddTodo}>
          <span>
            <label htmlFor="todoTitle">
              Title : <input type="text" name="title" id="todoTitle" />
            </label>
          </span>
          <hr />
          <input type="submit" value="Add" />
        </form>
      </div>
    );
  }
  export default AddTodoForm;
  

