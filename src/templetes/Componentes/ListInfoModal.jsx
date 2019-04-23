import React from 'react'
import './ListInfoModal.css'

export default props => {

    const itemRow = props.items.map(item => {
        return (
            <tr>
                <td>{item.doc.itemName}</td>
                <td>{item.doc.amount}</td>
                <td>R${(item.doc.amount * item.doc.itemPrice).toFixed(2)}</td>
            </tr>
        )

    })

    return (
        <div className="blackGrou">
            <div key='modal' className="listInfoModal modal fade show" id={props.listId} tabIndex="-1" role="dialog" aria-labelledby aria-hidden="true" >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={props.listId}>{props.listDate}</h5>
                            <button type="button" className="close" onClick={() => props.clickFun()} aria-label="Close">
                                <span aria-hidden="true" >&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Produto</th>
                                        <th>Quantidade</th>
                                        <th>Preço Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemRow}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}