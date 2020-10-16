import React from "react";

import { Day } from "../Week";
import { Timeline } from "../../.."

import styles from "./roadmap.css"

interface Props {
    currentWeek: Day[]
}

const Roadmap = ({ currentWeek }: Props) => {

    return (
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
                <Timeline />
                <Timeline />
            </div>
        </div>
    )
}

export default Roadmap;