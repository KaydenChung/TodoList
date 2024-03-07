// Imports
import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm.jsx"
import { TodoList } from "./TodoList.jsx"
import "./styles.css"
import { auth } from "../utilities/firebaseConfig.js";
import { fetchAllToDoItems } from "../utilities/database/FetchAllToDoItems.js";
import { storeToDoItem } from "../utilities/database/StoreToDoItem.js";
import { generateUniqueId } from "../utilities/database/StoreToDoItem.js";
import { deleteToDoItem } from "../utilities/database/DeleteToDoItem.js";
import { toggleToDoItem } from "../utilities/database/ToggleToDoItem.js";

export default function App() {

  // Hooks
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const handleAuthStateChange = (user) => {
      if (user) {
        const userId = auth.currentUser.uid;
        fetchAndDisplayAllToDoItems(userId);
      } else {
        window.location.href = "index.html";
      }
    };
    const AuthListener = auth.onAuthStateChanged(handleAuthStateChange);
    return () => {
      AuthListener();
    };
  },[]);



  // Helper Functions

  // Fetch All Todo Items
  const fetchAndDisplayAllToDoItems = async (userId) => {
    try {
      const localValue = await fetchAllToDoItems(userId);
      console.log(localValue);
      const initialTodos = localValue || [];
      setTodos(initialTodos);
    } catch (error) {
      console.error("Error Fetching Todo Items:", error);
    }
  };

  // Adds a TodoItem to the TodoList
  function addTodo(title) {
    const userId = auth.currentUser.uid;
    const uniqueId = generateUniqueId();
    try {
      storeToDoItem(userId, title, false);
      setTodos((currentTodos) => {return [...currentTodos, { id: crypto.randomUUID(), title, completed: false }]})
      fetchAndDisplayAllToDoItems(userId);
    } catch (error) {
      console.error("Error Adding Todo Item:", error);
    }
  }

  // Deletes a TodoItem from the TodoList
  function deleteTodo(id) {
    const userId = auth.currentUser.uid;
    try {
      deleteToDoItem(userId, id);
      setTodos((currentTodos) => {return currentTodos.filter(todo => todo.id !== id)})
      fetchAndDisplayAllToDoItems(userId);
    } catch (error) {
      console.error("Error Deleting Todo Item:", error);
    }
  }

  // Toggles TodoItem Checkbox 
  function toggleTodo(id, completed) {
    const userId = auth.currentUser.uid;
    try {
      toggleToDoItem(userId, id, !completed);
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: !completed };
          }
          return todo;
        });
      });
    } catch (error) {
      console.error("Error Toggling Todo Item:", error);
    }
  }


  
  // Returns the JSX component
  return (
    <>
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo}/>
      <NewTodoForm onSubmit={addTodo}/>
    </>
  )

}
