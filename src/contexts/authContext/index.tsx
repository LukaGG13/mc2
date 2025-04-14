import { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../../firebase/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

interface userValues {
    currentUser: User | null;
    userLoggedIn: boolean;
    loading: boolean;
}

const emptyContext: userValues = {
    currentUser: null,
    userLoggedIn: false,
    loading: true
};

const AuthContext = createContext(emptyContext);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    async function initUser(user: User | null) {
        if (user) {
            setCurrentUser({ ...user });
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }

        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initUser);

        return unsubscribe;
    }, []);

    const value: userValues = {
        currentUser,
        userLoggedIn,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}