import React, { useContext, useState, useEffect } from 'react'
import { UserContext } from "../../../firebase/provider/UserProvider"
import { Week } from "../calendar"
import styles from "./home.css"

interface User {
    id: string,
    name: string
}

const Home = () => {
    const user = useContext(UserContext);

    return (
        <div className={styles.home}>
            <Week />
        </div>
    )

}

export default Home;