import React, { useState } from "react";
import { Day } from "../../Week";

import styles from "./row.css"

interface Props {
    currentWeek: Day[],
    hour: string
}

const Row = ({ currentWeek, hour }: Props) => {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const formatHour = hour.length === 1 ? "0" + hour + ":00" : hour + ":00";

    const setDown = () => setIsMouseDown(true);
    const setUp = () => setIsMouseDown(false);

    return (
        <div className={styles.row} onMouseDown={() => setDown()} onMouseUp={() => setUp()}>
            <span>{formatHour}</span>
            {currentWeek.map(e => {
                return (
                    <span style={{ backgroundColor: isMouseDown ? "red" : "" }}>

                    </span>
                )
            })}

        </div>
    )
}

export default Row;