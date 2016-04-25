import { Router, Route, hashHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');

import { connect } from 'react-redux'

const remote = require('electron').remote;

import { updateTasks} from '../actions'

const Login = require('./Login');
import TaskTable from './TaskTable'
const Menu = require('./Menu');
const OutputBox = require('./OutputBox');
const NewTaskBox = require('./NewTaskBox');


const Home = React.createClass({

    componentWillMount() {
        let savedCookies = JSON.parse(localStorage.getItem('cookies'));
        if (!savedCookies) { return; }

        let ses = remote.getCurrentWebContents().session;
        savedCookies.forEach((c) => {
            ses.cookies.set({ url: "http://lixian.qq.com", name: c.name, value: c.value}, () => {});
        });
    },

    componentDidMount() {
        this.props.dispatch(updateTasks());
    },


    render() {
        return (
            <div>
                <Menu />
                <TaskTable />
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
