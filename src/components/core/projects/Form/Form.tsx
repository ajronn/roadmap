import React, { useState } from "react"

import { Button } from "ui"

import styles from "./form.css"

const Form = ({ submit }) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    const handler = () => {
        submit(name, desc);
        setName("");
        setDesc("");
    }

    return (
        <div className={styles.form}>
            <form>
                <fieldset>
                    <label>Project name</label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </fieldset>
                <fieldset>
                    <label>Description</label>
                    <input type="text" onChange={(e) => setDesc(e.target.value)} value={desc} />
                </fieldset>
            </form>
            <Button className={styles.button} onClick={() => handler()}>Add</Button>
        </div>
    )
}

export default Form;