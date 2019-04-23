import React from 'react'

export default props => {

    const options = props.options.map((option, i) => {

        if (i === 0) return <option key={option} value="">{option}</option>

        return <option key={option} value={option}>{option}</option>
    })

    return (
        <select name={props.name} className="form-control" value={props.value} onChange={(e) => props.change(e)} >
            {options}
        </select>
    )
}