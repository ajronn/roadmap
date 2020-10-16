import React, { useState, createContext, useEffect } from 'react'
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import firebase from "../../firebase/firebase.utils"

interface User {
    id: string,
    name: string
}

export const UserContext = createContext({
    login: () => { },
    logout: () => { },
    id: "",
    email: "",
    name: "",
    photoURL: "",
    isLogged: false,
    projects: []
});

const UserProvider = (props) => {
    const ref = firebase.database().ref('Users');
    const projectsRef = firebase.database().ref('Projects');
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setCurrentUser(user)
            if (user) {
                const arr = [];
                projectsRef.on("value", (snap) => {
                    const snapshot = snap.val();
                    for (let id in snapshot) {
                        arr.push({
                            id: snapshot[id].id,
                            name: snapshot[id].name
                        })
                    }
                })
                setProjects(arr);
            }
            return () => auth.signOut();
        });

        const usersArray: User[] = [];
        ref.on("value", (snap) => {
            const snapshot = snap.val();
            for (let id in snapshot) {
                usersArray.push({
                    id: snapshot[id].id,
                    name: snapshot[id].displayName
                })
            }
        })
        setUsers(usersArray);
    }, [currentUser])

    const validateUser = (array: User[], id: string) => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) return false;
        }
        return true;
    }

    const addUser = (ref: firebase.database.Reference, id: string, name: string) => {
        ref.push({ id: id, name: name });
    }

    const login = () => signInWithGoogle().then((u) => {
        if (validateUser(users, u.user.uid)) {
            addUser(ref, u.user.uid, u.user.displayName);
        }
    })

    const data = {
        login: login,
        logout: () => auth.signOut(),
        id: currentUser ? currentUser.uid : "",
        email: currentUser ? currentUser.emial : "",
        name: currentUser ? currentUser.displayName : "",
        photoURL: currentUser ? currentUser.photoURL : "",
        isLogged: currentUser ? true : false,
        projects: projects
    };

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;