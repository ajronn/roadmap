import React from "react";
import { Field } from "./Field"
import { useCalendar } from "ajronn-datepicker"

import styles from "./calendar.css"

interface Props {
    onChange?: (e: { target: { value: Date } }) => void;
    className?: string;
}

const Calendar = ({ onChange = () => { }, className = "" }: Props) => {
    const dateObj = useCalendar();

    const renderDayFields = (daysInMonth: number, dayOfWeek: number) => {
        const arr = dateObj.CalcNumberDays(daysInMonth, dayOfWeek);
        const result = [];
        for (let i = 0; i < arr.length; i = i + 7) {
            result.push(
                <tr>
                    {Array.from(Array(7).keys()).map((e: number) => {
                        return (
                            <td>
                                <Field
                                    onClick={() => pickDate(arr[i + e].dateNumber)}
                                    disabled={arr[i + e].dateNumber === "" ? true : false}
                                    content={arr[i + e].dateNumber} />
                            </td>
                        )
                    })}
                </tr>)
        }

        return result;
    }

    const pickDate = (day: string): void => {
        onChange({ target: { value: new Date(dateObj.Date.getFullYear(), dateObj.Date.getMonth(), parseInt(day)) } });
    }


    return (
        <div className={`${styles.calendar} ${styles.noselect} ${className}`}>
            <table>
                <tbody>
                    <tr className={styles.header}>
                        <td className={styles.arrow} onClick={() => dateObj.ChangeDate(-1)}>&lt;&lt;</td>
                        <td colSpan={5}><Field disabled content={dateObj.GetShortDate()} /></td>
                        <td className={styles.arrow} onClick={() => dateObj.ChangeDate(1)}>&gt;&gt;</td>
                    </tr>
                    <tr className={styles.header}>
                        {dateObj.DAYS_OF_WEEK.map((e: string) => {
                            return <td><Field disabled content={e} /></td>
                        })}
                    </tr>
                    {renderDayFields(
                        dateObj.DaysInMonth(dateObj.Date.getMonth() + 1, dateObj.Date.getFullYear()),
                        new Date(dateObj.Date.getFullYear(), dateObj.Date.getMonth(), 1).getDay())}
                </tbody>
            </table>
        </div>
    )
}

export default Calendar;