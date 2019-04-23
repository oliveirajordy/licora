import React from 'react'
import DisabledInput from './DisabledInput'

export default props => {

    const defainidItem = () => {
        return (
            <div className="form-row">
                <div className="form-group col-6 m-0">
                    <DisabledInput group={true} label='Nome do Produto' name="itemName" index={props.index} value={props.itemName} />
                </div>
                <div className="form-group col-3 mb-0">
                <label htmlFor="amount">Quantidade</label>
                    <input type="tel" pattern="^(0*[.]*[0-9][0-9]*([.][0-9]+)*|[0-9]?[.][0-9]*[1-9][0-9]*)$" title="Coloque uma quantidade valida" min="0" className="form-control" name="amount" min="0"
                        index={props.index} value={props.amount} onChange={e => props.functions[0](e)} />
                </div>
                <div className="form-group col-3 mb-0">
                <label htmlFor="totalPrice">Total</label>
                    <DisabledInput name="totalPrice" index={props.index} value={`R$${(props.itemPrice * props.amount).toFixed(2)}`} />
                </div>
            </div>
        )
    }

    const undefainidItem = () => {
        return (
            <form className="form-row">
                <div className="form-group col-7 mb-0">
                    <label htmlFor="itemName">Nome do Produto</label>
                    <input type="text" className="form-control" name="itemName" index={props.index} placeholder="Nome do Produto"
                        value={props.itemName} onChange={e => props.functions[0](e)} />
                </div>
                <div className="form-group col-3 mb-0">
                    <label htmlFor="itemPrice">Preço</label>
                    <input type="tel" pattern="^(0*[.]*[0-9][0-9]*([.][0-9]+)*|[0-9]?[.][0-9]*[1-9][0-9]*)$" title="Coloque um preço valido" min="0" className="form-control" name="itemPrice" index={props.index} placeholder="Preço do produto"
                        value={props.itemPrice} onChange={e => props.functions[0](e)} />
                </div>
                <div className="col-2 d-flex align-items-center justify-content-center">
                    <button className="btn btn-success w-100 h-75" onClick={e => props.functions[1](props.index, e)} >OK</button>
                </div>
            </form>
        )
    }

    return (
        <div className="newListItem form card p-1 m-1" action="" >
            {props.defined ? defainidItem() : undefainidItem()}
        </div>
    )
}