import './Nav.css'
import NavItem from './NavItem'
import React from 'react'

export default props => 
    <aside className="menu-area">
        <NavItem href="#/" className="fa fa-home" label="Início" ></NavItem>
        <NavItem href="#/users" className="fa fa-users" label="Usuarios" ></NavItem>
    </aside>