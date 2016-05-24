import { Router, Route, hashHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');

import { connect } from 'react-redux'

const remote = require('electron').remote;

import {
    updateTasks,
    showMessage,
    showLoginError,
} from '../actions'

import * as api from '../utils/api'

import Login from './Login'
import TaskTable from './TaskTable'
import Menu from './Menu'
import OutputBox from './OutputBox'
import NewTaskBox from './NewTaskBox'
import MessageOverlay from './MessageOverlay'



const Home = React.createClass({

    componentDidMount() {
        this.props.dispatch(showMessage("Check Login Status"))

        api.loadCookies()
        .then(api.fetchTasks)
        .then(api.storeCookies)
        .then(() => {
            this.props.dispatch(updateTasks());
        })
        .catch((error) => {
            console.log('error:', error)
            this.props.dispatch(showLoginError())
        })
    },

    render() {
        return (
            <div className="container-fluid">
                <div
                    className="row"
                    style={{
                        padding: 15
                    }}
                >
                    <Menu />
                </div>
                <div className="row"
                    style={{
                        height: "100%"
                    }}
                >
                    <TaskTable />
                </div>
                <OutputBox />
                <NewTaskBox />
                <MessageOverlay />
            </div>
        );
    }
})


export default connect()(Home)
