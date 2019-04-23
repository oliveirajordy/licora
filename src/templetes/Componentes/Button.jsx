import React from 'react'

export default props => {
    return(
        <button type="button" className={`btn ${props.className}`} 
            onClick={(e) => props.clickFun(e)} >{props.label}</button>
    )
}