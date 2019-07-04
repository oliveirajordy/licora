import React from 'react'

export default props => {

    const selected = `#${window.location.href.split('#')[1]}` === props.link

    return (
        <a className={`d-flex align-items-center justify-content-center ${selected ? 'selected' : ''}`}

            href={props.link} >
            <span className="align-middle" >
                {props.label}
            </span>
        </a>
    )
}