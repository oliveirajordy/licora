import React from 'react'

export default props =>
    <a href={props.href} >
        <i className={props.className}> {props.label}</i>
    </a>