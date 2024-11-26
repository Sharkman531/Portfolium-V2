import React from 'react'
import { Navigate } from "react-router-dom"
import { useLogOut } from '../../contexts/session.context'

const Logout = () => {
    localStorage.removeItem("user");
    const onLogout = useLogOut()
    onLogout()
    return <Navigate to="/login" />
}

export default Logout