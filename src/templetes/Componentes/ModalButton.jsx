import React from 'react'

export default props => {

    return (
        <button className="btn btn-primary" data-toggle="modal" data-target={props.listId}></button>
    )
}