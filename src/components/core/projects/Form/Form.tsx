import React, { useState } from "react"

import { Button } from "../../../ui"

import styles from "./form.css"

const Form = ({ submit }) => {
    const [name, setName] = useState("");

    return (
        <div className={styles.form}>
            <form>
                <fieldset>
                    <label>Project name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} />
                </fieldset>
            </form>
            <Button className={styles.button} onClick={() => submit(name)}>Add</Button>
        </div>
    )
}

export default Form;