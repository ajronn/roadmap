import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from "../../../firebase/provider/UserProvider"

import { Week } from "../interface"

import Logo from "../../ui/images/logo.png"

import { Tile } from "../../ui"

import styles from "./home.css"

interface User {
    id: string,
    name: string
}

const Home = () => {
    const user = useContext(UserContext);

    return (
        <div className={styles.home}>
            {user.isLogged
                ? <div>
                    {user.projects.map(e => {
                        return <Tile name={e.name} />
                    })}
                </div>
                : <div className={styles.welcome}>
                    <h1>Welcome to RoadMap</h1>
                    <img src={Logo} height="100" />
                </div>}
        </div>
    )

}

export default Home;