import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function RootLayout() {
    return (
        <div>
            <div className="maindiv">
            <Nav/>
            <div className="" style={{ minHeight: "70vh" }}>
            <div className="main container">
                {" "}
                <Outlet/>
            </div>
            </div>
            <Footer/>
        </div>
        </div>
    )
}

export default RootLayout
