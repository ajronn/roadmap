import React from "react"

import styles from "./modal.css"

interface Props {
    children: JSX.Element,
    display: boolean
}

const Modal = ({ children, display = false }: Props) => {
    return (
        <div className={`${styles.modal} ${display && styles.unhiden}`}>{children}</div>
    )
}

export default Modal;