const React = require('react');

import {connect} from 'react-redux'

import {showOutput, updateTasks, showNewTaskBox, removeTask} from '../actions'
import NewTaskBox from './NewTaskBox'

const Menu = React.createClass({
    render() {
        return (
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group" role="group">
                    <button className="btn btn-default" onClick={this.props.showOutput}>Export</button>
                </div>

                <div className="btn-group" role="group">
                    <button className="btn btn-default" onClick={this.props.showNewTaskBox}>Add</button>
                </div>

                <div className="btn-group" role="group">
                    <button className="btn btn-default" onClick={this.props.removeTask}>
                        Remove
                    </button>
                </div>

                <div className="btn-group" role="group">
                    <button className="btn btn-default" onClick={this.props.updateTasks} >Refresh</button>
                </div>
                <div className="btn-group" role="group">
                    <button className="btn btn-default">Logout</button>
                </div>
            </div>
        )
    }
});

const mapDispatchToProps = {
    updateTasks,
    showOutput,
    showNewTaskBox,
    removeTask,
}

export default connect(null, mapDispatchToProps)(Menu)


