const React = require('react');

import { connect } from 'react-redux'
import {checkTask} from '../actions'

const TaskTable = React.createClass({
    render () {
        let taskList = []
        for (let key in this.props.tasks) {
            taskList.push(this.props.tasks[key])
        }
        let taskNodes = taskList.map((item) => {
            return (
                <Task {...item}
                    key={item.mid}
                    file_name={item.file_name}
                    file_size={item.file_size}
                    progress={item.dl_status}
                    onTaskCheck={this.props.checkTask}
                    />
            )
        })
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Select All</th>
                            <th>Name</th>
                            <th>Size</th>
                            <th>progress</th>
                        </tr>
                        { taskNodes }
                    </tbody>
                </table>
            </div>
        )
    }
});

const Task = React.createClass({
    handleCheck(e) {
        this.props.onTaskCheck(this.props.mid, e.target.checked);
    },

    render () {
        return (
            <tr>
                <td><input ref="checkbox" type="checkbox" checked={this.props.isChecked || false} onChange={this.handleCheck} /></td>
                <td>{ this.props.file_name }</td>
                <td>{ this.props.file_size }</td>
                <td>{ this.props.progress }</td>
            </tr>
        );
    }
})

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
}

const mapDispatch = {
    checkTask
}

export default connect(mapStateToProps, mapDispatch)(TaskTable)
