export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
    
    // Returns the JSX component
    return (
        <li>
            <label>
            <input 
                type="checkbox" 
                checked={completed}
                onChange={e => toggleTodo(id, completed)}
            />
            {title}
            </label>
            <button
            onClick={() => deleteTodo(id)}
            className="btn btn-danger">
            Delete
            </button>
        </li>
    )

}
