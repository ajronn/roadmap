import React, { useContext } from 'react'
import { UserContext } from "../../../firebase/provider/UserProvider"

import { Week } from "../interface"

import styles from "./home.css"

interface User {
    id: string,
    name: string
}

const Home = () => {
    const user = useContext(UserContext);

    return (
        <div className={styles.home}>
            {user.isLogged && <Week />}
        </div>
    )

}

export default Home;