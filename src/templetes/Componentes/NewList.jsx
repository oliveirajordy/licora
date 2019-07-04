import './NewList.css'
import React, { Component } from 'react'
import DB from '../../api/db'
import Main from './Main'
import ListControlBar from './ListControlBar'
import NewListItems from './NewListItems'
import FinishNewList from './FinishNewList'

const initialState = {
    listItems: [{ _id: '0', itemName: '', itemPrice: 0, amount: 1, defined: false }],
    totalPrice: 0.0,
    compraPassOne: false,
    local: "",
    paymentForm: "",
    paymentDetails: "",
    listDetails: ""
}

let cont = 1

export default class NewList extends Component {

    constructor(props) {
        super(props)
        this.changeDefinition = this.changeDefinition.bind(this)
        this.updateFild = this.updateFild.bind(this)
        this.totalPriceChange = this.totalPriceChange.bind(this)
        this.updateFildFinish = this.updateFildFinish.bind(this)
        this.changePass = this.changePass.bind(this)
        this.saveNewList = this.saveNewList.bind(this)
        this.validId = this.validId.bind(this)
        this.cancelNewList = this.cancelNewList.bind(this)
    }

    state = { ...initialState, listDate: new Date(), }

    updateFild(event) {
        const id = event.target.getAttribute('index')
        const changeFild = event.target.name
        const value = event.target.value
        const tempListItems = this.state.listItems.map(item => { return { ...item } })

        tempListItems[id][changeFild] = value

        if (changeFild === 'amount') {
            const tp = this.totalPriceChange(event.target)

            this.setState({ listItems: tempListItems, totalPrice: tp })
        } else {
            this.setState({ listItems: tempListItems })
        }

    }

    updateFildFinish(event) {
        const changeFild = event.target.name
        const value = event.target.value
        let tempData = this.state[changeFild]

        tempData = value

        this.setState({ [changeFild]: tempData })
    }

    totalPriceChange(element) {
        const newAmount = isNaN(parseInt(element.value)) ? 0 : parseInt(element.value)
        const currentAmount = this.state.listItems[element.getAttribute('index')].amount
        const itemPrice = this.state.listItems[element.getAttribute('index')].itemPrice
        let tempTotalPrice = this.state.totalPrice

        tempTotalPrice = tempTotalPrice - (currentAmount * itemPrice)
        tempTotalPrice = tempTotalPrice + (newAmount * itemPrice)

        return tempTotalPrice
    }

    changeDefinition(id) {
        const listItems = this.state.listItems.map(item => { return { ...item } })

        const valueDigited = listItems[id].itemPrice
        const valueFloted = parseFloat(valueDigited)

        const changePassOne = (valueFloted === 0) ? true : !!valueFloted
        let changePassTwo = (valueDigited.toString().split(valueFloted)[1] === undefined ||
            valueDigited.toString().split(valueFloted)[1] === "") ? true : false
        if (!changePassTwo) {
            let changePassReValidation = ''

            valueDigited.toString().split('.').length <= 2 &&
                valueDigited.toString().split('.').length > 1 &&
                (changePassReValidation = (valueDigited.toString().split('.')[1]
                    .split('').map(caracter => !isNaN(parseInt(caracter)))).reduce((x, y) => x && y, true))

            changePassTwo = changePassReValidation ? true : false
        }
        const changePassTree = valueDigited.toString().includes(',') ? false : true
        const changePassFour = valueDigited.toString().split('')[0] === '.' ? false : true
        const changePassFive = this.state.listItems[id].itemName !== "" ? true : false

        if (changePassOne && changePassTwo && changePassTree && changePassFour && changePassFive) {

            listItems[id].defined = true
            listItems.push({ _id: (cont).toString(), itemName: '', itemPrice: 0, amount: 1, defided: false })

            const tp = this.state.totalPrice + parseFloat(listItems[id].itemPrice)

            cont++

            this.setState({ listItems, totalPrice: tp })
        }
        //tudo isso por não saber regex? talvez...
    }

    changePass() {
        //pass === fazendo ou finalizando lista
        if (this.state.listItems.length > 1) {
            this.setState({ compraPassOne: !this.state.compraPassOne })
        }
    }

    validId() {
        const splitId = this.state.listDate.toString().split(' ').reduce((acum, current) => acum + current)
        const split2Id = splitId.split(':').reduce((acum, current) => acum + current)
        const split3Id = split2Id.split('(')[0]

        const randomNunber = Math.random().toString().split('.')[1]

        return split3Id + randomNunber
    }

    saveNewList() {

        const validId = this.validId()

        const dbs = new DB('dbs')
        const doc = {
            _id: validId,
            listDate: this.state.listDate.toLocaleString(),
            local: this.state.local,
            totalPrice: this.state.totalPrice,
            paymentForm: this.state.paymentForm,
            paymentDetails: this.state.paymentDetails,
            listDetails: this.state.listDetails
        }

        const list = this.state.listItems.filter(item => { return ((item.defined) && (item.amount > 0)) })

        dbs.saveDoc(doc, list)
            .then(_ => window.location.href = window.location.href.toString().split('/#/')[0] + '/#/')

    }

    cancelNewList() {
        window.location.href = window.location.href.toString().split('/#/')[0] + '/#/'
    }

    render() {

        if (!this.state.compraPassOne) {
            return (
                <Main>
                    <NewListItems listItems={this.state.listItems}
                        functions={[this.updateFild, this.changeDefinition, this.changePass, this.cancelNewList]} />
                    <ListControlBar totalPrice={this.state.totalPrice}
                        functionCancel={this.cancelNewList}
                        functionPass={this.changePass} />
                </Main>
            )
        } else {
            return (
                <Main>
                    <FinishNewList local={this.state.local}
                        paymentForm={this.state.paymentForm}
                        listDate={this.state.listDate}
                        paymentDetails={this.state.paymentDetails}
                        listDetails={this.state.listDetails}
                        totalPrice={this.state.totalPrice}
                        functions={[this.updateFildFinish, this.saveNewList, this.cancelNewList, this.changePass]} />
                </Main>
            )
        }


    }
}