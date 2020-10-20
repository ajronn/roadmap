import React from "react"

import { Button } from "../../../ui"

import styles from "./confirm.css"

interface Props {
    yes: (projectid: string) => void,
    no: () => void,
    projectid: string
}

const Confirm = ({ yes, no, projectid }: Props) => {
    return (
        <div className={styles.confirm}>
            The project will be deleted.<br />
            Are you sure?
            <div>
                <Button onClick={() => yes(projectid)} className={styles.button}>Yes</Button>
                <Button onClick={no} className={styles.button}>No</Button>
            </div>
        </div>
    )
}

export default Confirm;