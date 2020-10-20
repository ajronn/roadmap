//dateStart dateEnd time content
import React from "react"

import { Button } from "../../../../../ui"

import styles from "./form.css"

interface Props {
    close: () => void
}

const Form = ({ close }: Props) => {
    return (
        <div className={styles.form}>
            <div className={styles.close} onClick={close}>x</div>
            <form>
                <fieldset>
                    <label>Time</label>
                    <input type="text" />
                </fieldset>
                <fieldset>
                    <label>Content</label>
                    <input type="text" />
                </fieldset>
            </form>
            <Button className={styles.button}>Add</Button>
        </div>
    )
}

export default Form;