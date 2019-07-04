import React, { useState } from 'react'
import './Nav.css'
import NavItem from './NavItem'

export default props => {
 
    const [selected, setSelected] = useState()

    window.onhashchange = e => {
        setSelected(Math.random())
        console.log(selected)
    }

    return (
        <nav className="nav d-flex">
            <NavItem link="#/" label="Compras" />
            <NavItem link="#/novacompra" label="Nova Compra" />
        </nav>
    )
}