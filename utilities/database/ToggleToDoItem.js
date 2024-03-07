// Imports
import { db } from "../firebaseConfig.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Toggles Todo Item in Firestore
export async function toggleToDoItem(userId, documentId, completed) {
    try {
      const todoItemDocRef = doc(db, `todo-list-${userId}`, documentId);
      await updateDoc(todoItemDocRef, { completed: completed });
    } catch (error) {
      console.error("Error Toggling:", error);
      throw new Error("Failed to Toggle Item");
    }
}
