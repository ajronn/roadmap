import React, { useContext, useState } from "react"
import { UserContext } from "../../../firebase/provider/UserProvider"
import { Button } from "../../ui"
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MapIcon from '@material-ui/icons/Map';
import styles from "./navbar.css"

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const ctx = useContext(UserContext);

    const modalHandler = () => {
        open ? setOpen(false) : setOpen(true);
    };

    return (
        <div className={styles.navbar}>
            <MapIcon fontSize="large" className={styles.logo} />
            {ctx.isLogged
                ? <Button className={styles.butt} onClick={() => ctx.logout()}><MeetingRoomIcon /></Button>
                :
                <Button className={`${styles.butt} ${styles.trigger}`} onClick={modalHandler} ><VpnKeyIcon />
                    <div className={`${styles.modal} ${open && styles.unhide}`}>
                        <img className={styles.link}
                            src="https://www.flaticon.com/svg/static/icons/svg/300/300221.svg"
                            height="20"
                            onClick={() => { ctx.login(); modalHandler(); }} />
                    </div>
                </Button>
            }
        </div>
    )
}

export default Navbar;