import React from 'react'
import './Nav.css'
import NavItem from './NavItem'

export default props => {
    const urlCurrent = window.location.href.split('#')[1]
    const barr = urlCurrent === '/' ? 'selected' : ''
    const novaCompra = urlCurrent !== '/' ? 'selected' : ''

    // window.onhashchange = e => {
            
    //     const oldUrl = e.oldURL.split('#')[1]
    //     const newUrl = e.newURL.split('#')[1]
    //     const oldLink = document.querySelector(`.nav a[href='#${oldUrl}']`)
    //     const newLink = document.querySelector(`.nav a[href='#${newUrl}']`)
    //     oldLink && oldLink.classList.remove('selected')
    //     newLink && newLink.classList.add('selected')
    // }
    
    return (
        <nav className="nav d-flex">
            <NavItem link="#/" selected={barr} navPoint="Compras" />
            <NavItem link="#/novacompra" selected={novaCompra} navPoint="Nova Compra" />
        </nav>
    )
}