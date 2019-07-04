import React from 'react'
import Contact from './contact'
import Footer from './footer'

export default props => {

    return (
        <div className="help-add-list">
            <div className="card p-2 m-1">
                <h2>Licora - Lista de Compras Rapida</h2>
                <p>Licora é um aplicativo web simples para criação de lista de compras que precisão ser feita
                    durante a compra.
                    Existem momentos que precisamos não de uma lista de compras planejada
                    previamente, mas sim de uma lista para nos ajudar com uma compra onde a maioria dos itens
                    precisam ser escolhidos na hora, para esses momentos o Licora foi pensado</p>

            </div>
            <div className="row m-1">
                <div className="col-md-4 col-12 mt-1 py-2">
                    <ul className="card">
                        <li>Adicione produto, preço e quantidade</li>
                        <li>Acompanhe o preço total dos produto</li>
                        <li>E tambem o preço total da compra</li>
                        <li>Adicione observações sobre sua compra para lembretes</li>
                        <li>Tenha sempre essa compra detalhada salva no seu aparelho</li>
                    </ul>
                    <h3 className="card p-2">Faça sua primeira Lista de Compras clicando em <span>"Nova Compra"</span></h3>
                </div>
                <Contact />
            </div>
            <Footer />
        </div>
    )
}