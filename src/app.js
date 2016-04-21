import { Router, Route, hashHistory } from 'react-router'
const React = require('react');
const ReactDOM = require('react-dom');

const remote = require('electron').remote;

const Login = require('./Login');
const TaskTable = require('./TaskTable');
const Menu = require('./Menu');
const OutputBox = require('./OutputBox');
const NewTaskBox = require('./NewTaskBox');


const XF = React.createClass({
    getInitialState () {
        return {
            tasks: [],
            showOutput: false,
            showNewTaskBox: false
        };
    },

    componentWillMount() {
        let savedCookies = JSON.parse(localStorage.getItem('cookies'));
        if (!savedCookies) { return; }

        let ses = remote.getCurrentWebContents().session;
        savedCookies.forEach((c) => {
            ses.cookies.set({ url: "http://lixian.qq.com", name: c.name, value: c.value}, () => {});
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

    showOutput() {
        this.setState({showOutput: true});
    },


    hideOutput() {
        this.setState({showOutput: false});
    },

    addTask(task) {
        let tasks = this.state.tasks;
        let newTasks = tasks.concat(task);
        this.setState({tasks: newTasks});
    },

    showNewTaskBox() {
        this.setState({showNewTaskBox: true});
    },

    hideNewTaskBox() {
        this.setState({showNewTaskBox: false});
    },
    render() {
        return (
            <div>
                <Menu
                    onRefresh={this.updateTask}
                    onOutput={this.showOutput}
                    onAddTask={this.showNewTaskBox}
                />
                <TaskTable
                    tasks={this.state.tasks}
                    onTaskCheck={this.handleTaskCheck}
                />
                <OutputBox
                    tasks={this.state.tasks}
                    openModal={this.state.showOutput}
                    closeModal={this.hideOutput}
                />
                <NewTaskBox
                    openModal={this.state.showNewTaskBox}
                    closeModal={this.hideNewTaskBox}
                    onNewTask={this.updateTask}
                />
            </div>
        );
    }
})


ReactDOM.render((
    <Router history={ hashHistory }>
        <Route path="/" component={XF} />
        <Route path="/login" component={Login} />
    </Router>
), document.getElementById('content')
);
