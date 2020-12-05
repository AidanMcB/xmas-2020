import React from 'react'
import { Provider, Route } from '@triframe/designer'
import { MainPage } from './views/MainPage'
import { ListPage } from './views/ListPage'
import { SignUp } from './views/SignUp'
import { Login } from './views/Login'
import './styles.css'

export default () => (
    <Provider url={process.env.REACT_APP_BACKEND_URL}>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/list/:id" component={ListPage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/sign-up" component={SignUp}/>
    </Provider>
)