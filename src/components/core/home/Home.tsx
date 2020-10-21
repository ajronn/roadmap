import React from 'react'

import Logo from "images/logo.png"

import styles from "./home.css"

const Home = () => {

    return (
        <div className={styles.home}>
            <div className={styles.welcome}>
                <h1>Welcome to RoadMap</h1>
                <img src={Logo} height="100" />
            </div>
        </div>
    )
}

export default Home;