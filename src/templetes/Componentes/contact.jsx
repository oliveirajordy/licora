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

        if (!!formData.email && !!formData.name && !!formData.assunto && (!!formData.file || !!formData.content)) {


            for (let fild in formData) {
                trueFormData.append(fild, formData[fild])
            }

            axios.post('http://35.224.82.167:3002/contact', trueFormData)
                .then(resp => 'x')
        } else {
            window.alert('Preecha os campoas para contato corretamente')
        }

    }

    return (
        <div className="col-md-8 col-12 container-fluid p-0 mt-1">
            <div className="row justify-content-center mx-1">
                <div className={`contact card col-12 text-dark`} >
                    <div className="card-body p-1">
                        <h5 className="card-title">Fale Conosco</h5>
                        <p className="card-text" >Licora ainda esta em fase beta e aberto para diversas correções e adições de funcionalidade,
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