const React = require('react');

module.exports = React.createClass({
    render() {
        return (
            <div>
                <button onClick={this.props.onOutput}>Export</button>
                <button>Add</button>
                <button>Remove</button>
                <button onClick={this.props.onRefresh} >Refresh</button>
                <button>Logout</button>
            </div>
        )
    }
});
