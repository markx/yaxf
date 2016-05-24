const React = require('react');

import {connect} from 'react-redux'

import { Button, ButtonToolbar, ButtonGroup } from 'react-bootstrap';

import {showOutput, updateTasks, showNewTaskBox, removeTask, logout} from '../actions'

const Menu = React.createClass({
    render() {
        return (
            <ButtonToolbar>
                <ButtonGroup>
                    <Button onClick={this.props.showOutput}>Export</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.props.showNewTaskBox}>Add</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.props.removeTask}>Remove</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.props.updateTasks}>Refresh</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button onClick={this.props.logout}>Logout</Button>
                </ButtonGroup>
            </ButtonToolbar>
        )
    }
});

const mapDispatchToProps = {
    updateTasks,
    showOutput,
    showNewTaskBox,
    removeTask,
    logout,
}

export default connect(null, mapDispatchToProps)(Menu)


