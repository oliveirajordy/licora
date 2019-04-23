import React from 'react'
import Button from './Button'
import DisabledInput from './DisabledInput'
import SelectInput from './SelectInput'

export default props => {

    const options = ['Forma de Pagamento', 'Credito', 'Debito', 'Avista']

    return (
        <div className="finishNewList card p-1 m-1">
            <h3 className="d-flex justify-content-center p-0 m-0 mb-1" >Dados Informativos Opicionais</h3>
            <div className="form-row p-1 m-1">
                <div className="form-group col-6 mb-1">
                    <DisabledInput group={true} label="Total da Compra" name="totalPrice"
                        index="totalPrice_disabled" value={`R$${(props.totalPrice).toFixed(2)}`} />
                </div>
                <div className="form-group col-6 mb-1">
                    <DisabledInput group={true} label="Data da Compra" name="listDate"
                        index="listDate_disabled" value={props.listDate.toLocaleDateString()} />
                </div>
            </div>
            <div className="form-row p-1 m-1">
                <div className="col-12">
                    <input type="text" className="form-control" name="local" placeholder="Local Da Compra..."
                        value={props.local} onChange={(e) => props.functions[0](e)} />
                </div>
            </div>
            <div className="form-row p-1 m-1">
                <div className="col-4">
                    <SelectInput name="paymentForm" value={props.paymentForm} change={props.functions[0]}
                        options={options} />
                </div>
                <div className="col-8">
                    <input type="text" className="form-control" name="paymentDetails"
                        placeholder="Detalhes do Pagamento(Avista, Parcelado, Com/Sem Juros...)"
                        value={props.paymentDetails} onChange={(e) => props.functions[0](e)} />
                </div>
            </div>
            <div className="form-row p-1 m-1">
                <div className="col-12">
                    <textarea cols="30" rows="5" className="form-control"
                        placeholder="Observações sobre a compra" value={props.listDetails} name="listDetails"
                        onChange={(e) => props.functions[0](e)}></textarea>
                </div>
            </div>
            <div className="form-row p-1 m-1">
                <div className="col-12 d-flex align-item-center justify-content-center mb-1">
                    <Button className="btn-success flex-grow-1" label="Finalizar" clickFun={() => props.functions[1]()} />
                </div>
                <div className="col-12 d-flex align-item-center justify-content-center mb-1">
                    <Button className="btn-warning flex-grow-1" label="Voltar a Lista" clickFun={() => props.functions[3]() } />
                </div>
                <div className="col-12 d-flex align-item-center justify-content-center mb-1">
                    <Button className="btn-danger flex-grow-1" label="Cancelar" clickFun={() => props.functions[2]() } />
                </div>
            </div>
        </div>

    )

}