import React, { useState, useEffect } from "react"

import styles from "./week.css"

export interface Day {
    dayInMonth: number,
    month: number,
    year: number,
    dayOfWeek: string,
}

const Week = () => {
    const [currentDay, setCurrentDay] = useState(null);
    const [currentWeek, setCurrentWeek] = useState([]);
    const DAYS_OF_THE_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    useEffect(() => {
        const date = new Date();
        const obj: Day = {
            dayInMonth: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear(),
            dayOfWeek: DAYS_OF_THE_WEEK[date.getDay()]
        }
        setCurrentDay(obj)
        const sunday: Date = findSunday(date);
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

    }, [])

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
            <span>h</span>
            {currentWeek.map(e => {
                return <span>{e.dayInMonth}.{e.month}.{e.year}</span>
            })}
        </div>
    )
}

export default Week;