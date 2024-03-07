// Imports
import { db } from "../firebaseConfig.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Deletes Todo Item from Firestore
export async function deleteToDoItem(userId, documentId) {
    try {
        const todoItemDocRef = doc(db, `todo-list-${userId}`, documentId);
        await deleteDoc(todoItemDocRef);
    } catch (error) {
        console.error("Error Removing Data: ", error);
    }
}
