import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../../firebase/provider/UserProvider"
import firebase from "../../../firebase/firebase.utils"
import styles from "./home.css"

interface User {
    id: string,
    name: string
}

const Home = () => {
    const user = useContext(UserContext);

    const addUser = (id) => {
        const ref = firebase.database().ref('Users');
        const users: User[] = [];
        let arr = [];
        ref.on("value", (snap) => {
            arr = snap.val();
            for (let id in arr) {
                console.log(arr[id].id)
                users.push({
                    id: arr[id].id,
                    name: arr[id].name
                })
            }
        })

        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) return;
        }
        // const user = {
        //     id: 0,
        //     name: "John"
        // }
        // ref.push(user);
    }
    return (
        <div className={styles.home}>
            <h1>Home</h1>
            {user.isLogged &&
                <div>
                    ID {user.id}<br />
                    EMAIL {user.email}<br />
                    PHOTO <img src={user.photoURL} />
                    <div>
                        <button onClick={() => addUser("0")} >Click</button>
                    </div>
                </div>}
        </div>
    )

}

export default Home;