import React from "react";
import { Day } from "../Week";

import styles from "./roadmap.css"

interface Props {
    currentWeek: Day[]
}

const Roadmap = ({ currentWeek }: Props) => {
    return (
        <div>
            <div className={styles.header}>
                <span>h</span>
                {currentWeek.map(e => {
                    return (
                        <span>
                            {e.dayInMonth}/{e.month}/{e.year}
                            <br />{e.dayOfWeek}
                        </span>
                    )
                })}
            </div>

        </div>
    )
}

export default Roadmap;