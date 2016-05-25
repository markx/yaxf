import {writeFile} from 'fs'
import {homedir} from 'os'

const {dialog} = require('electron').remote

const React = require('react')
import { connect } from 'react-redux'

import { Modal, FormControl, Button } from 'react-bootstrap'

import {showOutput, hideOutput} from '../actions'
import {fetchTaskURL} from '../utils/api'

function outputToCommands(filename, cookie, url) {
    return `aria2c -c -s10 -x10 -o "${filename}" --header "Cookie: FTN5K=${cookie}" "${url}"`
}

const OutputBox = React.createClass({
    getInitialState() {
        return { output: '', taskData: [] }
    },

    afterOpenModal() {
        this.getOutput()
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
                let output = this.state.output
                let newOutput = `${output}\n${outputToCommands(task.file_name, data.com_cookie, data.com_url)}`.trim()
                this.setState({output: newOutput})

                this.setState({taskData: [
                    ...this.state.taskData,
                    {...data, file_name: task.file_name}
                ]})
            }).catch(error => {
                console.log('error:', error)
            })
        }
    },

    handleModalClosing() {
        this.props.hideOutput()
        this.setState({output: '', taskData: []})
    },

    handleOutputChange(event) {
        this.setState({output: event.target.value})
    },

    handleOutputToFile() {
        dialog.showSaveDialog({
            filters: [{ name: 'text', extensions: ['txt'] }],
            defaultPath: `${homedir()}/aria2.down.txt`
        }, file => {
            if (!file) { return }

            let output = this.state.taskData.map(task => {
                return `${task.com_url}\n  header=Cookie: FTN5K=${task.com_cookie}\n  out=${task.file_name}\n  continue=true\n  max-connection-per-server=10\n  split=10`
            }).join('\n\n')

            writeFile(file, output, error => {
                if (error) {
                    alert("Failed to save file!")
                } else {
                    alert("Done!")
                }
            })
        })
    },

    render() {
        return (
            <div>
                <Modal
                    show={this.props.show}
                    onEntered={this.afterOpenModal}
                    onHide={this.handleModalClosing}
                    bsSize="large"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <Button onClick={this.handleOutputToFile} >
                                Export to file
                            </Button>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <FormControl componentClass="textarea" placeholder="Loading..."
                            rows="20"
                            className='text-nowrap'

                            value={this.state.output}
                            onChange={this.handleOutputChange}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
})

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
