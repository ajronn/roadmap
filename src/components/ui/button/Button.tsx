import React from "react"

import styles from "./button.css"

export interface ButtonProps
    extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
    > {
    children: React.ReactNode;
    className?: string
}


const Button = ({ children, className, ...props }: ButtonProps) => {

    return (
        <button className={`${styles.button} ${className}`} {...props} >{children}</button>
    )
}

export default Button;