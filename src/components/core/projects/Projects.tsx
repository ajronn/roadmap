import React, { useContext, useState } from "react"
import { UserContext } from "../../../firebase/provider/UserProvider"

import { Form } from "./Form"

import { Tile, Modal } from "../../ui"

import styles from "./projects.css"

const Projects = () => {
    const ctx = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const addProjectHandler = (name: string) => {
        if (name !== "") {
            setIsOpen(false);
            ctx.addProject(name);
        }
    }

    const deleteProjectHandler = (id) => {
        ctx.deleteProject(id);
    }

    return (
        <div className={styles.projects}>
            {ctx.isLogged &&
                <div>
                    {ctx.projects.map(e => {
                        return <Tile name={e.name} close={() => deleteProjectHandler(e.id)} className={styles.tile} />
                    })}
                    <Tile name="+" className={styles.newproject} onClick={openModal} />
                </div>
            }
            <Modal display={isOpen}>
                <div className={styles.wrapper} >
                    <div className={styles.close} onClick={closeModal} >x</div>
                    <Form submit={addProjectHandler} />
                </div>
            </Modal>
        </div>
    )
}

export default Projects;