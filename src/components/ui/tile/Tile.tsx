import React from "react"

import styles from "./tile.css"

const Tile = ({ name }) => {
    return (
        <div className={styles.tile}>
            {name}
        </div>
    )
}

export default Tile;