import React, { useContext, useState, useEffect } from "react";
import { UserContext, Protected } from "../../../../../firebase"

import { Day } from "../Week";
import { Timeline, Button, Modal } from "../../../../ui"
import { Form } from "./form"

import styles from "./roadmap.css"

interface Props {
    currentWeek: Day[]
}

const Roadmap = ({ currentWeek }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ctx = useContext(UserContext);

    useEffect(() => {

    }, [])

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const addTimelnieHandler = () => {
        // ctx.addTimeline("0", "18/9/2020", "20/9/2020", "0", "12", "");
        openModal();
    }

    return (
        <Protected>
            <div>
                <div className={styles.header}>
                    {currentWeek.map(e => {
                        return (
                            <span>
                                {e.dayInMonth}/{e.month}/{e.year}
                                <br />{e.dayOfWeek}
                            </span>
                        )
                    })}
                </div>
                <div>
                    {ctx.timelines.length}
                    <Timeline />
                    <Button className={styles.butt} onClick={() => addTimelnieHandler()}>+</Button>
                </div>
                <Modal display={isModalOpen}>
                    <Form close={closeModal} />
                </Modal>
            </div>
        </Protected>
    )
}

export default Roadmap;