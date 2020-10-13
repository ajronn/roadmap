import React, { useState, createContext, useEffect } from 'react'
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';

export const UserContext = createContext({
    login: () => { },
    logout: () => { },
    id: "",
    email: "",
    photoURL: "",
    isLogged: false
});

const UserProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    let unsubscribeFromAuth = null;

    useEffect(() => {
        unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            return () => auth.signOut();
        });
    }, [])

    const data = {
        login: signInWithGoogle,
        logout: () => auth.signOut(),
        id: currentUser ? currentUser.uid : "",
        email: currentUser ? currentUser.emial : "",
        photoURL: currentUser ? currentUser.photoURL : "",
        isLogged: currentUser ? true : false
    };

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;