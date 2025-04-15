import { User } from "firebase/auth";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function fetchTeams(currentUser: User) {
    const subcollectionRef = collection(db, `teams/${currentUser.uid.toString()}/fields`);
    try {
        const querySnapshot = await getDocs(subcollectionRef);
        const subcollectionData = querySnapshot.docs.map(doc => ({
            id: doc.id,       // Document ID
            ...doc.data(),    // Document data
        }));
        return subcollectionData;
    } catch (error) {
        console.error("Error fetching subcollection:", error);
    }
}