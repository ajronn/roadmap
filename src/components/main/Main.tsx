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
                <div className={styles.content}>
                    <Router>
                        <Switch>
                            <Route path="/" exact><Home /></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </UserProvider>
    )
}

export default Main;