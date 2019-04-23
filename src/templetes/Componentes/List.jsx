import './List.css'
import 'bootstrap/js/dist/collapse'
import React from 'react'
import Button from './Button'

export default props => {
    return (
    
            <div id="accordion" className="list m-2">
                <div className="card">
                    <button className="btn card-header" data-toggle="collapse" data-target={`#${props.id}`} aria-expanded="true" aria-controls={props.id}>
                        <p className="m-0 p-0 text-left" >Compra: {props.listDate}</p>
                    </button>
                    <div id={props.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body p-1">
                            <table className="table mb-0">
                                <tbody>
                                    <tr>
                                        <th>Local</th>
                                        <td>{props.local}</td>
                                        <th>Hora</th>
                                        <td>{props.listDate}</td>
                                    </tr>
                                    <tr>
                                        <th>Nº de Items</th>
                                        <td>{props.totalItems}</td>
                                        <th>Preço</th>
                                        <td>R${props.totalPrice.toFixed(2)}</td>
                                    </tr>
                                    <tr>
                                        <th>Forma de Pagamento</th>
                                        <td>{props.paymentForm}</td>
                                        <th>Detales Sobre o Pagamento</th>
                                        <td>{props.paymentDetails}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p className="px-3" ><strong>Observações da Compra:</strong> {props.listDetails}</p>
                            <div id={props.id} className="button-bar d-flex justify-content-around align-items-center">
                                <Button className="btn-info" label='+ Info' clickFun={props.functions[0]} local={props.local} />
                                <Button className="btn-danger" label="Apagar" clickFun={props.functions[1]} local={props.local} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
    )
}