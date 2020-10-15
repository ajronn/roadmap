import React, { useState, useEffect } from "react";
import { DAYS_OF_THE_WEEK } from "../utils"

import { Roadmap } from "./roadmap"

import { Calendar } from "../../../ui"

import styles from "./week.css";

export interface Day {
    dayInMonth: number,
    month: number,
    year: number,
    dayOfWeek: string,
}

const Week = () => {
    const [currentDay, setCurrentDay] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState([]);

    useEffect(() => {
        const sunday: Date = findSunday(currentDay);
        const arr = [];
        for (let i = 0; i < 7; i++) {
            const d = findDay(sunday, i);
            arr.push({
                dayInMonth: d.getDate(),
                month: d.getMonth(),
                year: d.getFullYear(),
                dayOfWeek: DAYS_OF_THE_WEEK[d.getDay()]
            });
        }
        setCurrentWeek(arr);

    }, [currentDay])

    const setDate = (d: Date) => {
        setCurrentDay(new Date(d.getFullYear(), d.getMonth(), d.getDate()));
    }

    const findDay = (date: Date, n: number) => {
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        if (date.getDate() + n > daysInMonth) {
            const day = date.getDate() + n - daysInMonth;
            let month = 0;
            let year = 0;
            if (date.getMonth() + 1 > 11) {
                month = 0;
                year = date.getFullYear() + 1;
            } else {
                month = date.getMonth() + 1;
                year = date.getFullYear();
            }
            return new Date(year, month, day);

        }
        else return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
    }

    const findSunday = (date: Date): Date => {
        if (date.getDay() === 0) {
            return date;
        }

        let newDate = date;
        do {
            if (newDate.getDate() - 1 > 0)
                newDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1)
            else {
                let month = newDate.getMonth();
                let year = newDate.getFullYear();
                if (month - 1 < 0) {
                    month = 11;
                    year--;
                }
                else {
                    month = month - 1;
                }

                const day = new Date(year, month + 1, 0).getDate();
                newDate = new Date(year, month, day);
            }
        } while (newDate.getDay() !== 0)
        return newDate;
    }

    return (
        <div className={styles.grid}>
            <Calendar onChange={(e) => setDate(e.target.value)} />
            <Roadmap currentWeek={currentWeek} />
        </div>
    )
}

export default Week;