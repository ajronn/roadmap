import React, { useContext, useState, useEffect } from "react";
import { Protected } from "firebase/guard"
import { UserContext } from "firebase/provider"
import firebase from "firebase/firebase.utils"

import { Day } from "../Week";
import { Timeline, Button, Modal } from "ui"
import { Form } from "./form"

import styles from "./roadmap.css"

interface Field {
    content: string,
    dateEnd: string,
    dateStart: string,
    time: string
}

interface Props {
    currentWeek: Day[],
    id: string
}

const Roadmap = ({ currentWeek, id }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [timelines, setTimelines] = useState([]);
    const ctx = useContext(UserContext);

    useEffect(() => {
        if (currentWeek.length === 0) return;
        const ref = firebase.database().ref('Timelines');
        ref.on("value", (snap) => {
            const snapshot = snap.val();
            const ts = [];
            for (let i in snapshot) {
                if (snapshot[i].projectId === id && snapshot[i].userId === ctx.id) {
                    ts.push({
                        content: snapshot[i].content,
                        dateEnd: snapshot[i].dateEnd,
                        dateStart: snapshot[i].dateStart,
                        time: snapshot[i].time
                    })
                }
            }
            const arr = [];
            const date1 = (new Date(currentWeek[0].year, currentWeek[0].month, currentWeek[0].dayInMonth)).getTime();
            const date2 = (new Date(currentWeek[6].year, currentWeek[6].month, currentWeek[6].dayInMonth)).getTime();
            ts.map((e: Field) => {
                const day = parseInt(e.dateStart[0] + e.dateStart[1]);
                const month = parseInt(e.dateStart[3] + e.dateStart[4]);
                const year = parseInt(e.dateStart[6] + e.dateStart[7] + e.dateStart[8] + e.dateStart[9]);
                const tDate = new Date(year, month, day).getTime();
                if (tDate >= date1 && tDate <= date2) {
                    arr.push(e)
                }
            })
            setTimelines(arr);
        });
    }, [currentWeek])

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
                    {timelines.map(e => {
                        return <Timeline />
                    })}
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