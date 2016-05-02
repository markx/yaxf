const React = require('react');

import { connect } from 'react-redux'
import {checkTask} from '../actions'

const TASK_STATUS = {
    2: 'In Dispaching Queue',
    4: 'Dispatching',
    5: 'In Download Queue',
    6: 'Downloading',
    7: 'Download Failed',
    8: 'Hashing',
    12: 'Complete',
    13: 'Not Enough Space',
    100: 'Deleting',
    101: 'Error'
};

function formatProgress(file_size, comp_size) {
    if(file_size <=0 ) return "0.0%"
    if(file_size == comp_size ) return "100%"

    var result = (comp_size*100/file_size).toFixed(1);
    if(isNaN(result))
        result = 'unknown';
    else
        result += '%';
    return result;
}

function formatSize(size) {
    let result, unit;
    if (size > Math.pow(1024, 3)) {
        result =  size / Math.pow(1024, 3)
        unit = 'G'
    } else if (size > Math.pow(1024, 2)) {
        result = size / Math.pow(1024, 2)
        unit = 'M'
    } else if (size > 1024) {
        result = size / 1024
        unit = 'K'
    } else {
        result = size
        unit = 'B'
    }

    return result.toFixed(2) + unit

}

const TaskTable = React.createClass({
    render () {
        let taskList = []
        for (let key in this.props.tasks) {
            taskList.push(this.props.tasks[key])
        }
        let taskNodes = taskList.map((item) => {
            let progress = item.comp_size === item.file_size ? '100%' : (item.comp_size/item.file_size).toFixed(1) + '%'

            return (
                <Task {...item}
                    key={item.mid}
                    file_name={item.file_name}
                    file_size={formatSize(item.file_size)}
                    progress={formatProgress(item.file_size, item.comp_size)}
                    status={TASK_STATUS[item.dl_status] || 'Unknown'}
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
                            <th>Progress</th>
                            <th>Status</th>
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
                <td>{ this.props.status }</td>
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
