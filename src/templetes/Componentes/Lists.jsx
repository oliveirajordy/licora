import './Lists.css'
import 'bootstrap/js/dist/modal'
import React, { Component } from 'react'
import List from './List'
import HelpAddList from './HelpAddList'
import DB from '../../modules/db'
import Main from './Main'
import ListInfoModal from './ListInfoModal'

const db = new DB('dbs')
const initialState = { listState: false, modalState: false }

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

    noState = { lists: '', modal: '' }

    listInfo(event) {
        const db_id = event.target.parentElement.id.split('_')[1]
        const dbList = new DB(db_id)

        dbList.getAllDoc()
            .then(resp => {
                this.noState.modal = <ListInfoModal items={resp} listId={db_id} clickFun={this.listInfoClose} />
                this.setState({ modalState: true })
            })
    }

    deleteList(event) {
        const dbs = new DB('dbs')
        const db_id = event.target.parentElement.id.split('_')[1]

        dbs.deleteDb(db_id)
            .then(() => {
                this.noState.lists = this.noState.lists.filter(list => {
                    return (list.props.id !== `_${db_id}`)
                })
                this.noState.lists.length <= 0 && this.setState({ listState: false })
            })
    }

    listInfoClose() {
        this.setState({ modalState: false })
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
                if (compras.map) {
                    this.noState.lists = this.montarLists(compras)
                    this.setState({ listState: true })
                }
            })
    }

    componentWillMount() {
        this.mountLists()
    }

    helpInfoButton() {
        if (!this.state.listState) {
            this.mountLists()
        } else {
            this.setState({ listState: false })
        }
    }

    render() {
        return (
            <Main>
                <div key="modal">
                    {this.state.modalState && this.noState.modal}
                </div>
                <div key="lists">
                    {this.state.listState ? this.noState.lists : <HelpAddList />}
                </div>
                <button className={`button-info ${!this.state.listState ? 'blue' : 'white'} btn`} onClick={this.helpInfoButton}>Sobre</button>
            </Main>
        )
    }
}