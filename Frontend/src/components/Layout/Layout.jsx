import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import Footer from '../Footer/Footer'
import { SessionProvider } from "../../contexts/session.context"
const Layout = () => {

  return (
  <SessionProvider>
    <NavBar />
    <Outlet /> 
  </SessionProvider>
  )
}

export default Layout