import './List.css'
import 'bootstrap/js/dist/collapse'
import React from 'react'
import Button from './Button'

export default props => {

    const data = props.listDate.split(" ")[0]
    const hora = props.listDate.split(" ")[1]

    return (
    
            <div id="accordion" className="list m-2">
                <div className="card">
                    <button className="btn card-header" data-toggle="collapse" data-target={`#${props.id}`} aria-expanded="true" aria-controls={props.id}>
                        <p className="m-0 p-0 text-left" >Compra: {data}</p>
                    </button>
                    <div id={props.id} className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body p-1">
                            <table className="table mb-0">
                                <tbody>
                                    <tr>
                                        <th>Local</th>
                                        <td>{props.local}</td>
                                        <th>Hora</th>
                                        <td>{hora}</td>
                                    </tr>
                                    <tr>
                                        <th>Preço</th>
                                        <td>R${props.totalPrice.toFixed(2)}</td>
                                        <th>Forma de Pagamento</th>
                                        <td>{props.paymentForm}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p className="px-3" ><strong>Detales Sobre o Pagamento:</strong> {props.paymentDetails}</p>
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