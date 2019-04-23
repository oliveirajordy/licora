import React from 'react'
import './Header.css'
import Logo from './Logo'



export default props => {
    return (
        <header className="header d-flex align-items-center justify-content-center">
            <Logo />
        </header>
    )
}