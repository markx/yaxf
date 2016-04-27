const React = require('react');

import {connect} from 'react-redux'

import {showOutput} from '../actions'

const Menu = React.createClass({
    render() {
        return (
            <div>
                <button onClick={this.props.showOutput}>Export</button>
                <button onClick={this.props.onAddTask}>Add</button>
                <button>Remove</button>
                <button onClick={this.props.onRefresh} >Refresh</button>
                <button>Logout</button>
            </div>
        )
    }
});

const mapDispatchToProps = {
    showOutput
}

export default connect(null, mapDispatchToProps)(Menu)


