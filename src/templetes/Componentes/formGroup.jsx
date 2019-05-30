import React from 'react'

export default props => {

    return (
        <div className="mb-1">
            <input type={props.type}
                className="form-control"
                name={props.name}
                placeholder={props.placeHolder}
                id={props.name}
                value={props.value}
                onChange={e => props.function(e)} />
        </div>
    )
}