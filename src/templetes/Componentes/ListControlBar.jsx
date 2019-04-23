import './ListControlBar.css'
import React from 'react'
import Button from './Button'

export default props => {


    return (
        <div className="container-fluid listControlBar p-0">
            <div className="row m-0">
                <div className="col-6 d-flex justify-content-center p-2 bg-info">
                    <span>Preço Total: R${(props.totalPrice).toFixed(2)}</span>
                </div>
                <div className="col-6 d-flex justify-content-center p-0 btn-group">
                    <Button className="btn-danger flex-grow-1 p-autp" label="Cancelar" clickFun={props.functionCancel} ></Button>
                    <Button className="btn-success flex-grow-1 p-auto" label="Finalizar" clickFun={props.functionPass} ></Button>
                </div>
            </div>
        </div>
    )
}