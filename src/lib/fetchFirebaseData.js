import { ref, get } from "firebase/database";

export default async function fetchFirebaseData(url, db) {
    try {
        // Create a reference to the desired path
        const dataRef = ref(db, url);
        
        // Fetch the data snapshot
        const snapshot = await get(dataRef); // Use `get` for one-time read
        
        // Return the data if it exists
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available at this path.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error if needed
    }
}