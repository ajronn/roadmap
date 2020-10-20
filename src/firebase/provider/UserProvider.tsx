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
    addProject: (name: string, desc: string) => { },
    deleteProject: (id: string) => { },
    setProject: (id: string) => { },
    addTimeline: (projectid: string, dateStart: string, dateEnd: string, userId: string, time: string, content: string) => { },
    timelines: [],
    id: "",
    email: "",
    name: "",
    photoURL: "",
    isLogged: false,
    projects: [],
    currentProjectId: ""
});

const UserProvider = (props) => {
    const [isLogged, setIsLogged] = useState(false);
    const ref = firebase.database().ref('Users');
    const projectsRef = firebase.database().ref('Projects');
    const timelinesRef = firebase.database().ref('Timelines');
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState("");
    const [timelines, setTimelines] = useState([]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user !== null) {
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
        if (currentUser === null) return;
        const arr = [];
        projectsRef.on("value", (snap) => {
            const snapshot = snap.val();
            for (let id in snapshot) {
                if (snapshot[id].userid === currentUser.uid) {
                    arr.push({
                        id: snapshot[id].id,
                        name: snapshot[id].name,
                        desc: snapshot[id].desc,
                        userid: snapshot[id].userid,
                        firebaseid: id
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
        loadProjects();
    }).then(() => history.push("/projects"));

    const logoutUser = () => {
        auth.signOut();
        setIsLogged(false);
        history.push("/");
    }

    const addProject = (name: string, desc: string) => {
        let id = -1;
        projects.map(e => {
            if (e.id > id) id = e.id;
        })
        projectsRef.push({ id: id + 1, name: name, desc: desc, userid: currentUser.uid });
        loadProjects();
    }

    const deleteProject = (id: string) => {
        firebase.database().ref("Projects/" + id).remove();
        loadProjects();
    }

    const setProject = (id: string) => {
        setCurrentProjectId(id);
        getTimelines(id);
        history.push("/project");
    }

    const addTimeline = (projectid: string, dateStart: string, dateEnd: string, userId: string, time: string, content: string) => {
        timelinesRef.push({
            projectId: projectid,
            dateStart: dateStart,
            dateEnd: dateEnd,
            userId: userId,
            time: time,
            content: content
        });
    }

    const getTimelines = (projectid: string) => {
        if (currentUser === null) {
            history.push("/")
            return;
        }
        const arr = [];
        timelinesRef.on("value", (snap) => {
            const snapshot = snap.val();
            for (let id in snapshot) {
                arr.push(snapshot[id]);
            }
        })
        setTimelines(arr);
    }

    const data = {
        login: login,
        logout: logoutUser,
        addProject: addProject,
        deleteProject: deleteProject,
        setProject: setProject,
        addTimeline: addTimeline,
        id: currentUser ? currentUser.uid : "",
        email: currentUser ? currentUser.emial : "",
        name: currentUser ? currentUser.displayName : "",
        photoURL: currentUser ? currentUser.photoURL : "",
        isLogged: isLogged,
        projects: projects,
        currentProjectId: currentProjectId,
        timelines: timelines
    };

    return (
        <UserContext.Provider value={data}>
            {props.children}
        </UserContext.Provider>
    )
}
export default UserProvider;