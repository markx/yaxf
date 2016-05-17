import React from 'react'

import { Modal, FormControl, Button, FormGroup } from 'react-bootstrap'

import {connect} from 'react-redux'
const request = require('request');

import {updateTasks, hideNewTaskBox, addTask} from '../actions'
import * as api from '../utils/api'

const NewTaskBox = React.createClass({
    getInitialState() {
        return {
            url: '',
            parseResult: []
        }
    },

    handleModalClosing() {
        this.props.hideNewTaskBox();
        this.setState({
            url: '',
            parseResult: []
        });
    },

    handleUrlChange(event) {
        let url = event.target.value;
        this.setState({ url: url });

        this.parseURL(url);
    },

    handleTaskNameChange(event, index) {
        let tasks = this.state.parseResult
        let changingTask = this.state.parseResult[index]
        let fileSize = changingTask.fileSize
        let url = changingTask.url

        let newName = event.target.value;
        this.setState({
            parseResult: [
                ...tasks.slice(0, index),
                {
                    fileName: newName,
                    url,
                    fileSize,
                },
                ...tasks.slice(index + 1),
            ]
        });
    },

    handleSubmit() {
        this.state.parseResult.forEach(task => {
            let {url, fileName, fileSize} = task
            this.props.addTask(url, fileName, fileSize)
        })
    },

    parseURL(inputURL) {
        let parsedURL = inputURL.split(/\s+/)
        let parseResult = []
        for (let url of parsedURL) {
            if (url.startsWith('ed2k', 0)) {
                let sep_arr = url.split('|');
                if (sep_arr.length >= 4) {
                    let fileName = decodeURI(sep_arr[2]);
                    let fileSize = sep_arr[3];
                    parseResult.push({
                        fileName,
                        fileSize,
                        url
                    })
                } else {
                    console.log('bad ed2k url');
                }
            }
        }
        this.setState({ parseResult} )
    },

    render() {
        return (
            <Modal
                show={this.props.showNewTaskBox}
                onHide={this.handleModalClosing}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <FormControl componentClass="textarea" value={this.state.url} onChange={this.handleUrlChange} />
                    </FormGroup>
                    <FormGroup>
                        {
                            this.state.parseResult.map((task, index) => {
                                return (
                                    <FormControl
                                        key={index}
                                        type="text"
                                        value={task.fileName}
                                        onChange={(event) => {
                                            this.handleTaskNameChange(event, index)
                                        }}
                                    />
                                )
                            })
                        }
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={this.handleSubmit}>Submit</Button>
                    </FormGroup>
                </Modal.Body>
            </Modal>
        );
    }
});

const mapStateToProps = (state) => {
    return {
        showNewTaskBox: state.newTaskBox
    }
}

const mapDispatchToProps = {
    updateTasks,
    hideNewTaskBox,
    addTask,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskBox)
