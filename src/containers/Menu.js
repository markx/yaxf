const React = require('react');

import {connect} from 'react-redux'

import {showOutput, updateTasks} from '../actions'
import NewTaskBox from './NewTaskBox'
import RemoveTask from './RemoveTask'

const Menu = React.createClass({
    render() {
        return (
            <div>
                <button onClick={this.props.showOutput}>Export</button>
                <NewTaskBox />
                <RemoveTask />
                <button onClick={this.props.updateTasks} >Refresh</button>
                <button>Logout</button>
            </div>
        )
    }
});

const mapDispatchToProps = {
    updateTasks,
    showOutput,
}

export default connect(null, mapDispatchToProps)(Menu)


