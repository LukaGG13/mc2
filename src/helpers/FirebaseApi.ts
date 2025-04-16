import { User } from "firebase/auth";
import { db } from "../firebase/firebase";
import { arrayUnion, collection, doc, endAt, getDoc, getDocs, orderBy, query, setDoc, startAt, where, writeBatch } from "firebase/firestore";
import { game, team } from "../types/types";

const logQuery = async (q: any, queryName: string) => {
    // if (process.env.NODE_ENV === 'development' && false) {
    //     console.group(`Query: ${queryName}`);
    //     try {
    //         if (q.explain) {
    //             const explanation = await q.explain();
    //             console.log('Documents read:', explanation.totalDocsExamined);
    //             console.log('Documents matched:', explanation.totalDocsMatched);
    //             console.log('Index used:', explanation.indexesUsed);
    //         } else {
    //             console.log('Query params:', q);
    //             // Fallback to basic logging
    //             console.log('Query params:', q._query);
    //             console.log('Collection:', q._query.path.segments.join('/'));
    //         }
    //     } catch (error) {
    //         console.log('Query logging failed:', error);
    //     }
    //     console.groupEnd();
    // }
};

export async function fetchTeams(currentUser: User) {
    const subcollectionRef = collection(db, `teams/${currentUser.uid.toString()}/fields`);
    const q = query(subcollectionRef);

    try {
        await logQuery(q, 'fetchTeams');
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error fetching subcollection:", error);
    }
}

export const searchByTeamName = async (searchString: string) => {
    const searchLower = searchString.toLowerCase();

    try {
        const q = query(
            collection(db, 'teams'),
            where('searchableName', '>=', searchLower),
            where('searchableName', '<=', searchLower + '\uf8ff')
        );

        await logQuery(q, 'searchByTeamName');
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error searching teams:', error);
        throw error;
    }
};

export const searchByDocumentId = async (searchString: string) => {
    const searchLower = searchString.toLowerCase();
    
    try {
        const q = query(
            collection(db, 'teams'),
            orderBy('__name__'),
            startAt(searchLower),
            endAt(searchLower + '\uf8ff')
        );

        await logQuery(q, 'searchByDocumentId');
        const snapshot = await getDocs(q);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error searching documents:', error);
        throw error;
    }
};

export const createTeam = async (members: string[], teamName: string) => {
    try {

        const tempTeam: team = {
            id: members.join('_'),
            name: teamName,
            members: members,
            iniviteToken: null,
            partije: []
        }

        const teamId = members.join('_');
        
        const teamRef = doc(db, 'teams', teamId);
        await setDoc(teamRef, {
            ...tempTeam
        });

        const batch = writeBatch(db);
        members.forEach(userId => {
            const userTeamRef = doc(db, 'user_teams', userId);
            batch.set(userTeamRef, {
                teamIds: arrayUnion(teamId)
            }, { merge: true });
        });
        
        // Log the batch operation
        await logQuery(batch, 'createTeam');
        await batch.commit();
    } catch (error) {
        console.error('Error creating team:', error);
        throw error;
    }
};

export const getUserTeams = async (userId: string) => {
    try {
        const userTeamsRef = doc(db, 'user_teams', userId);
        await logQuery(userTeamsRef, 'getUserTeams-userTeams');
        
        const userTeamsDoc = await getDoc(userTeamsRef);
        const teamIds = userTeamsDoc.data()?.teamIds || [];

        // Log each team fetch
        const teams = await Promise.all(
            teamIds.map(async teamId => {
                const teamRef = doc(db, 'teams', teamId);
                await logQuery(teamRef, `getUserTeams-team-${teamId}`);
                return getDoc(teamRef);
            })
        );

        return teams.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error fetching user teams:', error);
        throw error;
    }
};

export const addGame = async (team: team, game: game) => {
    const tempTeam: team = {
        ...team,
        partije: [...team.partije, game]
    };
    console.log('tempTeam', tempTeam);
    const teamRef = doc(db, 'teams', team.id);

    try {
        await setDoc(teamRef, {
            ...tempTeam
        }, { merge: true });
    }
    catch (error) {
        console.error('Error adding game:', error);
        throw error;
    }
}

export const getTeam = async (teamId: string) => {
    try {
        const teamRef = doc(db, 'teams', teamId);
        await logQuery(teamRef, `getTeam-team-${teamId}`);
        
        const teamDoc = await getDoc(teamRef);
        if (teamDoc.exists()) {
            return {
                id: teamDoc.id,
                ...teamDoc.data()
            };
        } else {
            console.error('No such document!');
            return null;
        }
    } catch (error) {
        console.error('Error fetching team:', error);
        throw error;
    }
}