import { Router, Route, hashHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');

const remote = require('electron').remote;

const LoginPage = require('./login-page');
const TaskTable = require('./task-table');
const Menu = require('./menu');


const XF = React.createClass({
    getInitialState () {
        return {tasks: []};
    },

    componentWillMount() {
        let savedCookies = JSON.parse(localStorage.getItem('cookies'));
        if (!savedCookies) { return; }

        let ses = remote.getCurrentWebContents().session;
        savedCookies.forEach((c) => {
            ses.cookies.set({ url: "http://lixian.qq.com", name: c.name, value: c.value}, (error) => {});
        });
    },

    componentDidMount () {
        this.updateTask()
    },

    login() {
        document.location.hash = '#/login';
    },

    updateTask () {
        fetch('http://lixian.qq.com/handler/lixian/get_lixian_status.php', {
            credentials: 'include'
        }).then((response) => {
            return response.json();
        }).then((data) => {
            if (data.ret != 0) {
                this.login();
                return;
            }
            this.setState({tasks: data.data});
        });
    },


    handleTaskCheck(checked, id) {
        let tasks = this.state.tasks;

        for (let task of tasks) {
            if (task.mid === id) {
                task.isChecked = checked;
                console.log(task);
                break;
            }
        }
        this.setState({tasks});
    },

    handleExport() {

    },

    render() {
        return (
            <div>
                <Menu
                    onRefresh={this.updateTask}
                     />
                <TaskTable
                    tasks={this.state.tasks}
                    onTaskCheck={this.handleTaskCheck}
                    />
            </div>
        )
    }
})


ReactDOM.render((
    <Router history={ hashHistory }>
        <Route path="/" component={XF} />
        <Route path="/login" component={LoginPage} />
    </Router>
), document.getElementById('content')
);
