import React from 'react'

export default props => {

    const inputGroup = () => {
        return (
            <div>
                <label htmlFor={props.name}>{props.label}</label>
                <input type="text" name={props.name} className="form-control" id="disabledInput" 
                    index={props.index} value={props.value} disabled/>
            </div>
        )
    }

    const inputNorm = () => {
        return (
            <input type="text" className="form-control" name={props.name} id="disabledInput"
                index={props.index} value={props.value} disabled />
        )
    }

    return (
        props.group ? inputGroup() : inputNorm()
    )


}