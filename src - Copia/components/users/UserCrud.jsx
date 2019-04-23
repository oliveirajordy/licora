import React, {Component} from 'react'
import axios from 'axios'
import Main from '../templete/Main'
import PouchDB from 'pouchdb-browser'

const db = new PouchDB('crud')

const headerProps = {
    icon: 'users',
    title:'Usuários',
    subtitle: 'Crud Usuários: Incluir, Listar, Alterar e Excluir'
}

const baseUrl = 'http://10.0.0.149:3001/users'
const initialState = {
    user: { name: '', email: ''},
    list: [],
    idAtual: 0
}

export default class UserCrud extends Component {

    state = { ...initialState}

    constructor(props){
        super(props)
        this.clear = this.clear.bind(this)
        this.save = this.save.bind(this)
        this.getUpdateList = this.getUpdateList.bind(this)
        this.updateFild = this.updateFild.bind(this)
        this.load = this.load.bind(this)
    }

    componentWillMount(){
        // axios(baseUrl).then( resp => {
        //     this.setState({list: resp.data})
        // })
        db.allDocs({include_docs:true, descending:true})
            .then(resp => {
                // resp.total_rows > 0 ? parseInt(resp.rows[0].id) : this.state.idAtual
                if(resp.total_rows > 0){
                    const listDesor = resp.rows.map(row => row.doc)
                    const list = listDesor.sort( (a, b) => parseInt(b._id) - parseInt(a._id))
                    const ids = resp.rows.map( row => row.id)
                    const idAtual = Math.max.apply(null, ids)
                    this.setState({list, idAtual})
                }
            })
    }

    clear(){
        this.setState({user: initialState.user})
    }

    save(){
        const user = this.state.user
        const novoId = this.state.idAtual+1
        // const method = user.id ? 'put' : 'post'
        // const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        // axios[method](url, user)
        //     .then(resp => {
        //         const list = this.getUpdateList(resp.data)
        //         this.setState({user: initialState.user, list})
        //     })
        const data = {
            _id: novoId.toString(),
            name: user.name,
            email: user.email
        }
        db.put(data)
            .then(resp =>{
                let list = []
                db.get(resp.id, (err, user) =>{
                    if (err) { return console.log('de f5') }
                    list = this.getUpdateList(user)
                    this.setState({user: initialState.user, list, idAtual:novoId})
                })
                
            })
    }

    getUpdateList(user, remove = true){
        const list = this.state.list.filter(u => u._id !== user._id)
        if(remove === true) list.unshift(user)
        return list
    }

    updateFild(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    load(user){
        this.setState({user})
    }

    remove(user){
        // axios.delete(`${baseUrl}/${user.id}`).then(resp => {
        //     const list = this.getUpdateList(user, false)
        //     this.setState({list})
        // })
        db.get(user)
            .then(doc => {
                db.remove(doc, (err, user) => {
                    if(err){ console.log(err)}
                    const list = this.getUpdateList(doc, false)
                    this.setState({list})
                })
            })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-Mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map( user => {
            return (
                <tr key={user._id} >
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={()=>this.load(user._id)} ><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-danger ml-2" onClick={()=>this.remove(user._id)} ><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            )
        })
    }

    renderForm(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name" value={this.state.user.name} 
                                    onChange={e=> this.updateFild(e)} placeholder="Digite o nome..." />
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label htmlFor="">Email</label>
                            <input type="text" className="form-control" name="email" value={this.state.user.email} 
                                    onChange={e => this.updateFild(e)} placeholder="Digite o email" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)} >Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)} >Cancelar</button>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return(
            <Main {...headerProps} >
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}