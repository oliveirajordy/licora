import React from 'react'

export default props => {
    return(
        <a className={`d-flex align-items-center justify-content-center ${props.selected}`} href={props.link} ><span className="align-middle" >{props.navPoint}</span></a>
    )
}