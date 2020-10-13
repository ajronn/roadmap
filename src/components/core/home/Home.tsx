import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../../firebase/provider/UserProvider"
import styles from "./home.css"

interface User {
    id: string,
    name: string
}

const Home = () => {
    const user = useContext(UserContext);

    return (
        <div className={styles.home}>
            <div className={styles.title}>Welcome {user.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}</div>
            {user.isLogged &&
                <div>
                    ID {user.id}<br />
                    PHOTO <img src={user.photoURL} />
                </div>}
        </div>
    )

}

export default Home;