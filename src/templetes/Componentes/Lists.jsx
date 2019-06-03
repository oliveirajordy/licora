import './Lists.css'
import 'bootstrap/js/dist/modal'
import React, { Component } from 'react'
import List from './List'
import HelpAddList from './HelpAddList'
import DB from '../../modules/db'
import Main from './Main'
import ListInfoModal from './ListInfoModal'

const db = new DB('dbs')
const initialState = { lists: [], modal: '' }
let mainContentHelp = false

export default class Lists extends Component {

    constructor(props) {
        super(props)
        this.listInfo = this.listInfo.bind(this)
        this.montarLists = this.montarLists.bind(this)
        this.listInfoClose = this.listInfoClose.bind(this)
        this.deleteList = this.deleteList.bind(this)
        this.mountLists = this.mountLists.bind(this)
        this.helpInfoButton = this.helpInfoButton.bind(this)
    }

    state = { ...initialState }

    listInfo(event) {
        const db_id = event.target.parentElement.id.split('_')[1]
        const dbList = new DB(db_id)

        dbList.getAllDoc()
            .then(resp => {
                const modal = <ListInfoModal items={resp} listId={db_id} clickFun={this.listInfoClose} />
                this.setState({ modal: modal })
            })
    }

    deleteList(event) {
        const dbs = new DB('dbs')
        const db_id = event.target.parentElement.id.split('_')[1]

        dbs.deleteDb(db_id)
            .then(() => {
                const filtedList = this.state.lists.filter(list => {
                    return (list.props.id !== `_${db_id}`)
                })
                if (filtedList.length > 0) {
                    this.setState({ lists: filtedList })
                } else {
                    this.setState({ lists: <HelpAddList /> })
                }
            })
    }

    listInfoClose() {
        this.setState({ modal: '' })
    }

    montarLists(compras) {
        return compras.map(compra => {
            return (
                <List key={compra.doc._id} 
                    local={compra.doc.local}
                    id={`_${compra.doc._id}`}
                    listDate={compra.doc.listDate}
                    totalPrice={compra.doc.totalPrice}
                    totalItems={compra.doc.totalItems}
                    paymentForm={compra.doc.paymentForm}
                    functions={[this.listInfo, this.deleteList]}
                    paymentDetails={compra.doc.paymentDetails}
                    listDetails={compra.doc.listDetails} />
            )
        })
    }

    mountLists() {
        db.getAllDoc()
            .then((compras) => {
                let lists = ''
                if (compras.map) {
                    lists = this.montarLists(compras)
                    mainContentHelp = false
                } else {
                    lists = <HelpAddList />
                    mainContentHelp = true
                }
                this.setState({ lists })
            })
    }

    componentWillMount() {
        this.mountLists()
    }

    helpInfoButton() {
        if (mainContentHelp) {
            this.mountLists()
        } else {
            mainContentHelp = true
            this.setState({ lists: <HelpAddList /> })
        }
    }

    render() {
        return (
            <Main>
                <div key="modal">
                    {this.state.modal}
                </div>
                <div key="lists">
                    {this.state.lists}
                </div>
                <button className={`button-info ${mainContentHelp ? 'blue' : 'white'} btn`} onClick={this.helpInfoButton}>Sobre</button>
            </Main>
        )
    }
}