import React, {useState} from 'react'

export default props => {
    
    let valid = '#'+ window.location.href.split('#')[1] === props.link
    const [selected, setSelected] = useState(valid)
    
    window.onhashchange = e => {
        if('#'+ window.location.href.split('#')[1] === props.link){
            setSelected(true)
            
        } else {
            setSelected(false)
        }
    }

    return (
        <a className={`d-flex align-items-center justify-content-center ${selected ? 'selected' : ''}`}
            
            href={props.link} >
            <span className="align-middle" >
                {props.navPoint}
            </span>
        </a>
    )
}