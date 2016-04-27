const React = require('react');
import { connect } from 'react-redux'

const Modal = require('react-modal');
Modal.setAppElement('#content');

import {showOutput, hideOutput} from '../actions'
import {fetchTaskURL} from '../utils/api'

function outputToCommands(filename, cookie, url) {
    return `aria2c -c -s10 -x10 -o "${filename}" --header "Cookie: FTN5K=${cookie}" "${url}"`;
}

const OutputBox = React.createClass({
    getInitialState() {
        return { output: '' }
    },

    afterOpenModal() {
        this.getOutput();
    },

    getOutput() {
        let taskList = []
        for (let key in this.props.tasks) {
            let task = this.props.tasks[key]
            if (!!task.isChecked && task.comp_size == task.file_size) {
                taskList.push(task)
            }
        }

        for(let task of taskList) {
            fetchTaskURL(task.hash, task.file_name)
            .then((data) => {
                let output = this.state.output;
                let newOutput = output + '\n' + outputToCommands(task.file_name, data.com_cookie, data.com_url)
                this.setState({output: newOutput});
            }).then(error => {
                console.log('error:', error)
            })
        }
    },

    handleModalClosing() {
        this.props.hideOutput();
        this.setState({output: ''});
    },

    handleOutputChange(event) {
        this.setState({output: event.target.value})
    },

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.show}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.handleModalClosing}
                >
                    <button onClick={this.handleModalClosing}>X</button>
                    <textarea
                        value={this.state.output}
                        onChange={this.handleOutputChange}
                    />
                </Modal>
            </div>
        );
    }
});

const mapStateToProps = function(state) {
    return {
        tasks: state.tasks,
        show: state.output
    }
}

const mapDispatchToProps = {
    showOutput,
    hideOutput
}

export default connect(mapStateToProps, mapDispatchToProps)(OutputBox)
