import React from "react"

import styles from "./tile.css"

interface Props {
    name: string,
    description?: string,
    className?: string,
    onClick?: () => void,
    close?: () => void
}

const Tile = ({ name, description = "", className = "", onClick, close }: Props) => {
    return (
        <div className={`${styles.tile} ${className}`} onClick={onClick}>
            {name !== "+" && <div onClick={close} className={styles.close} >x</div>}
            {name}
            {description !== "" && <div className={styles.tooltip}>{description}</div>}
        </div>
    )
}

export default Tile;