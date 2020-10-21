import React, { useContext, useState } from "react"
import { Unprotected, Protected } from "firebase/guard"
import { UserContext } from "firebase/provider"
import history from "main/history"

import { Button } from "ui"

import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MapIcon from '@material-ui/icons/Map';
import ListAlt from '@material-ui/icons/ListAlt';

import styles from "./navbar.css"

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const ctx = useContext(UserContext);

    const modalHandler = () => open ? setOpen(false) : setOpen(true);
    const redirect = (where: string) => history.push(where);

    return (
        <div className={styles.navbar}>
            <MapIcon fontSize="large" className={styles.logo} onClick={() => redirect("/")} />
            <Protected>
                <div>
                    <Button className={styles.butt} onClick={() => ctx.logout()}><MeetingRoomIcon />Exit</Button>
                    <Button className={styles.butt} onClick={() => redirect("/projects")}><ListAlt />Projects</Button>
                </div>
            </Protected>
            <Unprotected>
                <Button className={`${styles.butt} ${styles.trigger}`} onClick={modalHandler} ><VpnKeyIcon />Login
                    <div className={`${styles.modal} ${open && styles.unhide}`}>
                        <img className={styles.link}
                            src="https://www.flaticon.com/svg/static/icons/svg/300/300221.svg"
                            height="20"
                            onClick={() => { ctx.login(); modalHandler(); }} />
                    </div>
                </Button>
            </Unprotected>
            <img className={styles.photo} src={ctx.photoURL} width={34} />
        </div>
    )
}

export default Navbar;