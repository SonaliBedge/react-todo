function AddTodoForm() {
    return (
        <div>
            <h1>Form</h1>
            <hr />
            <form>
            <span><label htmlFor="todoTitle">
                    Title  :   <input type="text" name="name" id="todoTitle"/>
                    
                </label></span>         
                <br />
                <input type="submit" value="Add" />
            </form>
        </div>
    )
    
}
export default AddTodoForm;