import React, { useContext } from "react"

import { UserContext } from "../provider/UserProvider"

interface Props {
    children: JSX.Element
}

const Protected = ({ children }: Props) => {
    const ctx = useContext(UserContext);
    return <div>{ctx.isLogged && children}</div>
}
export default Protected;