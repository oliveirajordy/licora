import React from 'react'
import './footer.css'

export default props => {

    return (
        <div className="info-footer text-muted w-100 mt-auto d-flex flex-column align-items-center justify-content-center" >
            <p className="m-0">Site Produzido e Projetado Por: <a href="">Jordy Oliveira</a></p>
            <p className="m-0">Versão atual 0.9</p>
        </div>
    )
}