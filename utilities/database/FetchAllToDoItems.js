// Imports
import { db } from "../firebaseConfig.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Fetches Todo Items from Firestore
export async function fetchAllToDoItems(userId) {
    try {
        const userTodoListCollection = collection(db, `todo-list-${userId}`);
        const querySnapshot = await getDocs(query(userTodoListCollection, orderBy('timestamp', 'asc')));
        const todoItems = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return todoItems;
    } catch (error) {
        console.error("Error Fetching Data:", error);
        throw new Error("Failed to Fetch all Todo Items");
    }
}
