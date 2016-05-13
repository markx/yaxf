import { Router, Route, hashHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');

import { connect } from 'react-redux'

const remote = require('electron').remote;

import { updateTasks} from '../actions'

import * as api from '../utils/api'

import Login from './Login'
import TaskTable from './TaskTable'
import Menu from './Menu'
import OutputBox from './OutputBox'
import NewTaskBox from './NewTaskBox'
import MessageOverlay from './MessageOverlay'



const Home = React.createClass({

    componentDidMount() {

        api.loadCookies()
        .then(api.fetchTasks)
        .then(api.storeCookies)
        .catch((error) => {
            console.log('error:', error)
        })
        .then(() => {
            console.log('dispatch')
            this.props.dispatch(updateTasks());
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
                    <OutputBox />
                    <NewTaskBox />
                    <MessageOverlay />
                </div>
            </div>
        );
    }
})

export default connect()(Home)
