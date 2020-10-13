import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserProvider from "../../firebase/provider/UserProvider"
import { Navbar } from "../shared"
import { Home } from "../core"

import styles from "./main.css"

const Main = () => {


    return (
        <UserProvider>
            <div className={styles.main}>
                <Navbar />
                <Router>
                    <Switch>
                        <Route path="/" exact><Home /></Route>
                    </Switch>
                </Router>
            </div>
        </UserProvider>
    )
}

export default Main;