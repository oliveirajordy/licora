import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Lists from '../templetes/Componentes/Lists'
import NewList from '../templetes/Componentes/NewList'

export default props => {
    return(
        <Switch>
            <Route exact path='/' component={Lists} />
            <Route path='/novacompra' component={NewList} />
            <Redirect from='*' to='/' />
        </Switch>
    )
}