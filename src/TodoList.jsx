// Imports
import { TodoItem } from "./TodoItem.jsx"

export function TodoList({ todos, toggleTodo, deleteTodo }) {
    
    // Returns the JSX component
    return (
        <ul className="list">
        {todos.length === 0 && "No Todos"}
        {todos.map(todo => {
            return (
                <TodoItem
                    {...todo}
                    key ={todo.id}
                    title = {todo.itemText}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            )
        })}
        </ul>
    )

}
