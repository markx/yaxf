import React from 'react'
const ReactDOM = require('react-dom');
import { Router, Route, hashHistory } from 'react-router'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducer from './reducers'

import Home from './containers/Home'
import Login from './containers/Login'


const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

ReactDOM.render((
    <Provider store={store}>
        <Router history={ hashHistory }>
            <Route path="/" component={Home} />
            <Route path="/login" component={Login} />
        </Router>
    </Provider>
), document.getElementById('content'));
