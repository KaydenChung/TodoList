// Imports
import { useState } from "react"

export function NewTodoForm({ onSubmit }) {

    // Hooks
    const [newItem, setNewItem] = useState("")



    // Helper Functions

    // Calls addTodo function
    function handleSubmit(e) {
        e.preventDefault()
        if(newItem === "") return

        onSubmit(newItem)

        setNewItem("")
    }
    


    // Returns the JSX component
    return (
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label className="form-label">New Item</label>
                <input
                    value={newItem}
                    onChange={e => setNewItem(e.target.value)}
                    type="text"
                    id="item"
                />
            </div>
            <button className="btn">Add</button>
        </form>
    )

}