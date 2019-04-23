import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import './App.css'
import { HashRouter } from 'react-router-dom'

import Header from '../templetes/Componentes/Header'
import Nav from '../templetes/Componentes/Nav'
import Rountes from './Rountes'



export default class App extends React.Component {

    render() {
        return (
            <HashRouter>
                <div className="container-fluid app">
                    <Header />
                    <Nav />
                    <Rountes />
                </div>
            </HashRouter>
        )
    }
}

