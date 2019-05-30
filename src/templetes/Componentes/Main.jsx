import React from 'react'
import './Main.css'

export default props => {
        return (
            <main className="main container-fluid p-0 m-0 flex-grow-1 d-flex flex-column position-relative" data-spy="scroll" >
                {props.children}
            </main>
        )

}