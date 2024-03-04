function AddTodoForm() {
    return (
        <div>
            <hr />
            <h1>Form</h1>
            <hr />
            <form>
            <span><label htmlFor="todoTitle">
                    Title  :   <input type="text" name="name" id="todoTitle"/>
                    
                </label></span>         
                <hr />
                
                <input type="submit" value="Add" />
            </form>
        </div>
    )
    
}
export default AddTodoForm;