import React from 'react'

export default props => {

    const inputGrup = (
        <React.Fragment>
            <label htmlFor={}>Nome</label>
            <input type="text" className="form-control" name="itemName" index={props.index} placeholder="Nome do Produto"
                value={props.itemName} onChange={e => props.functions[0](e)} />
        </React.Fragment>
    )

    return (
        
    )
}