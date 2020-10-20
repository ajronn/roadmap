import React from "react"
import { Router, Route, Switch } from "react-router";
import UserProvider from "../../firebase/provider/UserProvider"
import history from "./history"

import { Navbar } from "../shared"
import { Home, Projects, Week } from "../core"

import styles from "./main.css"

const Main = () => {

    return (
        <Router history={history}>
            <UserProvider>
                <div className={styles.main}>
                    <Navbar />
                    <div className={styles.content}>
                        <Switch>
                            <Route path="/projects" component={Projects} />
                            <Route path="/project" component={Week} />
                            <Route path="/" component={Home} />
                        </Switch>
                    </div>
                </div>
            </UserProvider>
        </Router >
    )
}

export default Main;