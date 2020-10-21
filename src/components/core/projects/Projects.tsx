import React, { useContext, useState, useEffect } from "react"
import { Protected } from "firebase/guard"
import { UserContext } from "firebase/provider"
import history from "main/history"

import { Form } from "./form"
import { Confirm } from "./confirm"

import { Tile, Modal } from "ui"

import styles from "./projects.css"

const Projects = () => {
    const ctx = useContext(UserContext);
    const [projects, setProjects] = useState(ctx.projects);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        console.log(ctx.projects.length)
        setProjects(ctx.projects);
    }, [ctx.isLogged])

    const openModal = () => setIsFormOpen(true);
    const closeModal = () => setIsFormOpen(false);

    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => setIsConfirmOpen(false);

    const addProjectHandler = (name: string, desc: string) => {
        if (name !== "") {
            setIsFormOpen(false);
            ctx.addProject(name, desc);
        }
    }

    const deleteProjectHandler = (id) => {
        ctx.deleteProject(id);
        closeConfirm();
    }

    return (
        <div className={styles.projects}>
            <Protected>
                <div>
                    {projects.map((e, index) => {
                        return (
                            <div key={index}>
                                <Tile name={e.name}
                                    description={e.desc}
                                    close={openConfirm}
                                    className={styles.tile}
                                    onClick={() => history.push("/project/" + e.id)} />
                                <Modal display={isConfirmOpen}>
                                    <div className={styles.wrapper} >
                                        <div className={styles.close} onClick={closeConfirm} >x</div>
                                        <Confirm no={closeConfirm} yes={deleteProjectHandler} projectid={e.firebaseid} />
                                    </div>
                                </Modal>
                            </div>
                        )
                    })}
                    <Tile name="+" className={styles.newproject} onClick={openModal} />
                </div>
            </Protected>
            <Modal display={isFormOpen}>
                <div className={styles.wrapper} >
                    <div className={styles.close} onClick={closeModal} >x</div>
                    <Form submit={addProjectHandler} />
                </div>
            </Modal>
        </div>
    )
}

export default Projects;