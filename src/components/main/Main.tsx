import React from "react"
import { BrowserRouter as Router, Switch } from "react-router-dom"

import { Navbar } from "../shared"

import styles from "./main.css"

const Main = () => {

    return (
        <div className={styles.main}>
            <Navbar />
            <Router>

            </Router>
        </div>

    )
}

export default Main;