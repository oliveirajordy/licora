import React from 'react'
import ListControlBar from './ListControlBar'
import NewListItems from './NewListItems'

export default props => {


    return (
        <React.Fragment>
            <NewListItems listItems={props.listItems}
                functions={[...props.functions]} />
            <ListControlBar totalPrice={props.totalPrice} functionCancel={props.functions[3]} functionPass={props.functions[2]} />
        </React.Fragment>

    )
}