import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserProvider from "../../firebase/provider/UserProvider"
import history from "./history"

import { Navbar } from "../shared"
import { Home, Projects } from "../core"

import styles from "./main.css"

const Main = () => {

    return (
        <UserProvider>
            <div className={styles.main}>
                <Navbar />
                <div className={styles.content}>
                    <Router history={history}>
                        <Switch>
                            <Route path="/projects"><Projects /></Route>
                            <Route path="/"><Home /></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </UserProvider>
    )
}

export default Main;