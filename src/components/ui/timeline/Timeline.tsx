import React, { useState } from "react";

import styles from "./timeline.css"

const Timeline = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [timeline, setTimeline] = useState([
        { id: 0, type: "" },
        { id: 1, type: "" },
        { id: 2, type: "" },
        { id: 3, type: "" },
        { id: 4, type: "" },
        { id: 5, type: "" },
        { id: 6, type: "" }
    ]);
    const [fields, setFields] = useState([]);

    const setDown = () => setIsMouseDown(true);
    const triggerDown = (id) => setFields([...fields, id]);
    const triggerOver = (id) => isMouseDown && setFields([...fields, id]);

    const setUp = () => {
        setIsMouseDown(false);
        let start = fields[0];
        let finish = fields.length === 1 ? fields[0] : fields[fields.length - 1];
        if (finish < start) [start, finish] = [finish, start];
        setFields([])
        renderTimeline(start, finish);
    }

    const renderTimeline = (start, finish) => {
        const arr = [];
        if (start === finish) {
            for (let i = 0; i < 7; i++) {
                if (i === start) {
                    arr.push({ id: i, type: "single" })
                } else {
                    arr.push({ id: i, type: "" })
                }
            }
        } else {
            for (let i = 0; i < 7; i++) {
                if (i === start) {
                    arr.push({ id: i, type: "start" })
                }
                else if (i === finish) {
                    arr.push({ id: i, type: "finish" })
                }
                else if (i > start && i < finish) {
                    arr.push({ id: i, type: "middle" })
                }
                else {
                    arr.push({ id: i, type: "" })
                }
            }
        }
        if (validate()) {
            setTimeline(arr);
        }
    }

    const validate = () => {
        for (let i = 0; i < timeline.length; i++) {
            if (timeline[i].type !== "") return false;
        }
        return true;
    }

    return (
        <div className={styles.wrapper}
            onMouseDown={() => setDown()}
            onMouseUp={() => setUp()}>
            {timeline.map(e => {
                return <Field id={e.id}
                    triggerDown={triggerDown}
                    triggerOver={triggerOver}
                    type={e.type} />
            })}
        </div>
    )
}

const Field = ({ id, triggerDown, triggerOver, type }) => {

    return (
        <span
            onMouseOver={() => triggerOver(id)}
            onMouseDown={() => triggerDown(id)}>
            {type === "start" && <div className={styles.start}></div>}
            {type === "middle" && <div className={styles.middle}></div>}
            {type === "finish" && <div className={styles.finish}></div>}
            {type === "single" && <div className={styles.single}></div>}
        </span>
    )
}

export default Timeline;