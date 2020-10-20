import React, { useContext } from "react"

import { UserContext } from "../provider/UserProvider"

interface Props {
    children: JSX.Element
}

const Unprotected = ({ children }: Props) => {
    const ctx = useContext(UserContext);
    return <div>{!ctx.isLogged && children}</div>
}
export default Unprotected;