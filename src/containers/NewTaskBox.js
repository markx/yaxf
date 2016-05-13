import React from 'react'
import Modal from 'react-modal'
Modal.setAppElement('#content');

import {connect} from 'react-redux'
const request = require('request');

import {updateTasks, hideNewTaskBox, addTask} from '../actions'
import * as api from '../utils/api'

const NewTaskBox = React.createClass({
    getInitialState() {
        return {url: '', fileName: '', fileSize: 0}
    },

    handleModalClosing() {
        this.props.hideNewTaskBox();
        this.setState({
            showNewTaskBox: false,
            url: '',
            fileName: '',
            fileSize: 0
        });
    },

    handleUrlChange(event) {
        let url = event.target.value;
        this.setState({ url: url });

        this.parseURL(url);
    },

    handleTaskNameChange(event) {
        let fileSize = this.state.taskInfo.fileSize;
        let newName = event.target.value;
        this.setState({
            taskInfo: { fileName: newName, fileSize }
        });
    },

    handleSubmit() {
        let {url, fileName, fileSize} = this.state
        this.props.addTask(url, fileName, fileSize)
    },

    parseURL(url) {
        if (!url) { return; }
        if (url.startsWith('ed2k', 0)) {
            let sep_arr = url.split('|');
            if (sep_arr.length >= 4) {
                let fileName = decodeURI(sep_arr[2]);
                let fileSize = sep_arr[3];
                this.setState({ fileName, fileSize } )
            } else {
                console.log('bad ed2k url');
            }
        }
    },

    render() {
        return (
            <Modal
                isOpen={this.props.showNewTaskBox}
                onRequestClose={this.handleModalClosing}
            >
                <input type="text" value={this.state.url} onChange={this.handleUrlChange} />
                <input type="text" value={this.state.fileName} onChange={this.handleTaskNameChange} />
                <button onClick={this.handleSubmit}>Submit</button>
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
