import React, { useState } from "react";

import styles from "./timeline.css"

const Timeline = () => {
    const [isMouseDown, setIsMouseDown] = useState(false);

    const setDown = () => setIsMouseDown(true);
    const setUp = () => {
        setIsMouseDown(false);
        console.clear();
    }

    const trigger = (a) => {
        if (isMouseDown) {
            console.log(a);
        }
    }

    return (
        <div className={styles.wrapper}
            onMouseDown={setDown}
            onMouseUp={setUp}>
            {Array.from(Array(7).keys()).map(e => {
                return (
                    <Field id={e} trigger={trigger} />
                )
            })}
        </div>
    )
}

const Field = ({ id, trigger }) => {
    const [isMouseOver, setIsMouseOver] = useState(false);
    const [displayId, setDisplayId] = useState("");

    const setDown = () => {
        setIsMouseOver(true);
        setDisplayId(id)
        trigger(id)
    }
    const setUp = () => {
        setIsMouseOver(false);
        setDisplayId("")
    }
    return (
        <span
            style={{ backgroundColor: isMouseOver ? "red" : "" }}
            onMouseEnter={setDown}
            onMouseLeave={setUp}
            draggable={false}>
            {displayId}
        </span>
    )
}

export default Timeline;