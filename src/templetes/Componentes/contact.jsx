import React, { useState } from 'react'
import './contact.css'
import FormGroup from './formGroup'
import axios from 'axios'

export default props => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        assunto: '',
        file: '',
        content: ''
    })

    const changeFild = (e) => {
        if (e.target.name === 'img') {
            e.preventDefault()

            const stats = { ...formData }

            let reader = new FileReader()
            stats.file = e.target.files[0]

            reader.onloadend = () => {
                setFormData(stats)
            }

            reader.readAsDataURL(stats.file)

        } else {

            const target = e.target.name
            const value = e.target.value
            const stats = { ...formData }

            stats[target] = value

            setFormData(stats)
        }


    }

    function send() {
        const trueFormData = new FormData()

        for (let fild in formData) {
            trueFormData.append(fild, formData[fild])
        }

        axios.post('http://localhost:3001/contact', trueFormData)
            .then(resp => console.log(resp))
    }

    return (
        <div className="container-fluid mb-3">
            <div className="row justify-content-center">
                <div className={`contact card p-1 mx-2 col-11 text-dark`} >
                    <div className="card-body p-1">
                        <h5 className="card-title">Fale Conosco</h5>
                        <p className="card-text" >Lerkanji ainda esta em fase beta e aberto para diversas correções e adições de funcionalidade,
                            ajude-nos reportando bugs, deixando sugestões ou dando sua opinião sobre o sistema.</p>
                        <div className="form">
                            <FormGroup type="text" name="name" placeHolder="Nome" value={formData.name} function={changeFild} />
                            <FormGroup type="text" name="email" placeHolder="Email" value={formData.email} function={changeFild} />
                            <FormGroup type="text" name="assunto" placeHolder="Assunto" value={formData.Assunto} function={changeFild} />
                            <textarea className="form-control mb-1" name="content" placeholder="Diga-nos algo" id="content" rows="3" value={formData.content} onChange={e => changeFild(e)} ></textarea>
                            <FormGroup type="file" name="img" placeHolder="Imagem" value={formData.Assunto} function={changeFild} />
                        </div>
                        <button className="btn btn-success w-100" onClick={() => send()}>Enviar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}