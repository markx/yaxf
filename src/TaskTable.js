const React = require('react');

let TaskTable = React.createClass({
    render () {
        let tasksList = this.props.tasks.map((item) => {
            return (
                <Task {...item}
                    key={item.mid}
                    file_name={item.file_name}
                    file_size={item.file_size}
                    progress={item.dl_status}
                    onTaskCheck={this.props.onTaskCheck}
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
                        { tasksList}
                    </tbody>
                </table>
            </div>
        )
    }
});

const Task = React.createClass({
    handleCheck(e) {
        this.props.onTaskCheck(e.target.checked, this.props.mid);
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

module.exports = TaskTable;
