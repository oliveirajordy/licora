import './Lists.css'
import 'bootstrap/js/dist/modal'
import React, { Component } from 'react'
import List from './List'
import HelpAddList from './HelpAddList'
import DB from '../../api/db'
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

    componentWillMount() {
        this.mountLists()
    }

    montarLists(compras) {
        return compras.map(compra => {
            return (
                <List key={compra._id}
                    local={compra.local}
                    id={`_${compra._id}`}
                    listDate={compra.listDate}
                    totalPrice={compra.totalPrice}
                    totalItems={compra.totalItems}
                    paymentForm={compra.paymentForm}
                    functions={[this.listInfo, this.deleteList]}
                    paymentDetails={compra.paymentDetails}
                    listDetails={compra.listDetails} />
            )
        })
    }

    async mountLists() {
        const compras = await db.getAllLists()
        if (!!compras) {
            this.noState.lists = this.montarLists(compras)
            this.setState({ listState: true })
        }
    }

    listInfo(event) {
        const db_id = event.target.parentElement.id.split('_')[1]
        const dbList = new DB(db_id)

        dbList.getAllLists()
            .then(resp => {
                this.noState.modal = <ListInfoModal items={resp} listId={db_id} clickFun={this.listInfoClose} />
                this.setState({ modalState: true })
            })
    }

    listInfoClose() {
        this.setState({ modalState: false })
    }

    deleteList(event) {
        const dbs = new DB('dbs')
        const db_id = event.target.parentElement.id.split('_')[1]

        dbs.deleteDb(db_id)
            .then(() => {
                this.noState.lists = this.noState.lists.filter(list => {
                    console.log(list.props.id !== `_${db_id}`)
                    return (list.props.id !== `_${db_id}`)
                })
                if (this.noState.lists.length <= 0) {
                    this.setState({ listState: false })
                } else {
                    this.setState({ listState: true })
                }
            })
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