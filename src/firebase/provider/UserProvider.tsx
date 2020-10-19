import React, { useState, createContext, useEffect } from 'react'
import { signInWithGoogle, auth } from '../../firebase/firebase.utils';
import firebase from "../../firebase/firebase.utils"
import history from "../../components/main/history"

interface User {
    id: string,
    name: string
}

export const UserContext = createContext({
    login: () => { },
    logout: () => { },
    addProject: (name: string) => { },
    deleteProject: (id: string) => { },
    id: "",
    email: "",
    name: "",
    photoURL: "",
    isLogged: false,
    projects: []
});

const UserProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const ref = firebase.database().ref('Users');
    const projectsRef = firebase.database().ref('Projects');
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLogged(true);
                setCurrentUser(user)
                loadProjects();
            }
            return () => logoutUser();
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
    }, [isLogged, currentUser])

    const loadProjects = () => {
        const arr = [];
        projectsRef.on("value", (snap) => {
            const snapshot = snap.val();
            for (let id in snapshot) {
                if (snapshot[id].userid === currentUser.uid) {
                    arr.push({
                        id: snapshot[id].id,
                        name: snapshot[id].name,
                        userid: snapshot[id].userid
                    })
                }
            }
        })
        setProjects(arr);
    }

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
        setIsLogged(true);
        history.push("/projects");
    })

    const logoutUser = () => {
        auth.signOut();
        setIsLogged(false);
        history.push("/");
    }

    const addProject = (name: string) => {
        let id = -1;
        projects.map(e => {
            if (e.id > id) id = e.id;
        })
        projectsRef.push({ id: id + 1, name: name, userid: currentUser.uid });
        loadProjects();
    }

    const deleteProject = (id: string) => {
        console.log(id);

        loadProjects();
    }

    const data = {
        login: login,
        logout: logoutUser,
        addProject: addProject,
        deleteProject: deleteProject,
        id: currentUser ? currentUser.uid : "",
        email: currentUser ? currentUser.emial : "",
        name: currentUser ? currentUser.displayName : "",
        photoURL: currentUser ? currentUser.photoURL : "",
        isLogged: isLogged,
        projects: projects
    };

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;