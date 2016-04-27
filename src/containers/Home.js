import { Router, Route, hashHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');

import { connect } from 'react-redux'

const remote = require('electron').remote;

import { updateTasks} from '../actions'

import * as api from '../utils/api'

const Login = require('./Login');
import TaskTable from './TaskTable'
import Menu from './Menu'
import OutputBox from './OutputBox'
import NewTaskBox from './NewTaskBox'



const Home = React.createClass({

    componentWillMount() {

        api.loadCookies()

    },

    componentDidMount() {
        api.fetchTasks()
        .then(() => {
            api.storeCookies()
        }).catch(() => {
            localStorage.removeItem('cookies')
            localStorage.removeItem('cookieString')
        })

        this.props.dispatch(updateTasks());
    },

    render() {
        return (
            <div>
                <Menu />
                <TaskTable />
                <OutputBox />
            </div>
        );
    }
})

function mapState(state) {
    const { tasks } = state;
    return { tasks };
}

function mapDispatch(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch),
    };
}

export default connect(mapState)(Home)
