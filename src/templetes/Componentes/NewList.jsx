import './NewList.css'
import React, { Component } from 'react'
import NLIPass0 from './NLIPass0'
import NLIPass1 from './NLIPass1'
import DB from '../../modules/db'
import Main from './Main'
// import update from 'react-addons-update'

const initialState = {
    listItems: [{ _id: '0', itemName: '', itemPrice: 0, amount: 1, defined: false }],
    listDate: new Date(),
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
        this.updateFile = this.updateFile.bind(this)
        this.totalPriceChange = this.totalPriceChange.bind(this)
        this.updateFileFinish = this.updateFileFinish.bind(this)
        this.changePass = this.changePass.bind(this)
        this.saveNewList = this.saveNewList.bind(this)
        this.validId = this.validId.bind(this)
        this.cancelNewList = this.cancelNewList.bind(this)
    }

    state = { ...initialState }

    updateFile(event) {
        const id = event.target.getAttribute('index')
        const changeFild = event.target.name
        const value = event.target.value
        const tempListItems = this.state.listItems.map(item => { return { ...item } })

        if (changeFild === 'amount' || changeFild === 'itemPrice') {
            // const pontoOuVirgolaBoleam = ((value.split()
            //     && (tempListItems[id][changeFild].includes('.') || tempListItems[id][changeFild].includes(','))))
            // if (pontoOuVirgola) {
            //     return
            // }
        }

        tempListItems[id][changeFild] = value

        if (changeFild === 'amount') {
            const tp = this.totalPriceChange(event.target)

            this.setState({ listItems: tempListItems, totalPrice: tp })
        } else {
            this.setState({ listItems: tempListItems })
        }

    }

    updateFileFinish(event) {
        const changeFild = event.target.name
        const value = event.target.value
        let tempData = this.state[changeFild]

        tempData = value

        switch (changeFild) {
            case 'local': this.setState({ local: tempData })
                break;
            case 'paymentForm': this.setState({ paymentForm: tempData })
                break;
            case 'paymentDetails': this.setState({ paymentDetails: tempData })
                break;
            case 'listDetails': this.setState({ listDetails: tempData })
                break;
            default:
                break;
        }

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

    changeDefinition(id,e) {
        const listItems = this.state.listItems.map(item => { return { ...item } })

        const valueDigited = listItems[id].itemPrice
        const valueFloted = parseFloat(valueDigited)
        const changePassOne = (valueFloted === 0) ? true : !!valueFloted
        const changePassTwo = valueDigited.toString().split(valueFloted)[1] ? false : true
        const changePassTree = valueDigited.toString().includes(',') ? false : true
        console.log(valueDigited, valueFloted)
        console.log(changePassOne, changePassTwo, changePassTree)
        
        if (changePassOne && changePassTwo &&  changePassTree) {

            listItems[id].defined = true
            listItems.push({ _id: (cont).toString(), itemName: '', itemPrice: 0, amount: 1, defided: false })

            const tp = this.state.totalPrice + parseFloat(listItems[id].itemPrice)

            cont++

            this.setState({ listItems, totalPrice: tp })
            this.setState({ listItems})
        }

    }

    changePass() {
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
            .then(x => window.location.href = window.location.href.toString().split('/#/')[0] + '/#/')

    }

    cancelNewList() {
        window.location.href = window.location.href.toString().split('/#/')[0] + '/#/'
    }

    render() {

        if (!this.state.compraPassOne) {
            return (
                <Main>
                    <NLIPass0 listItems={this.state.listItems}
                        totalPrice={this.state.totalPrice}
                        functions={[this.updateFile, this.changeDefinition, this.changePass, this.cancelNewList]} />
                </Main>
            )
        } else {
            return (
                <Main>
                    <NLIPass1 local={this.state.local}
                        paymentForm={this.state.paymentForm}
                        listDate={this.state.listDate}
                        paymentDetails={this.state.paymentDetails}
                        listDetails={this.state.listDetails}
                        totalPrice={this.state.totalPrice}
                        functions={[this.updateFileFinish, this.saveNewList, this.cancelNewList, this.changePass]} />
                </Main>
            )
        }


    }
}