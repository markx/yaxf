import React from 'react'
import { connect } from 'react-redux'

import {removeTask} from '../actions'
import {fetchTaskURL} from '../utils/api'


class RemoveTask extends React.Component {
    constructor(props) {
        super(props)
        this.handleTaskRemove = this.handleTaskRemove.bind(this)
    }

    handleTaskRemove() {
        let taskArr = Object.keys(this.props.tasks).map(key => this.props.tasks[key])
        let tasksToRemove = taskArr.filter(task => task.isChecked)
        if (tasksToRemove.length == 0) {return;}
        this.props.removeTask(tasksToRemove.map(task => task.mid))
    }

    render() {
        return (
            <div className="btn-group" role="group">
                <button
                    className="btn btn-default"
                    onClick={this.handleTaskRemove}
                >
                    Remove
                </button>
            </div>
        )
    }

}

const mapStateToProps = function(state) {
    return {
        tasks: state.tasks,
    }
}

const mapDispatchToProps = {
    removeTask
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveTask)
