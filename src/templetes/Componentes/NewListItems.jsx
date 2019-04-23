import React from 'react'
import NewListItem from './NewListItem'
import './NewListItems.css'

export default props => {

    const allNLIs = props.listItems.map((nli, i) => {
        return <NewListItem key={i} {...props.listItems[i]} index={i} 
                functions={[props.functions[0], props.functions[1]]} />
    })

    return(
        <div className="newListItems flex-grow-1">
            {allNLIs}
        </div>
    )
}